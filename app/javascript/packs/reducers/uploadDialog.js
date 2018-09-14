export default function(state = true, action) {
  switch (action.type) {
    case 'SHOW_UPLOAD_DIALOG':
      return true;
    case 'HIDE_UPLOAD_DIALOG':
      return false;
    default:
      return state;
  }
}
