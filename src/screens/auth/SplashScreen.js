import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  StatusBar,
} from 'react-native';

const SplashScreen = ({ navigation }) => {

  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.replace('Login'); 
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#6955A5" barStyle="light-content" />
      <Image
        source={require('../../assets/ugive_logo.png')} 
        style={styles.logo}
        resizeMode="contain"
      />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#6955A5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    logo: {
      width: 160,
      height: 160,
      marginBottom: 20,
    },
    appName: {
      fontSize: 28,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    tagline: {
      fontSize: 14,
      color: '#EAF5F0',
      marginTop: 6,
    },
  });
  
