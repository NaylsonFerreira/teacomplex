const inicialState = {
  firebase_user: null,
  custom_console: 'Initial Console...',
};

export default function UserReducer(state = inicialState, action) {
  switch (action.type) {
    case 'firebase_user':
      return {
        ...state,
        firebase_user: action.payload,
      };
    case 'custom_console':
      return {
        ...state,
        custom_console: action.payload,
      };
    default:
      return state;
  }
}
