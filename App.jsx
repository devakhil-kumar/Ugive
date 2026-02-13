/**
 * UGive - Gift Card App
 * @format
 */

import React, { useEffect } from 'react';
import { StatusBar, Alert, Platform } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';
import store from './src/fetures/store'
import { Provider, useDispatch, useSelector } from 'react-redux';
import CustomMessage from './src/screens/common/CustomMessage'
import { hideMessage } from './src/fetures/messageSlice';
import {
  requestNotificationPermission,
  getFCMToken,
  onForegroundMessage,
  onNotificationOpenedApp,
  getInitialNotification,
  onTokenRefresh,
} from './src/utils/notificationService';
import { registerFCMToken } from './src/apis/api';


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

const NotificationHandler = () => {
  const { token: authToken } = useSelector(state => state.auth);

  useEffect(() => {
    initNotifications();
  }, []);

  // Register FCM token with backend when user is logged in
  useEffect(() => {
    if (authToken) {
      registerDeviceToken();
    }
  }, [authToken]);

  const registerDeviceToken = async () => {
    try {
      const hasPermission = await requestNotificationPermission();
      if (hasPermission) {
        const fcmToken = await getFCMToken();
        if (fcmToken) {
          const platform = Platform.OS; // 'ios' or 'android'
          const response = await registerFCMToken(fcmToken, platform);
          console.log('✅ FCM token registered with backend:', response.data);
        }
      }
    } catch (error) {
      console.log('❌ Failed to register FCM token:', error?.response?.data || error.message);
    }
  };

  const initNotifications = async () => {
    const hasPermission = await requestNotificationPermission();

    if (hasPermission) {
      await getFCMToken();
    }

    // Listen for token refresh - re-register with backend
    const unsubscribeTokenRefresh = onTokenRefresh(async newToken => {
      console.log('FCM Token refreshed:', newToken);
      if (authToken) {
        try {
          await registerFCMToken(newToken, Platform.OS);
          console.log('✅ Refreshed token registered with backend');
        } catch (error) {
          console.log('❌ Failed to register refreshed token:', error.message);
        }
      }
    });

    // Foreground message handler
    const unsubscribeForeground = onForegroundMessage(remoteMessage => {
      console.log('Foreground message:', remoteMessage);
      Alert.alert(
        remoteMessage.notification?.title || 'Notification',
        remoteMessage.notification?.body || '',
      );
    });

    // When app is opened from background via notification tap
    onNotificationOpenedApp(remoteMessage => {
      console.log('Notification opened app from background:', remoteMessage);
    });

    // Check if app was opened from quit state via notification tap
    const initialNotification = await getInitialNotification();
    if (initialNotification) {
      console.log('App opened from quit state via notification:', initialNotification);
    }

    return () => {
      unsubscribeTokenRefresh();
      unsubscribeForeground();
    };
  };

  return null;
};

function App() {
  return (
    <Provider store={store}>
    <SafeAreaProvider>
      <StatusBar barStyle="dark-content" />
      <NotificationHandler />
      <GlobalMessageWrapper />
    </SafeAreaProvider>
    </Provider>
  );
}

export default App;
