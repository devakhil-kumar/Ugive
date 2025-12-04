import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import GiftCard from '../screens/main/GiftCard/GiftCard';
import SendingCard from '../screens/main/Cards/SendingCard';
import ReadCard from '../screens/main/Cards/ReadCard';
import RewardStatus from '../screens/main/Cards/RewardStatus';

const Stack = createNativeStackNavigator();

const GiftCardNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="GiftCard" component={GiftCard} />
      <Stack.Screen name="SendingCard" component={SendingCard} />
      <Stack.Screen name="ReadCard" component={ReadCard} />
      <Stack.Screen name="RewardStatus" component={RewardStatus} />
    </Stack.Navigator>
  );
};

export default GiftCardNavigator;
