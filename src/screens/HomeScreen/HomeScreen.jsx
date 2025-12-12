import React, { useEffect } from 'react';
import { View, ScrollView, StatusBar, StyleSheet, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeHeader from './components/WelcomeHeader';
import SendCardSection from './components/SendCardSection';
import RewardSection from './components/RewardSection';
import { hp } from '../../utils/responsive';
import GradientScreen from '../common/GradientScreen';
import { useDispatch } from 'react-redux';
import { fetchCardSendRemaining } from '../../fetures/CardSendRemainingSlice';

const HomeScreen = ({ navigation, userName = 'Annie' }) => {

  const cardsSent = 1; 
  const totalCardsNeeded = 5;
  const progressPercentage = Math.round((cardsSent / totalCardsNeeded) * 100);
  const cardsRemaining = totalCardsNeeded - cardsSent;
  const handleStartWriting = () => {
    navigation.navigate('GiftCard')
  };

  const handleRewardAction = () => {
    navigation.navigate('RewardStutas')
  };

  const handleProfilePress = () => {
    navigation.navigate('ProfileNavigator')
  };

  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(fetchCardSendRemaining());
  }, [dispatch]);


  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#6955A5'}} edges={['top']}>
      <StatusBar barStyle="light-content" backgroundColor="#6B5B95" />
      <View style={styles.mainContent}>
          <WelcomeHeader
            userName={userName}
            onProfilePress={handleProfilePress}
          />

          <SendCardSection onStartWriting={handleStartWriting} />

        <View style={styles.fixedBottom}>
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



