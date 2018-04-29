import { combineReducers } from 'redux';
import authenticationReducer from './authenticationReducer';
import errorReducer from './errorReducer';
import messageReducer from './messageReducer';

const rootReducer = combineReducers({
  authenticated: authenticationReducer,
  error: errorReducer,
  message: messageReducer
});

export default rootReducer;
