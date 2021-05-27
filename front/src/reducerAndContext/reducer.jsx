export const initialState = { isloggin: false, todos: [], user: {} };

export const reducer = (state, action) => {
  switch (action.type) {
    case "IS_LOGGIN":
      return { ...state, isloggin: action.value }
    case "SET_TODOS":
      return { ...state, todos: action.value }
    case "GET_USER_INFOS":
      return { ...state, user: action.value }
    default:
      return state;
  }
}
