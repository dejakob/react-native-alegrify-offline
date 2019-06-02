import cuid from 'cuid';
import { ACTIONS } from '../store-reducers/thoughts';

function add(mood, score, thought, event) {
    return {
        type: ACTIONS.THOUGHTS_ADD,
        id: `temp_${cuid()}`,
        mood,
        score,
        thought,
        event
    }
}

function addReflection(thought, reflection, reliability) {
    if (typeof thought !== 'string') {
        throw new Error('Please provide thought id');
    }

    return {
        type: ACTIONS.THOUGHTS_REFLECTION_ADD,
        id: `temp_${cuid()}`,
        thought,
        reflection,
        reliability
    };
}

export {
    add,
    addReflection
};
