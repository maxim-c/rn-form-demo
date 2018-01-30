import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import {
  TouchableWithoutFeedback,
  Animated,
  View,
  StyleSheet,
  Easing
} from 'react-native';

const EFFECT_SIZE = 300;
const EFFECT_DURATION = 5000;

class Effect extends React.Component {
  startTime = Date.now();
  transition = new Animated.Value(0);
  shouldComponentUpdate = () => false;
  animate = duration => {
    Animated.timing(this.transition, {
      toValue: 1,
      easing: Easing.bezier(0.05, 0.6, 0.15, 0.7),
      useNativeDriver: true,
      duration
    }).start(({ finished }) => finished && this.props.onEffectEnd());
  }
  componentDidMount() {
    this.animate(EFFECT_DURATION);
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.burst) {
      let burstDuration = (EFFECT_DURATION - (Date.now() - this.startTime)) / 6;
      this.animate(burstDuration);
    }
  }
  render() {
    let { x, y } = this.props;
    const overlayStyles = {
      top: y,
      left: x,
      transform: [
        { scale: this.transition.interpolate({ inputRange: [0, 1], outputRange: [0.01, 2] }) },
      ],
      opacity: this.transition.interpolate({ inputRange: [0, 1], outputRange: [0.8, 0] })
    };
    return <Animated.View style={[styles.overlay, overlayStyles]}/>;
  }
}

class Button extends React.PureComponent {
  static defaultProps = {
    ContentHolder: ({ gradient, ...props }) => gradient ? <LinearGradient {...gradient} {...props}/> : <View {...props}/>
  };
  state = {
    effects: []
  }
  effectKey = 0;
  onPressIn = ({ nativeEvent: { locationX, locationY } }) => {
    let effect = {
      x: locationX - EFFECT_SIZE / 2,
      y: locationY - EFFECT_SIZE / 2,
      onEffectEnd: this.onEffectEnd,
      key: this.effectKey++
    };
    let effects = [...this.state.effects, <Effect {...effect} />]; // eslint-disable-line react/jsx-key
    this.setState({ effects });
  };
  onPressOut = () => {
    if (this.state.effects.length) {
      let i = this.state.effects.length - 1;
      let effects = [...this.state.effects];
      effects[i] = React.cloneElement(this.state.effects[i], { burst: true });
      this.setState({ effects });
    }
  };
  onEffectEnd = () => this.setState({ effects: this.state.effects.slice(1) });
  render() {
    let { ContentHolder, onPress, style, touchableStyle, gradient, children } = this.props;
    return (
      <TouchableWithoutFeedback
        onPressIn={this.onPressIn}
        onPressOut={this.onPressOut}
        onPress={onPress}
        style={[touchableStyle]}
      >
        <ContentHolder style={[styles.holder, style]} pointerEvents='box-only' gradient={gradient}>
          {this.state.effects}
          {children}
        </ContentHolder>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    overflow: 'hidden',
  },
  overlay: {
    position: 'absolute',
    backgroundColor: 'rgba(255, 255, 255, 0.6)',
    width: EFFECT_SIZE,
    height: EFFECT_SIZE,
    borderRadius: EFFECT_SIZE / 2,
  }
});

export default Button;
