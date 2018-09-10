export default function(state = false, action) {
  switch (action.type) {
    case 'SHOW_SIGN_IN_DIALOG':
      return true;
    case 'HIDE_SIGN_IN_DIALOG':
      return false;
    default:
      return state;
  }
}
