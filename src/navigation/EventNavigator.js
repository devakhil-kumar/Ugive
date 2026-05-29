import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import EventList from '../screens/main/EventScreens/Eventlist';
import EventDetailScreen from '../screens/main/EventScreens/components/EventDetailReducer';

const Stack = createNativeStackNavigator();

const EventNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Events"
    >
      <Stack.Screen name="Events" component={EventList} />
      <Stack.Screen name="EventDetail" component={EventDetailScreen} />
    </Stack.Navigator>
  );
};

export default EventNavigator;
