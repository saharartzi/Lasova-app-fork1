import { authService } from '../../services/auth-service';
import { LOGIN_SUCCESS, USER_LOADED, AUTH_ERROR, LOGOUT, RESET_APP } from './types';

export const loadUser = (user) => async (dispatch) => {
  try {
    dispatch({
      type: USER_LOADED,
      payload: user
    });
  } catch (err) {
    console.log('🚀 ~ file: auth.js ~ line 14 ~ loadUser ~ err', err);
    dispatch({
      type: AUTH_ERROR
    });
  }
};

//======================================================
export const login = (email, password) => async (dispatch) => {
  try {
    const token = await authService.login(email, password);
    dispatch({
      type: LOGIN_SUCCESS,
      payload: token
    });
    dispatch(loadUser(token));
  } catch (error) {
    // window.alert('Credentials issues. Please try again')
    console.log('🚀 ~ file: store/actions/auth.js ~ line 34 ~ login ~ error', error);
    
  }
};

//======================================================
export const logout = () => ({ type: LOGOUT });


//======================================================
export const clickLogOut = () => async (dispatch) => {
  try {
    dispatch({
      type: RESET_APP, //more data can be found in tje rootreducer.js
     
    });
  } catch (err) {
    console.log('🚀 ~ file: auth.js ~ line 52 ~ clickLogOut ~ err', err);
  }
};