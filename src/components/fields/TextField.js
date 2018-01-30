import React, { PureComponent } from 'react';
import { View, TextInput, StyleSheet, Animated, Platform, PixelRatio } from 'react-native';

import { Text } from '../text';
import { Shadow } from '../elements';
import Icon from '../../icons';
import Error from './Error';
import { colors } from '../../styles';

class TextField extends PureComponent {
  static defaultProps = {
    blurOnSubmit: false,
    autoCorrect: false
  };
  activeAnimated = new Animated.Value(0);
  emptyAnimated = new Animated.Value(0);
  _value = '';
  setRef = c => {
    let { setRef, name } = this.props;
    this._textInput = c;
    setRef && setRef({ ref: c, name: name });
  };
  replace = text => {
    this._textInput.setNativeProps({ text });
    this.emptyAnimated.setValue(text.length ? 1 : 0);
    this.handleOnChange(text);
  }
  onFocus = ({ nativeEvent }) => {
    let { onFocus, name } = this.props;
    let animations = [
      Animated.timing(this.activeAnimated, {
        toValue: 1,
        duration: 250,
        useNativeDriver: true
      }),
      Animated.timing(this.emptyAnimated, {
        toValue: 1,
        duration: 250,
      })
    ];
    Animated.parallel(animations).start();
    onFocus && onFocus(nativeEvent, name);
  }
  onBlur = ({ nativeEvent }) => {
    let { onBlur, name } = this.props;
    let animations = [
      Animated.timing(this.activeAnimated, {
        toValue: 0,
        duration: 250,
        useNativeDriver: true
      })
    ];
    if (!this._value.length) {
      animations.push(
        Animated.timing(this.emptyAnimated, {
          toValue: 0,
          duration: 250,
        })
      );
    }
    Animated.parallel(animations).start();
    onBlur && onBlur(nativeEvent, name);
  }
  handleOnChange = text => {
    let { onChangeText, name } = this.props;
    this._value = text;
    onChangeText && onChangeText(text, name);
  }
  renderLeftElement = () => {
    let { leftElement = null } = this.props;
    return leftElement && leftElement(
      {
        animated: {
          active: this.activeAnimated,
          empty: this.emptyAnimated
        }
      }
    );
  }
  render() {
    let {
      label,
      icon,
      style,
      error,
      leftElement,
      //removing from props
      onChangeText,
      onBlur,
      onFocus,
      setRef,
      ...props
    } = this.props;
    let shadowOpacityStyle = { opacity: this.activeAnimated };
    let icoStyles = { color: this.emptyAnimated.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.placeholder, colors.primary]
    }) };

    let inputHolderStyle = [styles.inputHolder];
    error && inputHolderStyle.push(styles.inputHolderError);
    return (
      <View style={[style]}>
        {label ? <Text style={styles.label}>{label}</Text> : null}
        <Shadow animatedStyle={shadowOpacityStyle}>
          <View style={inputHolderStyle}>
            {icon && <Icon name={icon} style={[styles.ico, icoStyles]} animated/>}
            {this.renderLeftElement()}
            <TextInput
              ref={this.setRef}
              onFocus={this.onFocus}
              onBlur={this.onBlur}
              style={styles.input}
              onChangeText={this.handleOnChange}
              placeholderTextColor={colors.placeholder}
              underlineColorAndroid='rgba(0,0,0,0)'
              {...props}
            />
          </View>
        </Shadow>
        <Error message={error}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  inputHolder: {
    paddingHorizontal: 16,
    paddingVertical: 4,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBG,
    borderWidth: PixelRatio.roundToNearestPixel(1), //fixing visual different border width
    borderRadius: 6,
    borderColor: colors.borderColor,
  },
  inputHolderError: {
    borderColor: colors.error,
  },
  input: {
    flex: 1,
    minHeight: 34,
    color: colors.text,
    padding: 0,
    fontSize: 20,
    fontFamily: 'Quicksand-Regular',
    transform: [{ translateY: Platform.OS === 'ios' ? 1 : 0 }] //align a bit vertically font on ios.
  },
  label: {
    marginBottom: 2,
    marginLeft: 2,
  },
  ico: {
    fontSize: 16,
    marginRight: 16,
  },
});

export default TextField;