import {Action, ActionType} from "./Action";


const initialState = {
  getUploadDialogState: false,
  getSignUpDialogState: false,
  getActivitiesDialogState: false,
  getChatDialogState: false,
  getSpeciesDialogState: false,
  getSettingsDialogState: false,
  getAdvertiseDialogState: false,
  getTechDialogState: false
};

const DialogReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.DIALOG_SET_SEARCH:
      return {...state, getSearchDialogState: action.payload}
    case ActionType.DIALOG_SET_SETTINGS:
      return {...state, getSettingsDialogState: action.payload}
    case ActionType.DIALOG_SET_SPONSOR:
      return {...state, getSponsorDialogState: action.payload}
    case ActionType.DIALOG_SET_SPONSOR_DASHBOARD:
      return {...state, getSponsorDashboardDialogState: action.payload}
    case ActionType.DIALOG_SET_TIPS:
      return {...state, getTipsDialogState: action.payload}
    case ActionType.LIST_SET_DATABASE:
      return {...state, getDatabaseListState: action.payload}
    case ActionType.MENU_SET_SPONSOR:
      return {...state, getSponsorMenuSate: action.payload}
    case ActionType.SNACK_SET:
      return {...state, getSnackState: action.payload}
    case ActionType.DIALOG_SET_ASSET:
      return {...state, getAssetDialogState: action.payload}
    case ActionType.DIALOG_SET_ADS:
      return {...state, getAdvertisementDialogState: action.payload}
    case ActionType.DIALOG_SET_SPECIES:
      return {...state, getSpeciesDialogState: action.payload}
    case ActionType.DIALOG_SET_ACTIVITIES:
      return {...state, getActivitiesDialogState: action.payload}
    case ActionType.DIALOG_SET_CHAT:
      return {...state, getChatDialogState: action.payload}
    case ActionType.DIALOG_SET_SIGNUP:
      return {...state, getSignUpDialogState: action.payload}
    case ActionType.DIALOG_SET_TECH:
      return {...state, getTechDialogState: action.payload}
    case ActionType.DIALOG_SET_UPLOAD:
      return {...state, getUploadDialogState: action.payload}
    default:
      return {
        ...state,
      };
  }
}

export {initialState, DialogReducer};