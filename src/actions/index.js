// lodash to use memoize
import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPosts = () => async (dispatch) => {
	const response = await jsonPlaceholder.get('/posts');

	// must return plain js objects with type property, thunk allows us to return a function too!
	dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (userId) => (dispatch) => {
	_fetchUser(userId, dispatch);
};

// must momoize function outside the aciton creator for it to acutally work. _ means its private, dont user anywhere else.

const _fetchUser = _.memoize(async (userId, dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${userId}`);

	dispatch({ type: 'FETCH_USER', payload: response.data });
});
