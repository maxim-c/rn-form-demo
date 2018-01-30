import React, { PureComponent } from 'react';
import { Animated, View, StyleSheet } from 'react-native';

class LoadingIndicator extends PureComponent {
  animation = new Animated.Value(0.01);
  componentDidMount() {
    let { loop, sequence, timing } = Animated;
    let config = {
      duration: 2000,
      useNativeDriver: true
    };
    loop(sequence(
      [2, 0].map(toValue => timing(this.animation, {
        toValue,
        ...config
      }))
    )).start();
  }
  render() {
    let { style } = this.props;
    return (
      <View style={[styles.holder, style]}>
        {[...Array(5)].map((v, i) => {
          let anim = {
            transform: [{
              scale: this.animation.interpolate({
                inputRange: [0 + i * 0.2, 1, 1.2 + i * 0.2],
                outputRange: [0.3, 1, 0.3],
                extrapolate: 'clamp'

              })
            }]
          };
          return <Animated.View key={i} style={[styles.circle, anim]}/>;
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    flexDirection: 'row'
  },
  circle: {
    marginHorizontal: 2,
    width: 10,
    height: 6,
    borderRadius: 6,
    backgroundColor: 'white'
  }
});

export default LoadingIndicator;