import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import SceneContext from './SceneContext';

class Scene extends PureComponent {
    constructor() {
        super();

        this.handleAddAnimation = this.handleAddAnimation.bind(this);
    }

    componentWillMount() {
        this.animationComponents = [];
    }

    async componentWillUpdate(newProps) {
        if (!this.props.prepareToUnmount && newProps.prepareToUnmount) {
            await Promise.all(this.animationComponents.map(component => component.hide()));
            
            if (typeof this.props.allAnimationsDone === 'function') {
                this.props.allAnimationsDone();
            }
        }
    }

    handleAddAnimation(animationComponent) {
        this.animationComponents.push(animationComponent);
    }

    render() {
        return (
            <SceneContext.Provider
                value={{
                    name: this.props.name,
                    addAnimation: this.handleAddAnimation
                }}
            >
                {React.cloneElement(this.props.children, {
                    actions: this.props.actions,
                    appState: this.props.appState,
                    freezeState: this.props.prepareToUnmount
                })}
            </SceneContext.Provider>
        );
    }
}

Scene.propTypes = {
    name: PropTypes.string.isRequired,
    allAnimationsDone: PropTypes.func,
    prepareToUnmount: PropTypes.bool,
    actions: PropTypes.object,
    appState: PropTypes.object
}

export default Scene;
