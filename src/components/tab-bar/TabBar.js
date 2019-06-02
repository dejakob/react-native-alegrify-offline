import React from 'react';
import PropTypes from 'prop-types';
import { TabBar as UiTabBar } from 'react-native-alegrify-ui';

const TABS = [];

function TabBar(props) {
    const items = (props.tabs || TABS).map(tab => ({
        ...tab,
        active: props.active === tab.to,
        onPress: () => {
            if (typeof tab.onPress === 'function') {
                tab.onPress(tab.to);
            }
            else if (typeof props.onTabPress === 'function') {
                props.onTabPress(tab.to);
            }
        }
    }));

    return (
        <UiTabBar
            items={items}
        />
    );
}

TabBar.propTypes = {
    onTabPress: PropTypes.func,
    active: PropTypes.string
};

export default TabBar;
