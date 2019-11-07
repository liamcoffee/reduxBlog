// lodash to use memoize
import _ from 'lodash';
import jsonPlaceholder from '../apis/jsonPlaceholder';

export const fetchPostsAndUsers = () => async (dispatch, getState) => {
	await dispatch(fetchPosts());

	// using loadsh to again, using their map function, uniq get all uniq ids

	// const userIds = _.uniq(_.map(getState().posts, 'userId'));
	// userIds.forEach((id) => dispatch(fetchUser(id)));
	// console.log(userIds);

	// lodash chain, currying?  .value is need (basically an execute!?)

	_.chain(getState().posts).map('userId').uniq().forEach((id) => dispatch(fetchUser(id))).value();
};

export const fetchPosts = () => async (dispatch) => {
	const response = await jsonPlaceholder.get('/posts');

	// must return plain js objects with type property, thunk allows us to return a function too!
	dispatch({ type: 'FETCH_POSTS', payload: response.data });
};

export const fetchUser = (userId) => async (dispatch) => {
	const response = await jsonPlaceholder.get(`/users/${userId}`);

	dispatch({ type: 'FETCH_USER', payload: response.data });
};

// must momoize function outside the aciton creator for it to acutally work. _ means its private, dont user anywhere else.

// const _fetchUser = _.memoize(async (userId, dispatch) => {
// 	const response = await jsonPlaceholder.get(`/users/${userId}`);

// 	dispatch({ type: 'FETCH_USER', payload: response.data });
// });

// Another approach, useful if you need to get updated users
