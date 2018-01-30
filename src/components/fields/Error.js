import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from '../text';
import Icon from '../../icons';
import { colors } from '../../styles';

const Error = ({ style, message }) => {
  if (!message) return null;
  return (
    <View style={[styles.errorHolder, style]}>
      <Icon name='attention' style={styles.icoError}/>
      <Text style={styles.error}>{message}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  errorHolder: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  error: {
    width: 0,
    flexGrow: 1,
    color: colors.error,
  },
  icoError: {
    color: colors.error,
    fontSize: 16,
    marginTop: 2,
    marginHorizontal: 4
  }
});

export default Error;