import React, { useEffect } from 'react';
import {
  View,
  ScrollView,
  StatusBar,
  StyleSheet,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import WelcomeHeader from './components/WelcomeHeader';
import SendCardSection from './components/SendCardSection';
import RewardSection from './components/RewardSection';
import { hp } from '../../utils/responsive';
import GradientScreen from '../common/GradientScreen';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCardSendRemaining } from '../../fetures/CardSendRemainingSlice';

const HomeScreen = ({ navigation, userName = 'Annie' }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCardSendRemaining());
  }, [dispatch]);

  const { loading } = useSelector(state => state.cardRemaning);

  if (loading) {
    return (
      <SafeAreaView style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="yellow" />
      </SafeAreaView>
    );
  }

  const cardsSent = 1;
  const totalCardsNeeded = 5;
  const progressPercentage = Math.round((cardsSent / totalCardsNeeded) * 100);
  const cardsRemaining = totalCardsNeeded - cardsSent;

  return (
    <SafeAreaView
      style={{ flex: 1, backgroundColor: '#6955A5' }}
      edges={['top']}
    >
      <StatusBar barStyle="light-content" backgroundColor="#6B5B95" />

      <View style={styles.mainContent}>
        <WelcomeHeader
          userName={userName}
          onProfilePress={() => navigation.navigate('ProfileNavigator')}
        />

        <SendCardSection
          onStartWriting={() => navigation.navigate('GiftCard')}
        />

        <View style={styles.fixedBottom}>
          <RewardSection
            onPress={() => navigation.navigate('RewardsHome')}
            cardsRemaining={cardsRemaining}
            progressPercentage={progressPercentage}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mainContent: {
    flex: 1,
  },
  fixedBottom: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default HomeScreen;
