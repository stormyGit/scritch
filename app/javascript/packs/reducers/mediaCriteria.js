export default function(state = {}, action) {
  switch (action.type) {
    case 'SET_MEDIA_CRITERIA':
      return action.payload;
    default:
      return state;
  }
}
