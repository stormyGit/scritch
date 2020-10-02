import {Action, ActionType} from "./Action";


const initialState = {
  isDrawerOpen: false,
  isLoggedIn: false
};

const NavigationReducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.TOOLBAR_SET_DRAWER:
      return {
        ...state,
        isDrawerOpen: action.payload,
      };
    case ActionType.TOOLBAR_CLOSE_DRAWER:
      return {
        ...state,
        isDrawerOpen: false,
      };
    case ActionType.TOOLBAR_OPEN_DRAWER:
      return {
        ...state,
        isDrawerOpen: true,
      };
    default:
      return {
        ...state,
      };
  }
}

export {initialState, NavigationReducer};
