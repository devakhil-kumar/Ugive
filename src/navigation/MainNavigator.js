import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, Platform } from 'react-native';
import FriendsSearch from '../screens/main/Friends/FriendsSearch';
import FriendsList from '../screens/main/Friends/FriendsList';
import FriendsRequest from '../screens/main/Friends/FriendsRequest';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import HomeNavigator from '../navigation/HomeNavigator';
import FriendsNavigator from '../navigation/FriendsNavigator';
import { getFocusedRouteNameFromRoute } from '@react-navigation/native';
import Home from '../screens/main/RewardsHome/Home';
import HomeScreen from '../screens/HomeScreen/HomeScreen';

const Tab = createBottomTabNavigator();

const MainNavigator = () => {
  const insets = useSafeAreaInsets();
  const bottomInset = Platform.OS === 'android' ? insets.bottom : 10;


  const defaultTabBarStyle = {
    height: 65 + bottomInset,
    paddingBottom: bottomInset,
    backgroundColor: '#C6D4ED',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    alignItems: 'center',
    paddingTop: 16
  };

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        keyboardHidesTabBar: true,
        tabBarStyle:defaultTabBarStyle,
        tabBarShowLabel: false
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNavigator}
        options={({ route }) => ({
          tabBarIcon: () => (
            <Image
              source={require('../assets/home.png')}
              style={{ width: 38, height: 38, resizeMode: 'contain' }}
            />
          ),
          tabBarStyle: (() => {
            const routeName = getFocusedRouteNameFromRoute(route) ?? 'HomeScreen';
            if (routeName === 'GiftCard' || routeName === 'SendingCard' || routeName === 'RewardStutas' || routeName === 'ProfileNavigator') {
              return { display: 'none' };
            }
            return defaultTabBarStyle;
          })(),
        })}
      />
      <Tab.Screen
        name="RewardsHome"
        component={Home}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/chat.png')}
              style={{ width: 38, height: 38, resizeMode: 'contain' }}
            />
          ),

        }}
      />

      <Tab.Screen
        name="FriendNavigator"
        component={FriendsNavigator}
        options={{
          tabBarIcon: () => (
            <Image
              source={require('../assets/group.png')}
              style={{ width: 38, height: 38, resizeMode: 'contain' }}
            />
          ),

        }}
      />

      <Tab.Screen
        name="FriendsSearchat"
        component={FriendsSearch}
        options={() => {
          return {
            tabBarIcon: () => (
              <Image
                source={require('../assets/search.png')}
                style={{ width: 38, height: 38, resizeMode: 'contain' }}
              />
            ),

          };
        }}
      />
      {/* <Tab.Screen
        name="Request"
        component={FriendsRequest}
        options={() => {
          return {
            tabBarIcon: () => (
              <Image
                source={require('../assets/calender.png')}
                style={{ width: 38, height: 38, resizeMode: 'contain' }}
              />
            ),

          };
        }}
      /> */}
    </Tab.Navigator>
  );
};

export default MainNavigator;
