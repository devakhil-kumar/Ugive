import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import GiftCard from '../screens/main/GiftCard/GiftCard';
import SendingCard from '../screens/main/Cards/SendingCard';
import RewardStutas from '../screens/main/Cards/RewardStatus';
import ProfileNavigator from '../navigation/ProfileNavigator';
import Home from '../screens/main/RewardsHome/Home';

const Stack = createNativeStackNavigator();

const HomeNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='HomeScreen'
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="GiftCard" component={GiftCard} />
      <Stack.Screen name="SendingCard" component={SendingCard} />
      <Stack.Screen name="RewardStutas" component={RewardStutas} />
      <Stack.Screen name="ProfileNavigator" component={ProfileNavigator} />
      <Stack.Screen name="RewardsHome" component={Home} />

    </Stack.Navigator>
  );
};

export default HomeNavigator;
