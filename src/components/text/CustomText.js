import React from 'react';
import { Text, StyleSheet, Animated } from 'react-native';
import { colors } from '../../styles';

const CustomText = ({ style, animated, medium, center, ...props }) => {
  let Component = animated ? Animated.Text : Text;
  let fontFamily = medium ? styles.medium : styles.regular;
  let textStyles = [styles.text, fontFamily, style];
  center && textStyles.push(styles.center);
  return (
    <Component style={textStyles} {...props}/>
  );
};

const styles = StyleSheet.create({
  text: {
    color: colors.text,
    backgroundColor: 'transparent',
  },
  regular: {
    fontFamily: 'Quicksand-Regular',
  },
  medium: {
    fontFamily: 'Quicksand-Medium',
  },
  center: {
    textAlign: 'center'
  }
});

export default CustomText;