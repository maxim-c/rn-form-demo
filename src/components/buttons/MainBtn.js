import React from 'react';
import { StyleSheet, View } from 'react-native';
import Button from './Button';
import { Text } from '../text';

import { colors } from '../../styles';

import { Shadow, LoadingIndicator } from '../elements';

const MainBtn = ({ onPress, title = 'Title', style, accent = false, isProcessing = false }) => {
  let gradient = accent ? colors.dAccentGradient : colors.dPrimaryGradient;
  const handlePress = () => {
    !isProcessing && onPress && onPress();
  };
  return (
    <View style={style}>
      <Shadow>
        <Button gradient={gradient} style={styles.btn} onPress={handlePress}>
          <Text style={styles.title} medium>{title}</Text>
          {isProcessing && <LoadingIndicator style={styles.indicator}/>}
        </Button>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  btn: {
    alignItems: 'center',
    justifyContent: 'center',
    height: 40,
    borderRadius: 6
  },
  indicator: {
    position: 'absolute',
    bottom: 4
  },
  title: {
    color: colors.primaryText,
    fontSize: 16,
  }
});

export default MainBtn;