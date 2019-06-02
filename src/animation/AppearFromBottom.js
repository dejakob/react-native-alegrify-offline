import React, { Component } from 'react';
import { Animated } from 'react-native';
import { createStyle, getStyle } from 'react-native-styler';
import SceneContext from './SceneContext';

const ANIMATION_DURATION = 400;
const TRANSLATION_AMOUNT = 20;

createStyle({
    AlegrifyAppearFromBottom: {
        Animation: {
            DEFAULT: {
                backgroundColor: 'transparent'
            }
        }
    }
});

/**
 * Appear from bottom animation
 */
class AppearFromBottom extends Component {
    static contextType = SceneContext;

    constructor() {
        super();

        this.hide = this.hide.bind(this);

        this.state = {
            opacity: new Animated.Value(0),
            translate: new Animated.Value(TRANSLATION_AMOUNT),
        };
    }

    componentWillMount() {
        this.show();

        if (typeof this.props.addAnimation === 'function') {
            this.props.addAnimation(this);
        }
        else if (
            typeof this.context === 'object' &&
            this.context !== null &&
            typeof this.context.addAnimation === 'function'
        ) {
            this.context.addAnimation(this);
        }
    }

    show() {
        const opacityAnimation = Animated.timing(this.state.opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        const translateAnimation = Animated.timing(this.state.translate, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        })

        return new Promise(resolve => {
            Animated.parallel([
                opacityAnimation,
                translateAnimation
            ]).start(resolve);
        });
    }

    hide() {
        const opacityAnimation = Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        const translateAnimation = Animated.timing(this.state.translate, {
            toValue: -1 * TRANSLATION_AMOUNT,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        });

        return new Promise(resolve => {
            Animated.parallel([
                opacityAnimation,
                translateAnimation
            ]).start(resolve);
        });
    }
    
    hideHalfway() {
        const opacityAnimation = Animated.timing(this.state.opacity, {
            toValue: 0.5,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        const translateAnimation = Animated.timing(this.state.translate, {
            toValue: -0.5 * TRANSLATION_AMOUNT,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        });

        return new Promise(resolve => {
            Animated.parallel([
                opacityAnimation,
                translateAnimation
            ]).start(resolve);
        });
    }

    render() {
        const animatedStyle = {
            opacity: this.state.opacity,
            transform: [{ translateY: this.state.translate }],
        };

        return (
            <Animated.View
                style={[getStyle('AlegrifyAppearFromBottom__Animation__DEFAULT'), animatedStyle]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default AppearFromBottom;
