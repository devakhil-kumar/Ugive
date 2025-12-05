import { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthNavigator from './AuthNavigator';
import MainNavigator from './MainNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { loadInitialState } from '../fetures/authSlice';
import { ActivityIndicator, StyleSheet, View } from 'react-native';

const RootNavigator = () => {
  const dispatch = useDispatch();
  const { token, mainloading, userRole, user } = useSelector((state) => state.auth);
  console.log(token, userRole, user, 'token +++++++++++++++++')

  useEffect(() => {
    dispatch(loadInitialState());
  }, [dispatch]);

  if (mainloading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color='yellow' />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {token ? <MainNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default RootNavigator;


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});
