import React, { PureComponent } from 'react';
import { ScrollView } from 'react-native';
import { PhoneField } from '../../components/fields';
import { MainBtn } from '../../components/buttons';

import styles from './styles';

class Login extends PureComponent {
  state = {
    isProcessing: false,
  }
  form = {}
  componentWillUnmount() {
    this._timeout && clearTimeout(this._timeout);
  }
  onChangeCountry = value => {
    this.country = value;
  }
  onChange = (value, field) => {
    this.form[field] = value;
  }
  handleGetCode = () => {
    this.setState({ isProcessing: true });
    this._timeout = setTimeout(() => {
      this.setState({ isProcessing: false });
    }, 3000);
  };
  render() {
    let { isProcessing } = this.state;
    return (
      <ScrollView
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
          onBlur={this.onBlur}
          onFocus={this.onFocus}
        />
        <MainBtn
          title='Get a one-time code'
          style={styles.rowMargin}
          onPress={this.handleGetCode}
          isProcessing={isProcessing}
          accent
        />
      </ScrollView>
    );
  }
}

export default Login;