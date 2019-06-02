import React, { PureComponent } from 'react';
import { Platform } from 'react-native';
import { Button, Dialog, Input, Label, SegmentedControl, Padding } from 'react-native-alegrify-ui';
import { translate } from '../../services/language';
import { MOODS, MOOD_ELEMENTS } from '../thought/Thought';

class CreateThoughtDialog extends PureComponent {
    constructor() {
        super();

        this.handleMoodChange = this.handleMoodChange.bind(this);
        this.handleMoodScoreChange = this.handleMoodScoreChange.bind(this);
        this.handleThoughtChange = this.handleThoughtChange.bind(this);
        this.handleEventChange = this.handleEventChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillMount() {
        this.setState({
            mood: null,
            score: 5,
            thought: '',
            event: '',

            hasSubmitted: false,
        });
    }

    componentWillReceiveProps(newProps) {
        if (newProps.show && !this.props.show) {
            this.setState({ hasSubmitted: false });
        }
        else if (!newProps.show && this.props.show) {
            this.componentWillMount();
        }
    }

    get validationErrors() {
        return {
            mood: this.state.mood ? null : translate('DASHBOARD.VALIDATION_ERRORS.MOOD'),
            score: this.state.score > 0 ? null : translate('DASHBOARD.VALIDATION_ERRORS.SCORE'),
            thought: (typeof this.state.thought === 'string' && this.state.thought.trim().length > 0) ?
                null :
                translate('DASHBOARD.VALIDATION_ERRORS.THOUGHT'),
            event: (typeof this.state.event === 'string' && this.state.event.trim().length > 0) ?
                null :
                translate('DASHBOARD.VALIDATION_ERRORS.EVENT')
        };
    }

    get isValid() {
        const { validationErrors } = this;

        return Object
            .keys(validationErrors)
            .every(key => !validationErrors[key]);
    }

    handleMoodChange(element) {
        const { mood } = element.props;
        this.setState({ mood });
    }

    handleMoodScoreChange(score) {
        this.setState({ score: Math.round(score * 10) / 10 });
    }

    handleThoughtChange(thought) {
        this.setState({ thought });
    }

    handleEventChange(event) {
        this.setState({ event });
    }

    handleSubmit() {
        if (this.isValid) {
            this.props.onComplete({
                mood: this.state.mood,
                score: this.state.score,
                thought: this.state.thought,
                event: this.state.event
            });
            
            this.componentWillMount();
        }
        else {
            this.setState({ hasSubmitted: true });
        }
    }

    render() {
        const { validationErrors } = this;
        
        return (
            <Dialog
                show={this.props.show}
                onHide={this.props.onHide}
                scrollDisabled={this.state.isScrollDisabled}
                testID="createThoughtDialog__dialog"
            >
                <SegmentedControl
                    items={MOOD_ELEMENTS}
                    active={MOOD_ELEMENTS[Object.keys(MOODS).indexOf(this.state.mood)]}
                    onItemPress={this.handleMoodChange}
                    testID="createThoughtDialog__moodTypes"
                />
                {this.state.hasSubmitted && validationErrors.mood ? (
                    <Label
                        error
                    >
                        {validationErrors.mood}
                    </Label>
                ) : null}

                <Padding m />

                <Input
                    type="range"
                    value={this.state.score}
                    onValueChange={this.handleMoodScoreChange}
                    onSlidingStart={() => this.setState({ isScrollDisabled: true })}
                    onSlidingComplete={() => this.setState({ isScrollDisabled: false })}
                    error={this.state.hasSubmitted && validationErrors.score}
                    testID="createThoughtDialog__score"
                    spaceL
                />

                <Input
                    multiline
                    label={translate('DASHBOARD.WHATS_ON_YOUR_MIND')}
                    value={this.state.thought}
                    onChangeText={this.handleThoughtChange}
                    onBlur={Platform.OS === 'ios' ? e => this.handleThoughtChange(e.nativeEvent.text) : () => {}}
                    error={this.state.hasSubmitted && validationErrors.thought}
                    testID="createThoughtDialog__thought"
                    spaceL
                />

                <Input
                    multiline
                    label={translate('DASHBOARD.WHAT_HAPPENED')}
                    value={this.state.event}
                    onChangeText={this.handleEventChange}
                    onBlur={Platform.OS === 'ios' ? e => this.handleEventChange(e.nativeEvent.text) : () => {}}
                    error={this.state.hasSubmitted && validationErrors.event}
                    testID="createThoughtDialog__event"
                    spaceL
                />

                <Button
                    primary
                    onPress={this.handleSubmit}
                    disabled={this.state.hasSubmitted && !this.isValid}
                    testID="createThoughtDialog__submit"
                >
                    {translate('DASHBOARD.ADD_THOUGHT')}
                </Button>
            </Dialog>
        );
    }
}

export default CreateThoughtDialog;
