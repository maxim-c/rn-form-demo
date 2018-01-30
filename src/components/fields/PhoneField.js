import React, { PureComponent } from 'react';
import { TextField, CountryPicker } from '.';

import { colors } from '../../styles';

class PhoneField extends PureComponent {
  text = ''
  prefix = ''
  setFieldRef = c => {
    this._field = c;
  };
  componentWillReceiveProps(nextProps) {
    this.handleReplace(nextProps.replace);
  }
  handleReplace = replace => {
    if (replace && replace !== this.props.replace) {
      let { country: { phoneCode }, phone } = replace;
      this._field.replace(
        phone.replace(phoneCode, '')
      );
    }
  }
  onChangeText = (value, field) => {
    let { onChangeText } = this.props;
    this.text = value;
    onChangeText && onChangeText(this.prefix + this.text, field);
  }
  onChangeCountry = value => {
    let { onChangeText, onChangeCountry, name } = this.props;
    this.prefix = value.phoneCode;
    onChangeCountry && onChangeCountry(value);
    onChangeText && onChangeText(this.prefix + this.text, name);
  }
  renderLeftElement = ({ animated: { empty } }) => {
    let { replace: { country } = {} } = this.props;
    let prefixStyle = { color: empty.interpolate({
      inputRange: [0, 1],
      outputRange: [colors.placeholder, colors.primary]
    }) };
    return (
      <CountryPicker
        prefixStyle={prefixStyle}
        onChange={this.onChangeCountry}
        replace={country}
      />
    );
  }
  render() {
    let { style, onChangeText, ...rest } = this.props;
    return (
      <TextField
        ref={this.setFieldRef}
        keyboardType='phone-pad'
        maxLength={10}
        style={style}
        label='Phone number'
        icon='phone'
        leftElement={this.renderLeftElement}
        onChangeText={this.onChangeText}
        {...rest}
      />
    );
  }
}

export default PhoneField;