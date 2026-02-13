import messaging from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid, Alert, Linking } from 'react-native';

export async function requestNotificationPermission() {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    return granted === PermissionsAndroid.RESULTS.GRANTED;
  }

  // iOS permission request
  const authStatus = await messaging().requestPermission();
  console.log('📱 iOS Notification Permission Status:', authStatus);

  const isAuthorized =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  // If denied, prompt user to enable from Settings
  if (!isAuthorized) {
    Alert.alert(
      'Notifications Disabled',
      'Please enable notifications in Settings to receive updates.',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Open Settings', onPress: () => Linking.openSettings() },
      ],
    );
  }

  return isAuthorized;
}

export async function getFCMToken() {
  try {
    // Check if APNs token is available (required on iOS)
    if (Platform.OS === 'ios') {
      const apnsToken = await messaging().getAPNSToken();
      console.log('📱 APNs Token:', apnsToken);
      if (!apnsToken) {
        console.log('❌ APNs token is null - push notifications will NOT work!');
        console.log('❌ Possible causes:');
        console.log('   1. Running on Simulator (APNs not supported)');
        console.log('   2. Push Notification capability not enabled in Xcode');
        console.log('   3. Provisioning profile missing push entitlement');
      }
    }

    const token = await messaging().getToken();
    console.log('✅ FCM Token:', token);
    return token;
  } catch (error) {
    console.log('❌ Error getting FCM token:', error);
    return null;
  }
}

export function onTokenRefresh(callback) {
  return messaging().onTokenRefresh(callback);
}

// Foreground message listener
export function onForegroundMessage(callback) {
  return messaging().onMessage(callback);
}

// When user taps notification and app opens from background
export function onNotificationOpenedApp(callback) {
  return messaging().onNotificationOpenedApp(callback);
}

// Check if app was opened from a quit state via notification
export async function getInitialNotification() {
  return messaging().getInitialNotification();
}
