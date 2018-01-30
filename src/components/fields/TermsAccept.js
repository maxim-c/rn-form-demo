import React, { PureComponent } from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';
import { CheckBox } from '../elements';
import { Text } from '../text';
import Error from './Error';
import { colors } from '../../styles';

import { openUrl } from '../../rn-apis';

class TermsAccept extends PureComponent {
  state = {
    isChecked: false
  }
  handleChange = () => {
    let { onChange, name } = this.props;
    onChange && onChange(!this.state.isChecked, name);
    this.setState({ isChecked: !this.state.isChecked });
  }
  render() {
    let { style, error } = this.props;
    return (
      <View>
        <TouchableOpacity style={[styles.holder, style]} activeOpacity={0.8} onPress={this.handleChange}>
          <CheckBox isChecked={this.state.isChecked}/>
          <View style={styles.labelHolder}>
            <Text>
              I agree to the
              <Text style={styles.link} medium onPress={() => openUrl('https://www.lipsum.com/')}> Terms of Use </Text>
              and
              <Text style={styles.link} medium onPress={() => openUrl('https://www.lipsum.com/')}> Privacy Policy</Text>
            </Text>
          </View>
        </TouchableOpacity>
        <Error message={error}/>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  labelHolder: {
    marginLeft: 8,
    width: 0,    // hack to wrap text in
    flexGrow: 1, // parent with flexDirection: 'row'
  },
  link: {
    color: colors.accent
  }
});

export default TermsAccept;