import React, { PureComponent } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text } from '../text';
import Icon from '../../icons';

import { colors } from '../../styles';

class DrawerLink extends PureComponent {
  render() {
    let { label, icon, onPress, isActive } = this.props;
    let condStyles = isActive ? styles.active : styles.inactive;
    return (
      <TouchableOpacity style={styles.holder} onPress={onPress} activeOpacity={0.6}>
        <Icon name={icon} style={[styles.ico, condStyles]}/>
        <Text style={[styles.label, condStyles]}>{label}</Text>
      </TouchableOpacity>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center'
  },
  ico: {
    fontSize: 14,
    marginRight: 8
  },
  label: {
    fontSize: 20,
  },
  active: {
    color: colors.accent
  },
  inactive: {
    color: colors.primaryText
  }
});

export default DrawerLink;