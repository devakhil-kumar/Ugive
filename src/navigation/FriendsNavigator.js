import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FriendsList from '../screens/main/Friends/FriendsList';
import FriendsSearch from '../screens/main/Friends/FriendsSearch';
import FriendsRequest from '../screens/main/Friends/FriendsRequest';

const Stack = createNativeStackNavigator();

const FriendsNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="FriendsList" component={FriendsList} />
      <Stack.Screen name="FriendsSearch" component={FriendsSearch} />
      <Stack.Screen name="FriendsRequest" component={FriendsRequest} />
    </Stack.Navigator>
  );
};

export default FriendsNavigator;
