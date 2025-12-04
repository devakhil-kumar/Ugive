import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image } from 'react-native';
import HomeNavigator from './HomeNavigator';
import ProfileNavigator from './ProfileNavigator';
import FriendsNavigator from './FriendsNavigator';
import GiftCardNavigator from './GiftCardNavigator';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopWidth: 0,
          elevation: 8,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarActiveTintColor: '#E9B243',
        tabBarInactiveTintColor: '#BDBDBD',
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeNavigator}
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/home.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="GiftTab"
        component={GiftCardNavigator}
        options={{
          title: 'Send Card',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/sendMesg.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="FriendsTab"
        component={FriendsNavigator}
        options={{
          title: 'Friends',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/group.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ProfileTab"
        component={ProfileNavigator}
        options={{
          title: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <Image
              source={require('../assets/person.png')}
              style={{ width: size, height: size, tintColor: color }}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default MainNavigator;
