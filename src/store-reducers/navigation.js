import Immutable from 'immutable';

const ACTIONS = {
    CHANGE_SCREEN: 'CHANGE_SCREEN',
    GO_BACK: 'GO_BACK'
};
const initialState = Immutable.fromJS({
    previousScreens: [],
    currentScreen: 'dashboard',
    params: {}
});

function navigationReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.CHANGE_SCREEN:
            return state
                .update('previousScreens', (previousScreens = Immutable.fromJS([])) => previousScreens.push(Immutable.fromJS({
                    name: state.get('currentScreen'),
                    params: state.get('params')
                })))
                .set('currentScreen', action.screen)
                .set('params', action.params || {});

        case ACTIONS.GO_BACK:
            return state
                .update('previousScreens', (previousScreens = Immutable.fromJS([])) => previousScreens
                    .filter((nothing, index) => index < previousScreens.count() - 1 && index < 10)
                )
                .set('currentScreen', state.getIn(['previousScreens', state.get('previousScreens').count() - 1, 'name']) || state.get('currentScreen'))
                .set('params', state.getIn(['previousScreens', state.get('previousScreens').count() - 1, 'params']) || state.get('params'))
    }

    return state;
}

export default navigationReducer;
export {
    ACTIONS
};
