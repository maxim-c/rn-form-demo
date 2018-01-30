import React from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import NinePatchView from 'react-native-9patch-image';

const Shadow = ({ animatedStyle, children }) => {
  return (
    <View style={[styles.shadowHolder]}>
      <Animated.View style={[animatedStyle, styles.shadow]}>
        <NinePatchView
          source={{ 'uri': 'shadow_s' }}
          style={[styles.shadow]}
        />
      </Animated.View>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  shadowHolder: {
    marginTop: -13,
    marginBottom: -16,
    marginHorizontal: -14,
    paddingTop: 13,
    paddingBottom: 16,
    paddingHorizontal: 14,
  },
  shadow: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default Shadow;