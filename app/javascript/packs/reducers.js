import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signInDialog from './reducers/signInDialog';
import signUpDialog from './reducers/signUpDialog';

export default combineReducers({
  form: formReducer,
  signInDialog,
  signUpDialog
});
