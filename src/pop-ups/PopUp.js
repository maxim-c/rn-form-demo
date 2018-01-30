import React, { PureComponent } from 'react';
import { BackHandler } from 'react-native';
import PT from 'prop-types';
import popups from './popups';
import { connect } from 'react-redux';
import popup from '../actions/popup';

import { get } from 'lodash';

class PopUp extends PureComponent {
  componentWillReceiveProps(nextProps) {
    nextProps.name ? this.addListener() : this.removeListener();
  }
  handler = () => {
    if (this.props.name) {
      this._popup.hide ? this._popup.hide() : popup.hide();
      return true; // This will prevent the regular handling of the back button
    }
    return false;
  }
  setRef = ref => {
    this._popup = ref;
    // this.props.setPopUpRef(ref);
  }
  addListener() {
    BackHandler.addEventListener('hardwareBackPress', this.handler);
  }
  removeListener() {
    BackHandler.removeEventListener('hardwareBackPress', this.handler);
  }
  render() {
    let { name, passProps } = this.props;
    if (!name) return null;
    let Component = get(popups, [name, 'component'], null);
    if (!Component) {
      console.warn('PopUp: Something wrong with popup component render!');
      return null;
    }
    return <Component {...passProps} hide={popup.hide} ref={this.setRef}/>;
  }
}

PopUp.propTypes = {
  name: PT.string,
};

export default connect(state => ({
  name: state.popup.name,
  passProps: state.popup.props
}))(PopUp);
