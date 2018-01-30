import React from 'react';
import { Animated, StyleSheet, View } from 'react-native';

const Shadow = ({ animatedStyle, children }) => {
  return (
    <View>
      <Animated.View style={[styles.shadow, animatedStyle]} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadow: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 6,
    backgroundColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
  }
});

export default Shadow;