import { bindActionCreators } from 'redux';
import { store } from '../store';

const show = (name = null, props = {}) => ({ type: 'POPUP:SHOW', name, props }); //hides popup with empty arguments
const hide = () => show();

export default bindActionCreators({
  show,
  hide
}, store.dispatch);