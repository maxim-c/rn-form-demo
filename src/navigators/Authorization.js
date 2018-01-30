import React from 'react';
import { StyleSheet, View, Platform } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';
import { Login, Registration } from '../pages/authorization';
import { Text } from '../components/text';

import { colors } from '../styles';

const styles = StyleSheet.create({
  cardStyle: {
    backgroundColor: 'red'
  },
  header: {
    backgroundColor: colors.primary,
    paddingTop: Platform.OS === 'ios' ? 20 : 8,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  tabBar: {
    backgroundColor: colors.primary,
  },
  indicator: {
    backgroundColor: colors.accent
  },
  label: {
    fontSize: 16,
    transform: [{ translateY: Platform.OS === 'ios' ? 3 : 0 }] //align a bit vertically font on ios.
  },
  headerTitle: {
    color: 'white',
    fontSize: 30
  }
});

const config = {
  tabBarComponent: TabBarTop,
  tabBarOptions: {
    style: styles.tabBar,
    indicatorStyle: styles.indicator,
    activeTintColor: colors.accent,
    inactiveTintColor: colors.primaryText,
    labelStyle: styles.label,
    upperCaseLabel: false
  },
  cardStyle: styles.cardStyle,
  tabBarPosition: 'top',
  animationEnabled: true,
  swipeEnabled: true,
};

const Tabs = TabNavigator({
  Registration: {
    screen: Registration,
    navigationOptions: {
    }
  },
  Login: {
    screen: Login,
    navigationOptions: {
    }
  },
}, config);

const Authorization = () => {
  return (
    <View flex={1}>
      <View style={styles.header} >
        <Text style={styles.headerTitle} medium center>DEMO</Text>
      </View>
      <Tabs />
    </View>
  );
};

export default Authorization;