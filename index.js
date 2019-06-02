/** @format */
import React from 'react';
import { AppRegistry } from 'react-native';
import { StylerProvider } from 'react-native-styler';
import 'react-native-alegrify-ui';
import App from './App';
import { name as appName } from './app.json';

console.disableYellowBox = true;

function StyledApp() {
    return (
        <StylerProvider>
            <App />
        </StylerProvider>
    )
}

AppRegistry.registerComponent(appName, () => StyledApp);