import React, { PureComponent } from 'react';
import { Box, Input, Button } from 'react-native-alegrify-ui';
import { translate } from '../../services/language';

class ReflectionInput extends PureComponent {
    constructor() {
        super();

        this.handleReflectionChange = this.handleReflectionChange.bind(this);
        this.handleReliabilityChange = this.handleReliabilityChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            reflection: '',
            reliability: 0
        });
    }

    handleReflectionChange(reflection) {
        this.setState({ reflection });
    }

    handleReliabilityChange(reliability) {
        this.setState({ reliability });
    }

    handleSubmit() {
        if (typeof this.props.onAdd === 'function') {
            this.props.onAdd(this.state.reflection, this.state.reliability);
        }

        this.setState({
            reflection: '',
            reliability: 0
        });
    }

    render() {
        return (
            <Box
                action={
                    <Button
                        primary
                        onPress={this.handleSubmit}
                    >
                        {translate('THOUGHT.REFLECT_CTA')}
                    </Button>
                }
                spaceXL
            >
                <Input
                    label={translate('THOUGHT.REFLECT')}
                    onChangeText={this.handleReflectionChange}
                    multiline
                    spaceL
                />

                <Input
                    label={translate('THOUGHT.RELIABILITY')}
                    onValueChange={this.handleReliabilityChange}
                    type="range"
                />
            </Box>
        );
    }
}

export default ReflectionInput;
