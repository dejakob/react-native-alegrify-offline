import React, { Component } from 'react';
import { View } from 'react-native';
import { CONFIG, BackgroundGradient, Emoji, Form, Center, Padding, Box, BoxTitle, BoxParagraph } from 'react-native-alegrify-ui';
import ThoughtDetail from '../components/thought/Thought';
import Reflection from '../components/reflection/Reflection';
import TabBar from '../components/tab-bar/TabBar';
import { AppearFromBottom } from '../animation';
import { translate } from '../services/language';
import { getStyle } from 'react-native-styler';
import { Note, Speech } from '../components/icons';
import ReflectDialog from '../components/reflect-dialog/ReflectDialog';

const { COLORS } = CONFIG;

class Thought extends Component {
    constructor() {
        super();

        this.handleReflectionAdd = this.handleReflectionAdd.bind(this);
        this.showReflectDialog = this.showReflectDialog.bind(this);
        this.hideReflectDialog = this.hideReflectDialog.bind(this);
    }

    componentWillMount() {
        const { thoughts } = this.props.appState.thoughts;
        const { params } = this.props.appState.navigation;

        if (!params || !params.id) {
            return null;
        }

        if (!thoughts) {
            return setTimeout(() => {
                this.props.actions.navigation.navigate('dashboard');
            }, 400);
        }

        const { id } = params;
        
        this.thought = thoughts.find(t => t.id === id);
        this.setState({
            showReflectDialog: false
        });

        if (!this.thought) {
            return setTimeout(() => {
                this.props.actions.navigation.navigate('dashboard');
            }, 400);
        }
    }

    componentWillUpdate(newProps) {
        if (
            newProps.appState.thoughts !== this.props.appState.thoughts ||
            newProps.appState.navigation !== this.props.appState.navigation
        ) {
            try {
                const { params } = newProps.appState.navigation;
                const { id } = params;
                this.thought = newProps.appState.thoughts.thoughts.find(t => t.id === id);
            }
            catch (ex) {
                console.log('ex', ex);
            }
        }
    }

    shouldComponentUpdate(newProps) {
        return !newProps.freezeState;
    }

    handleReflectionAdd(reflection, reliability) {
        this.props.actions.thoughts.addReflection(this.thought.id, reflection, reliability);
        this.hideReflectDialog();
    }

    showReflectDialog() {
        this.setState({
            showReflectDialog: true
        });
    }

    hideReflectDialog() {
        this.setState({
            showReflectDialog: false
        });
    }

    render() {
        const TABS = [
            { icon: <Speech />, to: 'dashboard' },
            { icon: <Note />, primary: true, onPress: this.showReflectDialog },
            { icon: <Speech />, to: 'dashboard' }
        ];

        if (!this.thought) {
            return null;
        }

        return (
            <BackgroundGradient
                from={COLORS.primary}
                to={COLORS.secondary}
            >
                <Form
                    bounces={false}
                >
                    <AppearFromBottom>
                        <ThoughtDetail
                            thought={this.thought}
                            full
                            bleed
                            spaceL
                        />

                        {this.thought.reflections.length === 0 ? (
                            <Center
                                horizontal
                            >
                                <Box>
                                    <Center
                                        horizontal
                                        spaceL
                                    >
                                        <View
                                            style={getStyle('AlegrifyDashboardList__EmptyEmoji')}
                                        >
                                            <Emoji
                                                xl
                                            >
                                                 ？
                                            </Emoji>
                                        </View>
                                    </Center>
                                    <BoxTitle spaceM>
                                        {translate('THOUGHT.EMPTY_TITLE')}
                                    </BoxTitle>
                                    <BoxParagraph>
                                        {translate('THOUGHT.EMPTY_PARAGRAPH')}
                                    </BoxParagraph>
                                    
                                </Box>
                            </Center>
                        ) : null}

                        {this.thought.reflections.map((reflection, index) => (
                            <Center
                                key={index}
                            >
                                <Padding s />
                                <Reflection
                                    reflection={reflection}
                                    spaceL
                                />
                            </Center>
                        ))}
                    </AppearFromBottom>

                    <Padding xl />
                </Form>

                <TabBar
                    active="thought"
                    onTabPress={this.props.actions.navigation.navigate}
                    tabs={TABS}
                />

                <ReflectDialog
                    show={this.state.showReflectDialog}
                    onHide={this.hideReflectDialog}
                    onComplete={this.handleReflectionAdd}
                />
            </BackgroundGradient>
        );
    }
}

export default Thought;
