import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async (dispatch) => {
	const response = await jsonPlaceholder.get('/posts');

	// must return plain js objects with type property, thunk allows us to return a function too!
	dispatch({ type: 'FETCH_POSTS', payload: response.data });
};
