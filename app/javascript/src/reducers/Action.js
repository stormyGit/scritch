export const ActionType = {
  TOOLBAR_SET_DRAWER: 0,
  TOOLBAR_CLOSE_DRAWER: 1,
  TOOLBAR_OPEN_DRAWER: 2
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