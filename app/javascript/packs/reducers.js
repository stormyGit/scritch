import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import signUpDialog from './reducers/signUpDialog';

export default combineReducers({
  form: formReducer,
  signUpDialog
});
