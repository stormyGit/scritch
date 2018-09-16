import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signUpDialog from './reducers/signUpDialog';
import uploadDialog from './reducers/uploadDialog';
import mediaCriteria from './reducers/mediaCriteria';

export default combineReducers({
  form: formReducer,
  signUpDialog,
  uploadDialog,
  mediaCriteria,
});
