import React, { PureComponent } from 'react';
import * as Screens from './src/screen';
import { SceneSwitch, Scene } from './src/animation';
import store, { allActions, getAppState } from './src/services/store';
import './src/services/logger';

class App extends PureComponent {
    componentWillMount() {
        this.setState({
            appState: getAppState()
        });

        this.unsubscribeStore = store.subscribe(() => {
            this.setState({ appState: getAppState() });
        });
    }

    componentWillUnmount() {
        if (typeof this.unsubscribeStore === 'function') {
            this.unsubscribeStore();
        }
    }

    render() {
        const actions = allActions;

        return (
            <SceneSwitch
                current={this.state.appState.navigation.currentScreen}
                actions={actions}
                appState={this.state.appState}
            >
                {Object.keys(Screens).map((screenName, index) => {
                    const Screen = Screens[screenName];

                    return (
                        <Scene
                            name={screenName.toLowerCase()}
                            key={index}
                        >
                            <Screen />
                        </Scene>
                    );
                })}
            </SceneSwitch>
        );
    }
}

export default App;