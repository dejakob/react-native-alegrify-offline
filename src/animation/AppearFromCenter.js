import React, { Component } from 'react';
import { Animated } from 'react-native';
import { createStyle, getStyle } from 'react-native-styler';
import SceneContext from './SceneContext';

const ANIMATION_DURATION = 400;
const SCALE_AMOUNT = 0.2;

createStyle({
    AlegrifyAppearFromCenter: {
        Animation: {
            DEFAULT: {
                backgroundColor: 'transparent',
            }
        }
    }
});

/**
 * Appear from bottom animation
 */
class AppearFromCenter extends Component {
    static contextType = SceneContext;

    constructor() {
        super();

        this.hide = this.hide.bind(this);

        this.state = {
            opacity: new Animated.Value(0),
            scale: new Animated.Value(1 - SCALE_AMOUNT),
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
        const scaleAnimation = Animated.timing(this.state.scale, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        })

        return new Promise(resolve => {
            Animated.parallel([
                opacityAnimation,
                scaleAnimation
            ]).start(resolve);
        });
    }

    hide() {
        const opacityAnimation = Animated.timing(this.state.opacity, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        const scaleAnimation = Animated.timing(this.state.scale, {
            toValue: 1 - SCALE_AMOUNT,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        });

        return new Promise(resolve => {
            Animated.parallel([
                opacityAnimation,
                scaleAnimation
            ]).start(resolve);
        });
    }

    hideHalfway() {
        const opacityAnimation = Animated.timing(this.state.opacity, {
            toValue: 0.5,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        }).start();
        const scaleAnimation = Animated.timing(this.state.scale, {
            toValue: 1 - SCALE_AMOUNT * 0.5,
            duration: ANIMATION_DURATION,
            useNativeDriver: true
        });

        return new Promise(resolve => {
            Animated.parallel([
                opacityAnimation,
                scaleAnimation
            ]).start(resolve);
        });
    }

    render() {
        const animatedStyle = {
            opacity: this.state.opacity,
            transform: [{ scale: this.state.scale }],
        };

        return (
            <Animated.View
                style={[getStyle('AlegrifyAppearFromCenter__Animation__DEFAULT'), animatedStyle]}
            >
                {this.props.children}
            </Animated.View>
        );
    }
}

export default AppearFromCenter;
