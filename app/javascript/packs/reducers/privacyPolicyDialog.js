export default function(state = false, action) {
  switch (action.type) {
    case 'SHOW_PRIVACY_POLICY_DIALOG':
      return true;
    case 'HIDE_PRIVACY_POLICY_DIALOG':
      return false;
    default:
      return state;
  }
}
