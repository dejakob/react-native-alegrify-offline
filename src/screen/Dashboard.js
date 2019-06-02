import React, { PureComponent } from 'react';
import { FlatList, View } from 'react-native';
import {
    CONFIG,
    BackgroundGradient,
    Box,
    BoxTitle,
    BoxParagraph,
    Center,
    Emoji,
    Padding
} from 'react-native-alegrify-ui';
import Thought from '../components/thought/Thought';
import TabBar from '../components/tab-bar/TabBar';
import { createStyle, getStyle } from 'react-native-styler';
import { translate } from '../services/language';
import { Note } from '../components/icons';
import CreateThoughtDialog from '../components/create-thought-dialog/CreateThoughtDialog';
import AppearFromCenter from '../animation/AppearFromCenter';

const { COLORS } = CONFIG;

createStyle({
    AlegrifyDashboardList: {
        FlatList: {
            minHeight: '100vh',
            width: '100vw',
        },
        FlatListContent: {
            backgroundColor: 'transparent'
        },
        EmptyEmoji: {
            opacity: 0.4
        }
    }
})

class Dashboard extends PureComponent {
    constructor() {
        super();

        this.handleAddThought = this.handleAddThought.bind(this);
        this.showCreateDialog = this.showCreateDialog.bind(this);
        this.hideCreateDialog = this.hideCreateDialog.bind(this);
    }

    componentWillMount() {
        this.setState({ showCreateDialog: false });
    }

    handleAddThought(mood, thought, event) {
        this.props.actions.thoughts.add(mood, thought, event);
    }

    showCreateDialog() {
        this.setState({ showCreateDialog: true });
    }

    hideCreateDialog() {
        this.setState({ showCreateDialog: false });
    }

    render() {
        const TABS = [
            { icon: <View />, to: 'dashboard' },
            { icon: <Note />, to: 'create', primary: true, onPress: this.showCreateDialog, testID: 'dashboard__tabBar__createButton' },
            { icon: <View />, to: 'dashboard' }
        ];

        return (
            <BackgroundGradient
                from={COLORS.primary}
                to={COLORS.secondary}
            >
                {DashboardContent(this.props)}

                <TabBar
                    active="dashboard"
                    onTabPress={this.props.actions.navigation.navigate}
                    tabs={TABS}
                />

                <CreateThoughtDialog
                    show={this.state.showCreateDialog}
                    onHide={this.hideCreateDialog}
                    onComplete={({ mood, score, thought, event }) => {
                        this.props.actions.thoughts.add(mood, score, thought, event);
                        this.setState({ showCreateDialog: false });
                    }}
                />
            </BackgroundGradient>
        );
    }
}

function DashboardContent(props) {
    const thoughts = props.appState.thoughts.thoughts.sort(
        (thoughtA, thoughtB) => new Date(thoughtB.created_at).getTime() - new Date(thoughtA.created_at).getTime()
    );

    return (
            <FlatList
                ListHeaderComponent={() => <Padding l />}
                ListFooterComponent={() => <Padding xl />}
                data={thoughts}
                bounces={false}
                ListEmptyComponent={() => (
                    <View
                        style={getStyle('AlegrifyDashboardList__FlatList')}
                    >
                        <Center>
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
                                        >👋</Emoji>
                                    </View>
                                </Center>
                                <BoxTitle spaceM>
                                    {translate('DASHBOARD.EMPTY_TITLE')}
                                </BoxTitle>
                                <BoxParagraph>
                                    {translate('DASHBOARD.EMPTY_DESCRIPTION')}
                                </BoxParagraph>
                                
                            </Box>
                        </Center>
                    </View>
                )}
                renderItem={({ item }) => (
                    <AppearFromCenter>
                        <Center horizontal>
                            <Padding s />
                            <View
                                style={{
                                    shadowColor: "#000",
                                    shadowOffset: {
                                        width: 0,
                                        height: 2,
                                    },
                                    shadowOpacity: 0.25,
                                    shadowRadius: 3.84,
                                    elevation: 5
                                }}
                            >
                                <Thought
                                    thought={item}
                                    onPress={() => props.actions.navigation.navigate('thought', { id: item.id })}
            
                                    bleed
                                    spaceL
                                />
                            
                            </View>
                        </Center>
                    </AppearFromCenter>
                )}
                keyExtractor={(item, index) => index.toString()}
                style={getStyle('AlegrifyDashboardList__FlatList')}
                contentContainerStyle={getStyle('AlegrifyDashboardList__FlatListContent')}
            />
    );
}

export default Dashboard;
