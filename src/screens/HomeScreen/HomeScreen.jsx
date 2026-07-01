// import React, { useEffect } from 'react';
// import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import WelcomeHeader from './components/WelcomeHeader';
// import SendCardSection from './components/SendCardSection';
// import RewardSection from './components/RewardSection';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCardSendRemaining } from '../../fetures/CardSendRemainingSlice';

// const HomeScreen = ({ navigation, userName = 'Annie' }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCardSendRemaining());
//   }, [dispatch]);

//   const { loading } = useSelector(state => state.cardRemaning);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="yellow" />
//       </SafeAreaView>
//     );
//   }

//   const cardsSent = 1;
//   const totalCardsNeeded = 5;
//   const progressPercentage = Math.round((cardsSent / totalCardsNeeded) * 100);
//   const cardsRemaining = totalCardsNeeded - cardsSent;

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: '#6955A5' }}
//       edges={['top']}
//     >
//       <StatusBar barStyle="light-content" backgroundColor="#6B5B95" />

//       <View style={styles.mainContent}>
//         <WelcomeHeader
//           userName={userName}
//           onProfilePress={() => navigation.navigate('ProfileNavigator')}
//         />

//         <SendCardSection
//           onStartWriting={() => navigation.navigate('GiftCard')}
//         />

//         <View style={styles.fixedBottom}>
//           <RewardSection
//             onPress={() => navigation.navigate('RewardsHome')}
//             cardsRemaining={cardsRemaining}
//             progressPercentage={progressPercentage}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mainContent: {
//     flex: 1,
//   },
//   fixedBottom: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

// export default HomeScreen;

// import React, { useEffect } from 'react';
// import { View, StatusBar, StyleSheet, ActivityIndicator } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import WelcomeHeader from './components/WelcomeHeader';
// import SendCardSection from './components/SendCardSection';
// import RewardSection from './components/RewardSection';
// import { useDispatch, useSelector } from 'react-redux';
// import { fetchCardSendRemaining } from '../../fetures/CardSendRemainingSlice';

// const HomeScreen = ({ navigation, userName = 'Annie' }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     dispatch(fetchCardSendRemaining());
//   }, [dispatch]);

//   const { loading } = useSelector(state => state.cardRemaning);

//   if (loading) {
//     return (
//       <SafeAreaView style={styles.loaderContainer}>
//         <ActivityIndicator size="large" color="yellow" />
//       </SafeAreaView>
//     );
//   }

//   const cardsSent = 1;
//   const totalCardsNeeded = 5;
//   const progressPercentage = Math.round((cardsSent / totalCardsNeeded) * 100);
//   const cardsRemaining = totalCardsNeeded - cardsSent;

//   return (
//     <SafeAreaView
//       style={{ flex: 1, backgroundColor: '#6955A5' }}
//       edges={['top']}
//     >
//       <StatusBar barStyle="light-content" backgroundColor="#6B5B95" />

//       <View style={styles.mainContent}>
//         <WelcomeHeader
//           userName={userName}
//           onProfilePress={() => navigation.navigate('ProfileNavigator')}
//         />

//         <SendCardSection
//           onStartWriting={() => navigation.navigate('GiftCard')}
//         />

//         <View style={styles.fixedBottom}>
//           <RewardSection
//             onPress={() => navigation.navigate('RewardsHome')}
//             cardsRemaining={cardsRemaining}
//             progressPercentage={progressPercentage}
//           />
//         </View>
//       </View>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   loaderContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   mainContent: {
//     flex: 1,
//   },
//   fixedBottom: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//   },
// });

// export default HomeScreen;

import React, { useEffect } from 'react';
import {
  ScrollView,
  StatusBar,
  StyleSheet,
  ActivityIndicator,
  Platform,
  Share,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';
import WelcomeHeader from './components/WelcomeHeader';
import SendCardSection from './components/SendCardSection';
import RewardSection from './components/RewardSection';
import UpcomingCampus from './components/Upcomingcampus';
import RecentActivity from './components/Recentactivity';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardSendRemaining } from '../../fetures/CardSendRemainingSlice';
import { fetchStudentProfile } from '../../fetures/studentSlice'; // 👈 adjust path if different

const APP_LINKS = {
  android:
    'https://play.google.com/store/apps/details?id=com.ugivenew.com&hl=en_IN',
  ios: 'https://apps.apple.com/us/app/ugive/id6758373145',
};

const HomeScreen = ({ navigation, userName = 'Annie' }) => {
  const dispatch = useDispatch();

  // Fetch card remaining once on mount
  useEffect(() => {
    dispatch(fetchCardSendRemaining());
  }, [dispatch]);

  // Re-fetch student profile every time this screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchStudentProfile());
    }, [dispatch]),
  );

  // Card remaining loading state
  const { loading } = useSelector(state => state.cardRemaning);

  // Student data — passed down to all children
  const { user, screenData } = useSelector(state => state.student);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#473C8C" />
      </SafeAreaView>
    );
  }

  const handleShareApp = async () => {
    const link = Platform.OS === 'ios' ? APP_LINKS.ios : APP_LINKS.android;
    try {
      await Share.share({
        title: 'UGive App',
        message: `Check out UGive - send messages of encouragement to friends! Download here: ${link}`,
        url: link,
      });
    } catch (e) {
      console.log('Share error:', e);
    }
  };

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#473C8C' }}
      edges={['top']}
    >
      <StatusBar barStyle="light-content" backgroundColor="#473C8C" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <WelcomeHeader
          userName={user?.name || userName}
          profileImage={user?.profileImage}
          onProfilePress={() => navigation.navigate('ProfileNavigator')}
          onStartWriting={() => navigation.navigate('GiftCard')}
          user={user}
          screenData={screenData}
        />

        <RewardSection user={user} screenData={screenData} />

        <SendCardSection
          onSeeLeaderboard={() => navigation.navigate('Leaderboard')}
          user={user}
          screenData={screenData}
        />

        <UpcomingCampus
          screenData={screenData}
          onJoinEvent={event => navigation.navigate('Events', { event })}
        />

        <RecentActivity
          onSeeAll={() => {}}
          user={user}
          screenData={screenData}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContent: {
    backgroundColor: '#F7F6FB',
    paddingBottom: 24,
  },
});

export default HomeScreen;
