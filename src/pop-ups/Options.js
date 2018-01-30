import React, { PureComponent } from 'react';
import PT from 'prop-types';
import { View, ScrollView, StyleSheet, Animated, PanResponder } from 'react-native';
import { Shadow } from '../components/elements';

class Options extends PureComponent {
  static propTypes = {
    renderRow: PT.func.isRequired,
    options: PT.array.isRequired
  };
  animation = new Animated.Value(0)
  panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => {
      this.hide();
      return false;
    }
  });
  componentDidMount() {
    this.show();
  }
  animate = (toValue, after) => {
    Animated.timing(this.animation, {
      toValue,
      duration: 250,
      useNativeDriver: true
    }).start(after);
  }
  hide = () => {
    this.animate(0, this.props.hide);
  }
  show = () => {
    this.animate(1);
  }
  handlePress = () => {
    this.hide();
  }
  renderRow = (row, i) => {
    return this.props.renderRow(row, i);
  }
  render() {
    let { layoutStyles, options } = this.props;
    return (
      <Animated.View
        style={[styles.holder, { opacity: this.animation }]}
        collapsable={false}
        {...this.panResponder.panHandlers}
      >
        {
          options.length ?
            <Animated.View style={[styles.options, layoutStyles]}>
              <Shadow>
                <ScrollView
                  style={styles.scroll}
                  ref={c => { this._scroll = c }}
                  keyboardShouldPersistTaps='always'
                >
                  {options.map(this.renderRow)}
                </ScrollView>
              </Shadow>
            </Animated.View>
            :
            null
        }
      </Animated.View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    ...StyleSheet.absoluteFillObject,
  },
  scroll: {
    backgroundColor: 'white',
    borderRadius: 6,
  },
  options: {
    position: 'absolute',
  },
});

export default Options;