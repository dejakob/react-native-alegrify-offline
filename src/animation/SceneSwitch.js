import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

/**
 * <SceneSwitch />
 * 
 * ```jsx
 * <SceneSwitch
 *   current="Landing"
 * >
 *     <Scene
 *       name="Landing"
 *     ></Scene>
 *     <Scene
 *       name="SignUp"
 *     ></Scene>
 * </SceneSwitch>
 * ```
 */
class SceneSwitch extends PureComponent {
    constructor() {
        super();

        this.handleAllAnimationsDone = this.handleAllAnimationsDone.bind(this);
    }

    componentWillMount() {
        this.childrenAsArray = typeof this.props.children.map === 'function' ?
            this.props.children :
            React.Children.toArray(this.props.children);

        this.setState({
            scenesToView: [
                this.childrenAsArray.find(child =>
                    child.props.name === this.props.current
                )
            ]
        })
    }

    componentWillUpdate(newProps) {
        if (newProps.current !== newProps.current) {
            const scene = this.childrenAsArray.find(child =>
                child.props.name === this.props.current
            );

            if (scene) {
                this.setState({
                    scenesToView: [
                        ...this.state.scenesToView,
                        scene
                    ]
                });
            }
        }
    }

    handleAllAnimationsDone() {
        const scene = this.childrenAsArray.find(child =>
            child.props.name === this.props.current
        );

        if (scene) {
            this.setState({
                scenesToView: [
                    scene
                ]
            });
        }
    }

    render() {
        this.scenes = [];
    
        // Show only current scene
        // On transition: show two scenes until all animations previous scene are done, 
        //    then unmount previous scene

        return (
            <React.Fragment>
                {this.state.scenesToView.map((Child, index) => 
                    React.cloneElement(Child, {
                        key: index,
                        ref: this.attachScene,
                        allAnimationsDone: this.handleAllAnimationsDone,
                        prepareToUnmount: Child.props.name !== this.props.current,
                        actions: this.props.actions,
                        appState: this.props.appState
                    })
                )}
            </React.Fragment>
        );
    }
}

SceneSwitch.propTypes = {

    /**
     * Children can only be Scene components
     */
    children: PropTypes.oneOfType([
        PropTypes.arrayOf(PropTypes.node),
        PropTypes.node
    ]).isRequired,

    current: PropTypes.string.isRequired,
    actions: PropTypes.object,
    appState: PropTypes.object
};

export default SceneSwitch;
