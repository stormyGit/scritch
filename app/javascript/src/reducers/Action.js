export const ActionType = {
  TOOLBAR_SET_DRAWER: 0,
  TOOLBAR_CLOSE_DRAWER: 1,
  TOOLBAR_OPEN_DRAWER: 2,
  DIALOG_SET_SEARCH: 3,
  DIALOG_SET_SETTINGS: 4,
  DIALOG_SET_SPONSOR: 5,
  DIALOG_SET_SPONSOR_DASHBOARD: 6,
  DIALOG_SET_TIPS: 7,
  LIST_SET_DATABASE: 8,
  MENU_SET_SPONSOR: 9,
  SNACK_SET: 10,
  DIALOG_SET_ASSET: 11,
  DIALOG_SET_ADS: 12,
  DIALOG_SET_SPECIES: 13
}

export class Action {
  type;
  payload
}

// export const TOOLBAR = "toolbar";
// export const GOOGLE_SESSION = "google_session";
//
// export const SET_DRAWER = `${TOOLBAR}.set_drawer`
// export const CLOSE_DRAWER = `${TOOLBAR}.close_drawer`
// export const OPEN_DRAWER = `${TOOLBAR}.open_drawer`
// export const SET_LOGIN = `${TOOLBAR}.set_login`

export const setSearchPopupState = (open) => ({
  type: ActionType.DIALOG_SET_SEARCH,
  payload: open,
});

export const setDrawer = (open) => ({
  type: ActionType.TOOLBAR_SET_DRAWER,
  payload: open,
});

export const closeDrawer = () => ({
  type: ActionType.TOOLBAR_CLOSE_DRAWER,
  payload: false
});

export const openDrawer = () => ({
  type: ActionType.TOOLBAR_OPEN_DRAWER,
  payload: true
});