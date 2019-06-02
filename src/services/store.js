import { AsyncStorage } from 'react-native';
import { createStore } from 'redux';
import * as childReducers from '../store-reducers';
import * as actions from '../store-actions';
import storeFx from '../store-fx';
import Immutable from 'immutable';
import { logError } from './logger';

const store = getStore();
const allActions = getAllActions();

// Load persisted state from AsyncStorage
AsyncStorage
    .getItem('store')
    .then(state => {
        if (state) {
            try {
                const appState = JSON.parse(state);

                // Automigrate store from older versions
                if (
                    appState.navigation &&
                    ['dashboard','thought'].indexOf(appState.navigation.currentScene) === -1
                ) {
                    appState.navigation.currentScene = 'dashboard';
                }

                dispatchWithEffects(store, { type: 'STATE_LOAD_SUCCESS', state: appState });
            }
            catch (ex) {
                dispatchWithEffects(store, { type: 'STATE_LOAD_FAILED' });
            }
        }
        else {
            dispatchWithEffects(store, { type: 'STATE_LOAD_FAILED' });
        }
    })
    .catch(() => {
        logError(ex);
        dispatchWithEffects(store, { type: 'STATE_LOAD_FAILED' })
    })

/**
 * Create a redux store
 * @return {Object}
 */
function getStore() {
    return createStore(function (state = {}, action) {
        const reducer = {};

        if (action.type === 'STATE_LOAD_SUCCESS') {
            state = { ...action.state };
        }
        else if (action.type === 'LOG_OUT') {
            state = {};
        }
    
        Object
            .keys(childReducers)
            .forEach(reducerKey => {
                reducer[reducerKey] = childReducers[reducerKey]
                    (state[reducerKey] && Immutable.fromJS(state[reducerKey]), action).toJS();
            });
    
        return reducer;
    });
}

/**
 * Get all actions (grouped par collection)
 * @returns {Object}
 * @example
 *   {
 *      thoughts: {
 *         // Trigger this method to dispatch addThought action
 *         addThought: () => {  }
 *      }
 *   }
 */
function getAllActions() {
    const allActions = {};

    Object
        .keys(actions)
        .forEach(actionGroupKey => { 
            Object.keys(actions[actionGroupKey]).forEach(actionKey => {
                allActions[actionGroupKey] = allActions[actionGroupKey] || {};
                allActions[actionGroupKey][actionKey] = (...args) =>
                    dispatchWithEffects(store, actions[actionGroupKey][actionKey](...args));
            });
        });
    
    return allActions;
}

/**
 * Get the full app state
 * grouped by subreducers
 * @returns {Object}
 * @example
 *   {
 *      thoughts: { thoughts: [] },
 *      navigation: { currentScreen: '' }
 *   }
 */
function getAppState() {
    return store.getState();
}

/**
 * Dispatch an action and trigger related async effects
 * @param {Object} store 
 * @param {Object} action 
 */
function dispatchWithEffects(store, action) {
    storeFx.forEach(effect => {
        if (typeof effect === 'function') {
            effect(action, action => dispatchWithEffects(store, action));
        }
    });
    store.dispatch(action);

    // Save to asyncStorage to persist store
    AsyncStorage.setItem('store', JSON.stringify(store.getState()));
}

export default store;
export {
    allActions,
    getAppState
};
