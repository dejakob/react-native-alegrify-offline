import React, { PureComponent } from 'react';
import { Button, Dialog, Input, Padding } from 'react-native-alegrify-ui';
import { translate } from '../../services/language';

class ReflectDialog extends PureComponent {
    constructor() {
        super();

        this.handleReflectionChange = this.handleReflectionChange.bind(this);
        this.handleReliabilityChange = this.handleReliabilityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            reflection: '',
            reliability: 5,

            hasSubmitted: false,
        });
    }

    get validationErrors() {
        return {
            reflection: this.state.reflection ? null : translate('THOUGHT.VALIDATION_ERRORS.REFLECTION'),
            reliability: this.state.reliability > 0 ? null : translate('THOUGHT.VALIDATION_ERRORS.RELIABILITY')
        }
    }

    get isValid() {
        const { validationErrors } = this;

        return Object
            .keys(validationErrors)
            .every(key => !validationErrors[key]);
    }


    handleReflectionChange(reflection) {
        this.setState({ reflection });
    }

    handleReliabilityChange(reliability) {
        this.setState({ reliability: Math.round(reliability * 10) / 10 });
    }

    handleSubmit() {
        if (this.isValid) {
            if (typeof this.props.onComplete === 'function') {
                this.props.onComplete(this.state.reflection, this.state.reliability);
                this.componentWillMount();
            }
        }
        else {
            this.setState({ hasSubmitted: true });
        }
    }

    render() {
        const { validationErrors, isValid } = this;
        
        return (
            <Dialog
                show={this.props.show}
                onHide={this.props.onHide}
                scrollDisabled={this.state.isScrollDisabled}
            >
                <Input
                    label={translate('THOUGHT.REFLECT')}
                    onChangeText={this.handleReflectionChange}
                    error={this.state.hasSubmitted && validationErrors.reflection}
                    multiline
                    spaceL
                />
                <Input
                    label={translate('THOUGHT.RELIABILITY')}
                    onValueChange={this.handleReliabilityChange}
                    onSlidingStart={() => this.setState({ isScrollDisabled: true })}
                    onSlidingComplete={() => this.setState({ isScrollDisabled: false })}
                    value={this.state.reliability}
                    type="range"
                />
                {this.state.hasSubmitted && validationErrors.reliability ? (
                    <Label
                        error
                    >
                        {validationErrors.reliability}
                    </Label>
                ) : null}

                <Padding m />

                <Button
                    primary
                    onPress={this.handleSubmit}
                >
                    {translate('THOUGHT.REFLECT_CTA')}
                </Button>
            </Dialog>
        );
    }
}

export default ReflectDialog;
