import React, { PureComponent, Fragment } from 'react';
import { View, StyleSheet } from 'react-native';
import DrawerLink from './DrawerLink';
import LinearGradient from 'react-native-linear-gradient';

import { colors } from '../../styles';

import { connect } from 'react-redux';
import { logout } from '../../actions/auth';

const LINKS = [
  { name: 'dashboard', label: 'Dashboard', icon: 'home-outline' },
  { name: 'settings', label: 'Settings', icon: 'cog-outline' },
  { name: 'payment', label: 'Payment', icon: 'credit-card' },
  { name: 'customerSupport', label: 'Customer Support', icon: 'help-circled' },
  { name: 'termsAndConditions', label: 'Terms & conditions', icon: 'info-circled' }
];
class Drawer extends PureComponent {
  renderLink = (item, i) => {
    let { activeItemKey, navigation: { navigate } } = this.props;
    const onPress = () => navigate(item.name);
    const linkProps = {
      ...item,
      isActive: activeItemKey === item.name,
      onPress
    };
    return i === 0 ?
      <DrawerLink {...linkProps} key={i}/> :
      <Fragment key={i}>
        <View style={styles.navLine}/>
        <DrawerLink {...linkProps}/>
      </Fragment>;
  }
  render() {
    let { logout } = this.props;
    return (
      <LinearGradient style={styles.holder} {...colors.dPrimaryGradient}>
        <View>
          {LINKS.map(this.renderLink)}
        </View>
        <View>
          <DrawerLink label='Logout' icon='logout' onPress={logout}/>
        </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  holder: {
    justifyContent: 'space-between',
    paddingVertical: 40,
    paddingHorizontal: 16,
    flex: 1,
    backgroundColor: colors.primaryLight
  },
  navLine: {
    height: 1,
    width: '90%',
    backgroundColor: colors.primary,
    opacity: 0.3,

  }
});

export default connect(null, {
  logout
})(Drawer);