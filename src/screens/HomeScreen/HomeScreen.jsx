import React from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeHeader from './components/WelcomeHeader';
import SendCardSection from './components/SendCardSection';
import RewardSection from './components/RewardSection';
import { hp } from '../../utils/responsive';

const HomeScreen = ({ navigation, userName = 'Annie' }) => {

    //   // Example: Calculate progress based on cards sent
  const cardsSent = 1; // This would come from your app state
  const totalCardsNeeded = 5;
  const progressPercentage = Math.round((cardsSent / totalCardsNeeded) * 100);
  const cardsRemaining = totalCardsNeeded - cardsSent;
  const handleStartWriting = () => {
    console.log('Navigate to write card screen');
  };

  const handleRewardAction = () => {
    console.log('Navigate to rewards screen');
  };

  const handleProfilePress = () => {
    console.log('Navigate to profile screen');
  };

  const safeAreaEdges = Platform.OS === 'android' ? ['top', 'bottom'] : ['top'];

  return (
    <SafeAreaView style={styles.container} edges={safeAreaEdges}>
      <StatusBar barStyle="light-content" backgroundColor="#6B5B95" />
      <View style={styles.mainContent}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <WelcomeHeader
            userName={userName}
            onProfilePress={handleProfilePress}
          />

          <SendCardSection onStartWriting={handleStartWriting} />
        </ScrollView>

        <View style={styles.fixedBottom}>
          {/* <RewardSection onPress={handleRewardAction} /> */}
    <RewardSection 
          onPress={handleRewardAction} 
          cardsRemaining={cardsRemaining}
          progressPercentage={progressPercentage}
         />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6B5B95',
  },
  mainContent: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: hp(2),
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;


// import React from 'react';
// import { View, ScrollView, StatusBar, StyleSheet } from 'react-native';
// import { SafeAreaView } from 'react-native-safe-area-context';
// import WelcomeHeader from './components/WelcomeHeader';
// import SendCardSection from './components/SendCardSection';
// import RewardSection from './components/RewardSection';
// import { wp, hp } from '../../utils/responsive';

// const HomeScreen = ({ navigation, userName = 'Annie' }) => {
//   // Example: Calculate progress based on cards sent
//   const cardsSent = 1; // This would come from your app state
//   const totalCardsNeeded = 5;
//   const progressPercentage = Math.round((cardsSent / totalCardsNeeded) * 100);
//   const cardsRemaining = totalCardsNeeded - cardsSent;

//   const handleStartWriting = () => {
//     console.log('Navigate to write card screen');
//   };

//   const handleRewardAction = () => {
//     console.log('Navigate to rewards screen');
//   };

//   const handleProfilePress = () => {
//     console.log('Navigate to profile screen');
//   };

//   return (
//     <SafeAreaView style={styles.container} edges={['top', 'bottom']}>
//       <StatusBar barStyle="light-content" backgroundColor="#6B5B95" />
//       <ScrollView
//         contentContainerStyle={styles.scrollContent}
//         showsVerticalScrollIndicator={false}
//       >
//         <WelcomeHeader
//           userName={userName}
//           onProfilePress={handleProfilePress}
//         />
        
//         <SendCardSection onStartWriting={handleStartWriting} />
        
//         <RewardSection 
//           onPress={handleRewardAction} 
//           cardsRemaining={cardsRemaining}
//           progressPercentage={progressPercentage}
//         />
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6B5B95',
//   },
//   scrollContent: {
//     flexGrow: 1,
//     paddingBottom: hp(2),
//   },
// });

// export default HomeScreen;
