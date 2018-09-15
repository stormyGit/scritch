export default function(state = false, action) {
  switch (action.type) {
    case 'SHOW_UPLOAD_DIALOG':
      return true;
    case 'HIDE_UPLOAD_DIALOG':
      return false;
    default:
      return state;
  }
}
