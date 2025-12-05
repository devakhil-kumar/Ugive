/**
 * UGive - Gift Card App
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/fetures/store'
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <RootNavigator />
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
