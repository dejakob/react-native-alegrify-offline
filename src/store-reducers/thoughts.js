import Immutable from 'immutable';
import moment from 'moment';

const ACTIONS = {
    THOUGHTS_ADD: 'THOUGHTS_ADD',
    THOUGHTS_ADD_SUCCESS: 'THOUGHTS_ADD_SUCCESS',
    
    THOUGHTS_REFLECTION_ADD: 'THOUGHTS_REFLECTION_ADD',
    THOUGHTS_REFLECTION_ADD_SUCCESS: 'THOUGHTS_REFLECTION_ADD_SUCCESS',

    THOUGHTS_LOADED_THOUGHTS: 'THOUGHTS_LOADED_THOUGHTS'
};
const initialState = Immutable.fromJS({
    thoughts: []
});

function thoughtsReducer(state = initialState, action) {
    switch (action.type) {
        case ACTIONS.THOUGHTS_ADD:
            return state.update('thoughts', thoughts => thoughts.push(Immutable.fromJS({
                created_at: moment().format(),
                updated_at: moment().format(),
                reflections: [],
                id: action.id,
                thought: action.thought,
                thought_event: action.event,
                my_mood: action.score,
                my_mood_type: action.mood
            })));

        case ACTIONS.THOUGHTS_REFLECTION_ADD:
            return state.update('thoughts', thoughts => thoughts.map(thought => {
                if (thought.get('id') === action.thought) {
                    return thought.update('reflections', reflections => reflections.push({
                        created_at: moment().format(),
                        updated_at: moment().format(),
                        _id: action.id,

                        // Mood = thought
                        mood_id: action.thought,
                        reflection: action.reflection,
                        reliability: action.reliability
                    }));
                } 

                return thought;
            }));
    }

    return state;
}

export default thoughtsReducer;
export {
    ACTIONS
};
