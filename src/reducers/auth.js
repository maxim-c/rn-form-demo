const initialState = {
  isLogged: false,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case 'AUTH:LOGIN':
      return { isLogged: true, token: action.token };
    default:
      return state;
  }
};