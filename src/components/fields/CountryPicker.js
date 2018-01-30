import React, { PureComponent } from 'react';
import { TouchableOpacity, View, Image, Keyboard, StyleSheet } from 'react-native';
import Icon from '../../icons';
import { Text } from '../../components/text';

import popup from '../../actions/popup';

class CountryPicker extends PureComponent {
  state = {
    selected: 0
  }
  countries = [
    { name: 'Norway', code: 'NO', img: require('../../images/norway_flag_48.png'), phoneCode: '+47' },
    { name: 'Denmark', code: 'DK', img: require('../../images/denmark_flag_48.png'), phoneCode: '+45' },
    { name: 'Sweden', code: 'SE', img: require('../../images/sweden_flag_48.png'), phoneCode: '+46' },
    { name: 'Ukraine', code: 'UA', img: require('../../images/ukraine_flag_48.png'), phoneCode: '+380' },
  ]
  componentWillMount() {
    this.props.onChange && this.props.onChange(this.countries[this.state.selected]);
  }
  componentWillReceiveProps(nextProps) {
    this.handleReplace(nextProps.replace);
  }
  handleReplace = replace => {
    if (replace && replace.code !== this.countries[this.state.selected]) {
      let i = this.countries.findIndex(item => item.code === replace.code);
      this.setState({ selected: i });
      this.props.onChange && this.props.onChange(this.countries[i]);
    }
  }
  handleChange = selected => {
    this.props.onChange && this.props.onChange(this.countries[selected]);
    this.setState({ selected });
    popup.hide();
  }
  renderRow = (item, i) => {
    return (
      <TouchableOpacity
        key={item.name}
        style={styles.rowBtn}
        onPress={() => this.handleChange(i)}
      >
        <Image source={item.img} style={styles.rowImg}/>
      </TouchableOpacity>
    );
  }
  onPress = () => {
    let { onFocus, isDisabled } = this.props;
    if (isDisabled) return;
    onFocus && onFocus(null, {
      input: this._holder,
      extraOffset: 250
    });
    Keyboard.dismiss();
    this._holder.measure((x, y, width, height, pageX, pageY) => {
      popup.show('options', {
        layoutStyles: {
          left: pageX,
          width: width,
          top: pageY + height,
        },
        options: this.countries,
        renderRow: this.renderRow
      });
    });
  }
  render() {
    let { prefixStyle } = this.props;
    let { img, phoneCode } = this.countries[this.state.selected];
    return (
      <View style={styles.holder}>
        <TouchableOpacity
          style={styles.btn}
          onPress={this.onPress}
          ref={c => {this._holder = c}}
        >
          <Image source={img} style={styles.img}/>
          <Icon name='angle-down' style={styles.ico}/>
        </TouchableOpacity>
        <Text style={[styles.prefix, prefixStyle]} animated>{phoneCode}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  btn: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  img: {
    width: 30,
    height: 30
  },
  ico: {
    fontSize: 18,
    marginHorizontal: 4
  },
  prefix: {
    fontSize: 20
  },
  rowImg: {
    width: 40,
    height: 40,
    marginVertical: 1
  },
  rowBtn: {
    alignItems: 'center',
  }
});

export default CountryPicker;