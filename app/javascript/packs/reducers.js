import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signUpDialog from './reducers/signUpDialog';
import uploadDialog from './reducers/uploadDialog';

export default combineReducers({
  form: formReducer,
  signUpDialog,
  uploadDialog
});
