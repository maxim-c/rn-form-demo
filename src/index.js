import React, { PureComponent } from 'react';
import { View, StatusBar } from 'react-native';
import { KeyboardAvoidView } from './components';
import { PopUp } from './pop-ups';
import { Authorization, Main } from './navigators';
import { Provider, connect } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';
import { store, persistor } from './store';

import { colors } from './styles';

StatusBar.setBackgroundColor(colors.primaryDark, true);
StatusBar.setBarStyle('light-content', true);

class NavSwitch extends PureComponent {
  render() {
    let { isLogged, isLoading } = this.props;
    if (isLoading) return null;
    return isLogged ? <Main /> : <Authorization />;
  }
}

const Application = connect(state => ({
  isLogged: state.auth.isLogged
}))(NavSwitch);

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate
        loading={<View />}
        persistor={persistor}
      >
        <Application />
        <KeyboardAvoidView />
        <PopUp />
      </PersistGate>
    </Provider>
  );
};

export default App;