import React, { PureComponent } from 'react';
import { UIManager } from 'NativeModules';
import { ScrollView, findNodeHandle, Platform, Keyboard } from 'react-native';
import { TextField, PhoneField, TermsAccept } from '../../components/fields';
import { MainBtn } from '../../components/buttons';

import styles from './styles';

class Registration extends PureComponent {
  state = {
    isProcessing: false
  }
  _fields = {};
  form = {};

  componentWillMount () {
    this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {this.keyboardIsShowed = true});
    this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {this.keyboardIsShowed = false});
  }

  componentWillUnmount () {
    this.keyboardDidShowListener.remove();
    this.keyboardDidHideListener.remove();
    this._timeout && clearTimeout(this._timeout);
  }

  setFieldRef = ({ ref, name }) => {
    this._fields[name] = ref;
  }

  setScrollRef = c => {
    this._scroll = c;
  }

  onSubmitEditing = nextFieldName => this._fields[nextFieldName].focus()

  handleSubmit = () => {
    this.setState({ isProcessing: true });
    this._timeout = setTimeout(() => {
      this.setState({ isProcessing: false });
    }, 3000);
  };
  onChange = (value, field) => {
    this.form[field] = value;
  }
  onFocus = ({ target }) => {
    let scrollResponder = this._scroll.getScrollResponder();
    UIManager.measure(
      findNodeHandle(this._scroll),
      (x, y, width, height, pageX, pageY) => {
        let osOffset = Platform.OS === 'ios' ? 26 : 50;
        let delay = this.keyboardIsShowed ? 0 : Platform.OS === 'ios' ? 50 : 200;
        setTimeout(() => {
          scrollResponder.scrollResponderScrollNativeHandleToKeyboard(
            findNodeHandle(target),
            osOffset + pageY, //additionalOffset
            true //preventNegativeScrollOffset
          );
        }, delay);
      }
    );
  }
  render() {
    let { isProcessing } = this.state;
    return (
      <ScrollView
        ref={this.setScrollRef}
        style={styles.page}
        contentContainerStyle={styles.content}
        keyboardShouldPersistTaps='handled'
      >
        <PhoneField
          style={styles.field}
          name='phone_number'
          returnKeyType='next'
          onChangeText={this.onChange}
          onChangeCountry={this.onChangeCountry}
          onSubmitEditing={() => this.onSubmitEditing('firstName')}
          onFocus={this.onFocus}
        />
        <TextField
          setRef={this.setFieldRef}
          style={styles.field}
          returnKeyType='next'
          name='firstName'
          label='First name'
          placeholder='Tell us your name'
          onChangeText={this.onChange}
          onSubmitEditing={() => this.onSubmitEditing('lastName')}
          onFocus={this.onFocus}
        />
        <TextField
          setRef={this.setFieldRef}
          returnKeyType='next'
          style={styles.field}
          name='lastName'
          label='Your last name'
          placeholder='Jensen'
          onChangeText={this.onChange}
          onSubmitEditing={() => this.onSubmitEditing('email')}
          onFocus={this.onFocus}
        />
        <TextField
          setRef={this.setFieldRef}
          returnKeyType='done'
          style={styles.field}
          name='email'
          label='Email address'
          placeholder='Enter your email'
          icon='mail-alt'
          autoCapitalize='none'
          onChangeText={this.onChange}
          onSubmitEditing={() => this._fields['email'].blur()}
          onFocus={this.onFocus}
        />
        <TermsAccept
          style={styles.rowMargin}
          name='accept'
          onChange={this.onChange}
        />

        <MainBtn
          style={styles.rowMargin}
          title='Create account'
          onPress={this.handleSubmit}
          isProcessing={isProcessing}
          accent
        />
      </ScrollView>
    );
  }
}

export default Registration;