export default function(state = false, action) {
  switch (action.type) {
    case 'SHOW_TERMS_DIALOG':
      return true;
    case 'HIDE_TERMS_DIALOG':
      return false;
    default:
      return state;
  }
}
