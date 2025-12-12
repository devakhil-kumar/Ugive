import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { PieChart } from 'react-native-gifted-charts';
import Icon from 'react-native-vector-icons/Ionicons';
import { useDispatch, useSelector } from 'react-redux';
import { fetchRewardsCollages } from '../../../fetures/getRewardsSlice'; // adjust path
import GradientScreen from '../../common/GradientScreen';
import CustomModal from '../../common/CustomModal';
import { fetchClaimRewards } from '../../../fetures/claimRewardsSlice';
import { showMessage } from '../../../fetures/messageSlice';

const { width, height } = Dimensions.get('window');

const Home = () => {
  const dispatch = useDispatch();
  const { list: rewards, loading, stats } = useSelector((state) => state.rewards);
  const [open, setOpen] = useState(false);
  const [selectedReward, setSelectedReward] = useState(null);
  console.log(selectedReward, 'selected_______-')

  useEffect(() => {
    dispatch(fetchRewardsCollages());
  }, [dispatch]);

  const handleConfirmClaim = async () => {
    try {
      if (!selectedReward?.rewardId) return;
      const response = await dispatch(fetchClaimRewards(selectedReward.rewardId));
      if (fetchClaimRewards.fulfilled.match(response)) {
        dispatch(
          showMessage({
            type: 'success',
            text: 'Reward claimed successfully!',
          })
        );
      } else {
        dispatch(
          showMessage({
            type: 'error',
            text: response?.payload || 'Failed to claim reward.',
          })
        );
      }
    } catch (error) {
      console.log('Claim error:', error);
      dispatch(
        showMessage({
          type: 'error',
          text: 'Something went wrong. Please try again.',
        })
      );
    } finally {
      setOpen(false);
      setSelectedReward(null);
    }
  };
  

  const handleClaimPress = (item) => {
    if (item?.completedPoints === item?.totalPoints) {
      setSelectedReward(item);
      setOpen(true);
    } else {
      console.log('Reward not completed yet!');
    }
  };

  const statss = [
    {
      icon: 'flame',
      value: stats?.currentStreak ?? 0,
      color: '#FF6B6B'
    },
    {
      icon: 'card',
      value: stats?.totalCardsSent ?? 0,
      color: '#8B7BF7'
    },
    {
      icon: 'people',
      value: stats?.totalFriends ?? 0,
      color: '#54A0FF'
    },
    {
      icon: 'gift',
      value: stats?.totalGiftsSent ?? 0,
      color: '#FF9F43'
    },
  ];

  const renderPieChart = (percentage, color) => {
    const pieData = [
      { value: percentage, color },
      { value: 100 - percentage, color: '#E8E8E8' },
    ];
    return (
      <PieChart
        data={pieData}
        donut
        radius={70}
        innerRadius={65}
        innerCircleColor="#F5F5F5"
        showText={false}
      />
    );
  };

  const renderRewardItem = (item) => {
    const isCompleted = item?.completedPoints === item?.totalPoints;

    return (
      <View key={item.rewardId} style={styles.rewardItem}>
        <View style={styles.pieChartContainer}>
          {renderPieChart(item.percentage, '#FFB800')}
          <TouchableOpacity style={styles.iconContainer} onPress={() => handleClaimPress(item)} disabled={!isCompleted} >
          { item?.claimed ?
            <View style={{width:'90%', backgroundColor:"gray",alignItems:'center', paddingVertical:10, borderRadius:10}}>
            <Text style={{color:'#fff'}} >Clamied</Text> 
            </View>:  <Image
              source={{ uri: item.rewardImage }}
              style={{ width: width / 5, height: height / 10, backgroundColor: '#f0f0f0',borderRadius:20 }}
            />}
          </TouchableOpacity>
          <View style={styles.starContainer}>
            <View style={styles.starBadge}>
              <Text style={styles.starNumber}>{item.totalPoints}</Text>
            <Image
                source={require('../../../assets/star.png')}
                style={styles.starImage}
                resizeMode="contain"
              />
            </View>
          </View>
        </View>
        <Text style={styles.label}>{item.rewardName}</Text>
        <Text style={styles.desc}>{item.rewardDescription}</Text>
      </View>
    )
  };

  if (loading) {
    return (
      <GradientScreen colors={['#fff']}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#FFB800" />
        </View>
      </GradientScreen>
    );
  }

  return (
    <GradientScreen colors={['#fff']}>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          {statss.map((stat, index) => (
            <View key={index} style={styles.statItem}>
              <Icon name={stat.icon} size={24} color={stat.color} />
              <Text style={styles.statValue}>{stat.value}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.title}>Rewards</Text>

        <View style={styles.rewardsContainer}>
          {rewards.length > 0 && (
            <>
              <View style={styles.topReward}>
                {renderRewardItem(rewards[0])}
              </View>
              <View style={styles.bottomRow}>
                {rewards.slice(1, 3).map((item) => renderRewardItem(item))}
              </View>
            </>
          )}
        </View>
        <CustomModal
          visible={open}
          confirmModal={true}
          showClose={true}
          onClose={handleConfirmClaim}
          handleClose={() => {
            setOpen(false);
            setSelectedReward(null);
          }}
          title='Are you sure you want to Claim your Reward?'
          buttonLabelCancel="No, Cancel"
          buttonLabel="Yes, Claim"
        />
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F5F5F5', paddingTop: 20 },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 15,
    borderRadius: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  statItem: { flexDirection: 'row', alignItems: 'center', gap: 10 },
  statValue: { fontSize: 16, fontWeight: '600', color: '#333' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFB800', marginLeft: 20, marginVertical: 20 },
  rewardsContainer: { flex: 1, paddingHorizontal: 20 },
  topReward: { alignItems: 'center', marginBottom: 30 },
  bottomRow: { flexDirection: 'row', justifyContent: 'space-around' },
  rewardItem: { alignItems: 'center' },
  pieChartContainer: {
    position: 'relative',
    width: 140,
    height: 140,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconContainer: { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center' },
  starContainer: { position: 'absolute', bottom: -20, left: -20 },
  starBadge: { alignItems: 'center', justifyContent: 'center' },
  starNumber: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    position: 'absolute',
    zIndex: 2,
    top: 30,
  },
  starImage: { width: width / 4, height: height / 12 },
  label: { fontSize: 18, fontWeight: '700', color: '#8B7BF7', marginTop: 15 },
  desc: { fontSize: 12, color: '#666', marginTop: 4 },
});

export default Home;