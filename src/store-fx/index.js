/**
 * Add asyncronous effects here
 * Whenever the async effect is done, dispatch another action
 * 
 * @example
 *   function thoughtEffect(action, dispatch) {
 *      switch (action.type) {
 *         case 'ADD_THOUGHT':
 *            return addThought(action, dispatch);
 *      }
 *   }
 * 
 *   async function addThought(action, dispatch) {
 *       try {
 *           const { moodId } = await Api.post('/api/mood', {
 *               my_mood_type: action.mood,
 *               my_mood: action.score,
 *               thought_thought: action.thought,
 *               thought_event: action.event
 *           });
 *   
 *           dispatch({
 *               type: `${action.type}_SUCCESS`,
 *               oldId: action.id,
 *               newId: moodId
 *           });
 *           allActions.navigation.navigate('dashboard');
 *       }
 *       catch (ex) {
 *           logError(ex);
 *           dispatch({
 *               type: `${action.type}_FAILED`
 *           });
 *   
 *       }
 *   }
 *
 */
export default [];
