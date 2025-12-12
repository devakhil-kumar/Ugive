/**
 * UGive - Gift Card App
 * @format
 */

import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/fetures/store'
import { Provider, useDispatch, useSelector } from 'react-redux';
import CustomMessage from './src/screens/common/CustomMessage'
import { hideMessage } from './src/fetures/messageSlice';


const GlobalMessageWrapper = () => {
  const { visible, text, type } = useSelector(state => state.message);
  const dispatch = useDispatch();

  return (
    <>
      <RootNavigator />
      <CustomMessage
        visible={visible}
        text={text}
        type={type}
        onHide={() => dispatch(hideMessage())}
      />
    </>
  );
};



function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <GlobalMessageWrapper />
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
