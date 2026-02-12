import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Profile from '../screens/main/Profile/Profile';
import EditProfile from '../screens/main/Profile/EditProfile';
import ProfileDetails from '../screens/main/Profile/ProfileDetails';
import ReadCard from '../screens/main/Cards/ReadCard';
import Home from '../screens/main/RewardsHome/Home';

const Stack = createNativeStackNavigator();

const ProfileNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName='Profile'
    >
      <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="EditProfile" component={EditProfile} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} />
      <Stack.Screen name="ReadCard" component={ReadCard} />
      <Stack.Screen name="RewardsHome" component={Home} />
    </Stack.Navigator>
  );
};

export default ProfileNavigator;
