import { ACTIONS } from '../store-reducers/navigation';

function navigate(screen, params) {
    return {
        type: ACTIONS.CHANGE_SCREEN,
        screen,
        params
    }
}

function goBack() {
    return {
        type: ACTIONS.GO_BACK
    };
}

export {
    goBack,
    navigate
};
