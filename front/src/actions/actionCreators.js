import axios from 'axios';
export const AUTHENTICATE = 'AUTHENTICATE', AUTH_ERROR = 'AUTH_ERROR', SIGN_UP = 'SIGN_UP', MESSAGE = 'MESSAGE';

const ROOT_URL = 'http://localhost:8080';

export function signinUser({email, password, redirect}) {
  return function(dispatch) {
    // Submit email/password to the server
    axios.post(`${ROOT_URL}/signin`, { email, password })
      .then(response => {
        // If the request is good
        // - Update 'authenticated' state
        dispatch(updateAuth(true));
        // - Update 'error' state
        dispatch(authError(''));
        // - Save JWT token
        localStorage.setItem('token', response.data.token);
        // - Redirect to '/feature'
        redirect('/features');
      })
      .catch(() => {
        // If the request is bad
        // - Show an error
        dispatch(authError('Bad login info'));
      });
  };
}

export function authError(error) {
  return {
    type: AUTH_ERROR,
    payload: error
  };
}

export function signoutUser() {
  localStorage.removeItem('token');

  return {
    type: AUTHENTICATE,
    payload: false
  };
}

export function signupUser({email, password, redirect}) {
  return function(dispatch) {
    axios.post(`${ROOT_URL}/signup`, {email, password})
      .then(response => {
        dispatch(updateAuth(true));
        dispatch(authError(''));
        localStorage.setItem('token', response.data.token);
        redirect('/features');
      })
      .catch(error => {
        dispatch(authError(error.response.data.error));
      });
  };
}

export function updateAuth(auth) {
  return {
    type: AUTHENTICATE,
    payload: auth
  };
}

export function fetchMessage() {
  return function(dispatch) {
    axios.get(ROOT_URL, {
      headers: { authorization: localStorage.getItem('token') }
    })
    .then(response => {
      dispatch({ type: MESSAGE, payload: response.data.message });
    });
  };
}
