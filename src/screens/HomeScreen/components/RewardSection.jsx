// import React, { useEffect } from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import AppText from '../../../components/AppText';
// import AppTextInput from '../../../components/AppTextInput';
// import Svg, { Circle, G } from 'react-native-svg';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
// import { useDispatch, useSelector } from 'react-redux';
// import { PieChart } from 'react-native-gifted-charts';
// import { fetchCardSendRemaining } from '../../../fetures/CardSendRemainingSlice';

// const ProgressPieChart = ({ percentage = 20 }) => {
//   const pieData = [
//     {
//       value: percentage,
//       color: '#F3B11C',
//       focused: false,
//     },
//     {
//       value: 100 - percentage,
//       color: '#FFFFFF',
//       strokeColor: '#F3B11C',
//       strokeWidth: 2,
//     },
//   ];

//   return (
//     <View style={styles.containersen}>
//       <View style={styles.chartContainer}>
//         <PieChart
//           data={pieData}
//           donut
//           radius={60}
//           innerRadius={53}
//           // innerCircleColor="#6D5B98"
//           strokeColor="#EBB142"
//           strokeWidth={1}
//           showText={false}
//           showGradient={false}
//           innerCircleBorderWidth={2}
//           innerCircleBorderColor={'#EBB142'}
//         />
//         <View style={styles.centerTextContainer}>
//           <AppText style={styles.percentageText}>{percentage}%</AppText>
//         </View>
//       </View>
//     </View>
//   );
// };

// const RewardSection = ({ onPress }) => {
//   const circleSize = isTablet ? moderateScale(140) : moderateScale(120);
//   const { currentReward, loading, error, data } = useSelector(
//     state => state.cardRemaning,
//   );
//   const percentage = currentReward?.percentage || 0;
//   const remainingCards = currentReward
//     ? currentReward.totalPoints - currentReward.completedPoints
//     : 0;

//   console.log(currentReward, data, 'rewards++++++');

//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           {/* <AppText style={styles.title}>
//             You're close to unlocking a gift!
//           </AppText> */}

//           {/* <AppText style={styles.subtitle}>
//             Send <AppText style={styles.number}>{remainingCards} more</AppText>{' '}
//             <AppText style={styles.action}>cards</AppText> to{'\n'}
//             <AppText style={styles.receive}>unlock a  <AppText style={styles.item}>coffee</AppText> voucher {'\n'}for a friend.</AppText>
//           </AppText> */}

//           {data?.message === 'No rewards found' ? (
//             <AppText style={styles.subtitle}>
//               <AppText style={styles.receive}>
//                 No rewards available right now
//               </AppText>
//               {'\n'}
//               <AppText style={styles.number}>
//                 You can still send cards to your friends!
//               </AppText>
//             </AppText>
//           ) : remainingCards === 0 ? (
//             <AppText style={styles.subtitle}>
//               <AppText style={styles.receive}>
//                 Your reward has unlocked!
//               </AppText>
//               {'\n'}
//               <AppText style={styles.number}>
//                 Please visit the rewards section to claim your reward.
//               </AppText>
//             </AppText>
//           ) : (
//             <>
//               <AppText style={styles.title}>
//                 You're close to unlocking a gift!
//               </AppText>

//               <AppText style={styles.subtitle}>
//                 Send{' '}
//                 <AppText style={styles.number}>{remainingCards} more</AppText>{' '}
//                 <AppText style={styles.action}>cards</AppText> to{'\n'}
//                 <AppText style={styles.receive}>
//                   unlock a <AppText style={styles.item}>coffee</AppText> voucher{' '}
//                   {'\n'}
//                   for a friend.
//                 </AppText>
//               </AppText>
//             </>
//           )}
//           <TouchableOpacity
//             style={styles.button}
//             onPress={onPress}
//             activeOpacity={0.8}
//           >
//             <AppText style={styles.buttonText}>Let's go!</AppText>
//           </TouchableOpacity>
//         </View>
//         <ProgressPieChart percentage={percentage} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#F5F5F5',
//     borderTopStartRadius: moderateScale(24),
//     borderTopEndRadius: moderateScale(24),
//     padding: isTablet ? moderateScale(32) : moderateScale(28),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.1,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: wp(4),
//   },
//   title: {
//     fontSize: isTablet ? moderateScale(28) : moderateScale(22),
//     fontWeight: '700',
//     color: '#F3B11C',
//     lineHeight: isTablet ? moderateScale(38) : moderateScale(24),
//     marginBottom: hp(1.5),
//   },
//   subtitle: {
//     fontSize: isTablet ? moderateScale(17) : moderateScale(14),
//     fontWeight: '400',
//     lineHeight: isTablet ? moderateScale(28) : moderateScale(20),
//     marginBottom: hp(2.5),
//     color: '#333333',
//   },
//   number: {
//     fontWeight: '700',
//     color: '#F3B11C',
//   },
//   action: {
//     fontWeight: '600',
//     color: '#F3B11C',
//   },
//   receive: {
//     fontWeight: '400',
//     // color: '#B8D4E8',
//   },
//   item: {
//     fontWeight: '600',
//     color: '#F3B11C',
//   },
//   button: {
//     backgroundColor: '#F3B11C',
//     borderRadius: moderateScale(30),
//     paddingVertical: hp(1.8),
//     paddingHorizontal: wp(8),
//     alignSelf: 'flex-start',
//     shadowColor: '#F3B11C',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   buttonText: {
//     fontSize: moderateScale(16),
//     fontWeight: '600',
//     color: '#FFFFFF',
//   },
//   progressContainer: {
//     marginLeft: wp(2),
//     position: 'relative',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   percentageContainer: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   progressText: {
//     fontSize: isTablet ? moderateScale(48) : moderateScale(40),
//     fontWeight: '700',
//     color: '#E5B865',
//   },
//   centerTextContainer: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   containersen: {
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   chartContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//     padding: 2,
//   },
//   percentageText: {
//     fontSize: 30,
//     fontWeight: '800',
//     color: '#EBB142',
//   },
// });

// export default RewardSection;

// import React from 'react';
// import { View, StyleSheet } from 'react-native';
// import AppText from '../../../components/AppText';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
// import { useSelector } from 'react-redux';
// import { PieChart } from 'react-native-gifted-charts';

// const ProgressPieChart = ({ percentage = 0 }) => {
//   const pieData = [
//     { value: percentage, color: '#473C8C' },
//     { value: 100 - percentage, color: '#EFEAFB' },
//   ];

//   return (
//     <View style={styles.chartContainer}>
//       <PieChart
//         data={pieData}
//         donut
//         radius={moderateScale(35)}
//         innerRadius={moderateScale(30)}
//         strokeColor="#FFFFFF"
//         strokeWidth={1}
//         showText={false}
//         showGradient={false}
//       />
//       <View style={styles.centerTextContainer}>
//         <AppText style={styles.percentageText}>{percentage}%</AppText>
//       </View>
//     </View>
//   );
// };

// const StatRow = ({ icon, label, value, highlight }) => (
//   <View style={styles.statRow}>
//     <AppText style={styles.statIcon}>{icon}</AppText>
//     {highlight ? (
//       <AppText style={styles.statHighlightLabel}>{label}</AppText>
//     ) : (
//       <>
//         <AppText style={styles.statLabel}>{label}</AppText>
//         <AppText style={styles.statValue}>{value}</AppText>
//       </>
//     )}
//   </View>
// );

// const RewardSection = () => {
//   const { currentReward, data } = useSelector(state => state.cardRemaning);

//   const percentage = currentReward?.percentage || 0;
//   const remainingCards = currentReward
//     ? currentReward.totalPoints - currentReward.completedPoints
//     : 0;
//   const lettersSent = 18;
//   const studentsEncouraged = 18;
//   const coffeeVouchersGifted = 2;
//   const streakDays = 6;

//   const footerText =
//     data?.message === 'No rewards found'
//       ? 'Send cards to start earning rewards!'
//       : remainingCards === 0
//       ? 'Your reward has unlocked! Visit Rewards to claim it.'
//       : `${remainingCards} more letters until your next coffee voucher!`;

//   return (
//     <View style={styles.container}>
//       <View style={styles.titleRow}>
//         <AppText style={styles.titleIcon}>📊</AppText>
//         <AppText style={styles.title}>Your Impact</AppText>
//       </View>

//       <View style={styles.mainRow}>
//         {/* LEFT — stats list */}
//         <View style={styles.statsCol}>
//           <StatRow icon="✉️" label="Letters sent" value={lettersSent} />
//           <StatRow
//             icon="❤️"
//             label="Students encouraged"
//             value={studentsEncouraged}
//           />
//           <StatRow
//             icon="☕"
//             label="Coffee vouchers gifted"
//             value={coffeeVouchersGifted}
//           />
//           <StatRow icon="🔥" label={`${streakDays} day streak! 🔥`} highlight />
//         </View>

//         <View style={styles.divider} />
//         <View style={styles.progressCol}>
//           <View style={{ flexDirection: 'row', alignItems: 'center' }}>
//             <ProgressPieChart percentage={percentage} />
//             <View style={styles.cupBadge}>
//               <AppText style={{ fontSize: moderateScale(40) }}>☕</AppText>
//             </View>
//           </View>
//           <AppText style={styles.footerText}>{footerText}</AppText>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: moderateScale(20),
//     marginHorizontal: wp(3),
//     marginVertical: hp(2),
//     padding: isTablet ? moderateScale(24) : moderateScale(12),
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 4 },
//     shadowOpacity: 0.08,
//     shadowRadius: 12,
//     elevation: 6,
//   },
//   titleRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp(1.8),
//   },
//   titleIcon: {
//     fontSize: moderateScale(16),
//     marginRight: wp(2),
//   },
//   title: {
//     fontSize: isTablet ? moderateScale(19) : moderateScale(16),
//     fontWeight: '800',
//     color: '#222',
//   },
//   mainRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   statsCol: {
//     // flex: 1,
//     width: '55%',
//   },
//   statRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: hp(1.2),
//   },
//   statIcon: {
//     fontSize: moderateScale(10),
//     width: moderateScale(22),
//   },
//   statLabel: {
//     flex: 1,
//     fontSize: moderateScale(11),
//     lineHeight: moderateScale(22),
//     color: '#444',
//     fontWeight: '500',
//   },
//   statValue: {
//     fontSize: moderateScale(13),
//     color: '#222',
//     fontWeight: '800',
//   },
//   statHighlightLabel: {
//     fontSize: moderateScale(12),
//     color: '#473C8C',
//     fontWeight: '700',
//   },
//   divider: {
//     width: 1,
//     height: '90%',
//     backgroundColor: '#EEEEEE',
//     marginHorizontal: wp(3),
//   },
//   progressCol: {
//     // alignItems: 'center',
//     justifyContent: 'center',
//   },
//   chartContainer: {
//     justifyContent: 'center',
//     alignItems: 'center',
//     position: 'relative',
//   },
//   centerTextContainer: {
//     position: 'absolute',
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   percentageText: {
//     fontSize: moderateScale(17),
//     fontWeight: '800',
//     color: '#473C8C',
//   },
//   cupBadge: {
//     width: moderateScale(50),
//     height: moderateScale(50),
//     backgroundColor: '#FFFFFF',
//     alignItems: 'center',
//     justifyContent: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.15,
//     shadowRadius: 4,
//     elevation: 4,
//     marginLeft: hp(1),
//   },
//   footerText: {
//     marginTop: hp(1.6),
//     fontSize: moderateScale(11),
//     color: '#555',
//     fontWeight: '600',
//     width: '60%',
//   },
// });

// export default RewardSection;

import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import AppText from '../../../components/AppText';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
import { useSelector } from 'react-redux';
import { PieChart } from 'react-native-gifted-charts';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import FAIcon from '@react-native-vector-icons/fontawesome';

const ProgressPieChart = ({ percentage = 0 }) => {
  const pieData = [
    { value: percentage, color: '#473C8C' },
    { value: 100 - percentage, color: '#EFEAFB' },
  ];

  return (
    <View style={styles.chartContainer}>
      <PieChart
        data={pieData}
        donut
        radius={moderateScale(35)}
        innerRadius={moderateScale(30)}
        strokeColor="#FFFFFF"
        strokeWidth={1}
        showText={false}
        showGradient={false}
      />
      <View style={styles.centerTextContainer}>
        <AppText style={styles.percentageText}>{percentage}%</AppText>
      </View>
    </View>
  );
};

const StatRow = ({ icon, label, value, highlight }) => (
  <View style={styles.statRow}>
    <View style={styles.statIcon}>{icon}</View>
    {highlight ? (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <AppText style={styles.statHighlightLabel}>{label}</AppText>
        <FAIcon
          name="fire"
          size={moderateScale(14)}
          color="#F3701C"
          style={{ marginLeft: wp(2) }}
        />
      </View>
    ) : (
      <>
        <AppText style={styles.statLabel}>{label}</AppText>
        <AppText style={styles.statValue}>{value}</AppText>
      </>
    )}
  </View>
);

// screenData comes from HomeScreen via useSelector(state => state.student)
// cardRemaning is still read locally since HomeScreen doesn't pass it down
const RewardSection = ({ screenData }) => {
  const { currentReward, data } = useSelector(state => state.cardRemaning);
  console.log(currentReward, data, currentReward?.rewardImage, 'rewards++++++');

  const percentage = currentReward?.percentage || 0;
  const remainingCards = currentReward
    ? currentReward.totalPoints - currentReward.completedPoints
    : 0;
  const lettersSent = screenData?.stats?.totalCardsSent;
  const studentsEncouraged = screenData?.stats?.studentsEncouraged;
  const coffeeVouchersGifted = screenData?.stats?.totalGiftsSent;
  const streakDays = screenData?.stats?.currentStreak;

  const footerText =
    data?.message === 'No rewards found'
      ? 'Send cards to start earning rewards!'
      : remainingCards === 0
      ? 'Your reward has unlocked! Visit Rewards to claim it.'
      : `${remainingCards} more letters until your next coffee voucher!`;

  return (
    <View style={styles.container}>
      <View style={styles.titleRow}>
        <MaterialIcon
          name="bar-chart"
          size={moderateScale(20)}
          color="#473C8C"
          style={styles.titleIcon}
        />
        <AppText style={styles.title}>Your Impact</AppText>
      </View>

      <View style={styles.mainRow}>
        {/* LEFT — stats list */}
        <View style={styles.statsCol}>
          {/* <StatRow
            icon={
              <View style={styles.iconCircle}>
                <MaterialIcon
                  name="email"
                  size={moderateScale(12)}
                  color="#FFFFFF"
                />
              </View>
            }
            label="Letters sent"
            value={lettersSent}
          /> */}
          <StatRow
            icon={
              <View style={[styles.iconCircle, { backgroundColor: '#FCE4E4' }]}>
                <FAIcon name="heart" size={moderateScale(11)} color="#E57373" />
              </View>
            }
            label="Students encouraged"
            value={studentsEncouraged}
          />
          <StatRow
            icon={
              <View style={[styles.iconCircle, { backgroundColor: '#FBE6D4' }]}>
                <FAIcon
                  name="coffee"
                  size={moderateScale(11)}
                  color="#B5651D"
                />
              </View>
            }
            label="Coffee vouchers gifted"
            value={coffeeVouchersGifted}
          />
          <StatRow
            icon={
              <FAIcon name="fire" size={moderateScale(16)} color="#F3701C" />
            }
            label={`${streakDays} day streak!`}
            highlight
          />
        </View>

        <View style={styles.divider} />
        <View style={styles.progressCol}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <ProgressPieChart percentage={percentage} />
            <View style={styles.cupBadge}>
              {/* <FAIcon name="coffee" size={moderateScale(32)} color="#8C5A2B" /> */}
              <Image
                source={{
                  uri:
                    // currentReward?.rewardImage ||
                    'https://thumbs.dreamstime.com/b/coffee-closers-salesperson-motivation-incentive-reward-saying-quote-cup-to-illustrate-motivational-offered-to-35852707.jpg',
                }}
                style={{
                  width: 70,
                  height: 70,
                  resizeMode: 'contain',
                }}
              />
            </View>
          </View>
          <AppText style={styles.footerText}>{footerText}</AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(20),
    marginHorizontal: wp(3),
    marginVertical: hp(2),
    padding: isTablet ? moderateScale(24) : moderateScale(12),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  titleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.8),
  },
  titleIcon: {
    // fontSize: moderateScale(16),
    marginRight: wp(1.5),
  },
  title: {
    fontSize: isTablet ? moderateScale(19) : moderateScale(16),
    fontWeight: '800',
    color: '#222',
  },
  mainRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statsCol: {
    // flex: 1,
    width: '55%',
  },
  statRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.2),
    // marginLeft: 2,
  },
  statIcon: {
    fontSize: moderateScale(10),
    width: moderateScale(22),
    marginRight: 4,
  },
  statLabel: {
    flex: 1,
    fontSize: moderateScale(11),
    lineHeight: moderateScale(22),
    color: '#444',
    fontWeight: '500',
    // marginleft: 10,
  },
  statValue: {
    fontSize: moderateScale(13),
    color: '#222',
    fontWeight: '800',
  },
  statHighlightLabel: {
    fontSize: moderateScale(12),
    color: '#473C8C',
    fontWeight: '700',
  },
  divider: {
    width: 1,
    height: '90%',
    backgroundColor: '#EEEEEE',
    marginHorizontal: wp(3),
  },
  progressCol: {
    // alignItems: 'center',
    justifyContent: 'center',
  },
  chartContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  centerTextContainer: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
  },
  percentageText: {
    fontSize: moderateScale(17),
    fontWeight: '800',
    color: '#473C8C',
  },
  cupBadge: {
    width: moderateScale(50),
    height: moderateScale(50),
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    // shadowColor: '#000',
    // shadowOffset: { width: 0, height: 2 },
    // shadowOpacity: 0.15,
    // shadowRadius: 4,
    // elevation: 4,
    marginLeft: hp(1),
  },
  footerText: {
    marginTop: hp(1.6),
    fontSize: moderateScale(11),
    color: '#555',
    fontWeight: '600',
    width: '60%',
  },
  // 👇 naya style — icon circle (envelope / heart / coffee) ke liye, koi existing style nahi chhua
  iconCircle: {
    width: moderateScale(20),
    height: moderateScale(20),
    borderRadius: moderateScale(10),
    backgroundColor: '#473C8C',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default RewardSection;
