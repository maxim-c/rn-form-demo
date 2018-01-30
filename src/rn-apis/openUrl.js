import { Linking } from 'react-native';
import { CustomTabs, ANIMATIONS_SLIDE } from 'react-native-custom-tabs';

import { colors } from '../styles';

const config = {
  toolbarColor: colors.primary,
  enableUrlBarHiding: true,
  showPageTitle: true,
  enableDefaultShare: true,
  // animations: {
  //   startEnter: 'com.github.droibit.android.reactnative.customtabs.example:anim/slide_in_bottom',
  //   startExit: 'com.github.droibit.android.reactnative.customtabs.example:anim/slide_out_bottom',
  //   endEnter: 'com.github.droibit.android.reactnative.customtabs.example:anim/slide_in_bottom',
  //   endExit: 'com.github.droibit.android.reactnative.customtabs.example:anim/slide_out_bottom',
  // },
  // headers: {
  //   'my-custom-header': 'my custom header value'
  // }
};

const openUrl = url => Linking.canOpenURL(url).then(supported => {
  if (!supported) {
    console.warn('Can\'t handle url: ' + url);
  } else {
    CustomTabs.openURL(url, config)
      .catch(err => console.warn('openURL error', err));
  }
}).catch(err => console.warn('An unexpected error happened', err));

export default openUrl;