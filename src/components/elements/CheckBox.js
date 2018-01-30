import React, { Component } from 'react';
import { StyleSheet, Animated } from 'react-native';
import Icon from '../../icons';

import { colors } from '../../styles';

class CheckBox extends Component {
  //on android scale 0 not working as expected and 0.01 is workaround;
  checkedAnimated = new Animated.Value(0.01);
  componentWillReceiveProps(nextProps) {
    this.handleChecked(nextProps.isChecked);
  }
  shouldComponentUpdate() {
    return false;
  }
  handleChecked = isChecked => {
    let toValue = isChecked ? 1 : 0.01;
    Animated.timing(this.checkedAnimated, {
      duration: 200,
      toValue,
    }).start();
  }
  render() {
    let holderStyle = {
      borderColor: this.checkedAnimated.interpolate({
        inputRange: [0, 1],
        outputRange: [colors.primary, colors.accent]
      })
    };
    let icoStyle = {
      transform: [
        { scale: this.checkedAnimated }
      ]
    };
    return (
      <Animated.View style={[styles.holder, holderStyle]}>
        <Icon name='ok' style={[styles.ico, icoStyle]} animated/>
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  ico: {
    fontSize: 16,
    color: colors.accent
  },
  holder: {
    width: 25,
    height: 25,
    borderWidth: 2.5,
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default CheckBox;