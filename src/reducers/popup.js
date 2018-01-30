export default (state = {}, action) => {
  switch (action.type) {
    case 'POPUP:SHOW':
      return { name: action.name, props: action.props };
    default:
      return state;
  }
};