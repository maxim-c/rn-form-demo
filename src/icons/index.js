import React from 'react';
import { Animated, StyleSheet } from 'react-native';
import { createIconSetFromFontello } from 'react-native-vector-icons';
import fontelloConfig from './config.json';

const IconSet = createIconSetFromFontello(
  fontelloConfig,
  'app-icons',
  'app-icons.ttf'
);

const AnimatedIcon = Animated.createAnimatedComponent(IconSet);

const Icon = ({ animated, style, ...props }) => {
  let Component = animated ? AnimatedIcon : IconSet;
  return <Component style={[styles.ico, style]} {...props}/>;
};

const styles = StyleSheet.create({
  ico: {
    backgroundColor: 'transparent'
  }
});

export default Icon;