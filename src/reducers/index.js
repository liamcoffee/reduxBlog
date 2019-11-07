import { combineReducers } from 'redux';
import postsReducer from './postsReducer';
import userReducer from './userReducer';

// combined state of the app
export default combineReducers({
	posts: postsReducer,
	users: userReducer
});
