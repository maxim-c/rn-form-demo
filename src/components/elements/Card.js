import React from 'react';
import { View, StyleSheet } from 'react-native';
import Shadow from './Shadow';

const Card = ({ children, style, contentStyle }) => {
  return (
    <View style={style}>
      <Shadow>
        <View style={[styles.content, contentStyle]}>
          {children}
        </View>
      </Shadow>
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    backgroundColor: 'white',
    borderRadius: 6,
  }
});

export default Card;