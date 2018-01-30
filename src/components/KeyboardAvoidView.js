import React, { PureComponent } from 'react';
import { Keyboard, Animated, Platform } from 'react-native';

class KeyboardAvoidView extends PureComponent {
  keyboardHeight = new Animated.Value(0);
  componentWillMount() {
    this.keyboardWillShowListener = Keyboard.addListener('keyboardWillShow', this.show);
    this.keyboardWillHideListener = Keyboard.addListener('keyboardWillHide', this.hide);
  }
  componentWillUnmount () {
    this.keyboardWillShowListener.remove();
    this.keyboardWillHideListener.remove();
  }
  show = ({ duration, endCoordinates: { height } }) => {
    Animated.timing(this.keyboardHeight, {
      duration,
      toValue: height
    }).start();
  }
  hide = ({ duration }) => {
    Animated.timing(this.keyboardHeight, {
      duration,
      toValue: 0
    }).start();
  }
  render() {
    return Platform.OS === 'ios' ? <Animated.View style={{ height: this.keyboardHeight }}/> : null;
  }
}

export default KeyboardAvoidView;