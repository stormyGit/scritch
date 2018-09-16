import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signUpDialog from './reducers/signUpDialog';
import uploadDialog from './reducers/uploadDialog';
import termsDialog from './reducers/termsDialog';
import privacyPolicyDialog from './reducers/privacyPolicyDialog';

export default combineReducers({
  form: formReducer,
  signUpDialog,
  uploadDialog,
  termsDialog,
  privacyPolicyDialog,
});
