// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
// import AppText from '../../../components/AppText';
// import AppTextInput from '../../../components/AppTextInput';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

// const SendCardSection = ({ onStartWriting }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           <AppText style={styles.title}>
//             Send a card{'\n'}to a friend{'\n'}on campus!
//           </AppText>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={onStartWriting}
//             activeOpacity={0.8}
//           >
//             <AppText style={styles.buttonText}>Start Writing</AppText>
//           </TouchableOpacity>
//         </View>

//         <View style={styles.illustrationContainer}>
//           <View style={styles.illustrationBox}>
//             <View style={styles.cardIllustration}>
//               <View style={styles.blueSection} />
//               <View style={styles.yellowCircle} />
//               <View style={styles.purpleTriangle} />
//               <View style={styles.heartIcon} />
//               <View style={styles.orangeShape} />
//             </View>
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: wp(6),
//     borderRadius: moderateScale(24),
//     padding: isTablet ? moderateScale(32) : moderateScale(28),
//     marginBottom: hp(2),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 8,
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
//     fontSize: isTablet ? moderateScale(26) : moderateScale(22),
//     fontWeight: '600',
//     color: '#6B5B95',
//     lineHeight: isTablet ? moderateScale(38) : moderateScale(32),
//     marginBottom: hp(2.5),
//   },
//   button: {
//     backgroundColor: '#9B8AC4',
//     borderRadius: moderateScale(30),
//     paddingVertical: hp(1.8),
//     paddingHorizontal: wp(8),
//     alignSelf: 'flex-start',
//     shadowColor: '#9B8AC4',
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
//   illustrationContainer: {
//     marginLeft: wp(2),
//   },
//   illustrationBox: {
//     width: isTablet ? moderateScale(140) : moderateScale(120),
//     height: isTablet ? moderateScale(140) : moderateScale(120),
//     borderRadius: moderateScale(12),
//     borderWidth: 4,
//     borderColor: '#4A9FD8',
//     backgroundColor: '#E8F4F8',
//     overflow: 'hidden',
//     position: 'relative',
//   },
//   cardIllustration: {
//     flex: 1,
//     position: 'relative',
//   },
//   blueSection: {
//     position: 'absolute',
//     bottom: 0,
//     left: 0,
//     right: 0,
//     height: '50%',
//     backgroundColor: '#5B7FA8',
//   },
//   yellowCircle: {
//     position: 'absolute',
//     top: moderateScale(10),
//     right: moderateScale(10),
//     width: moderateScale(30),
//     height: moderateScale(30),
//     borderRadius: moderateScale(15),
//     backgroundColor: '#F5A623',
//   },
//   purpleTriangle: {
//     position: 'absolute',
//     top: moderateScale(30),
//     left: moderateScale(15),
//     width: 0,
//     height: 0,
//     borderLeftWidth: moderateScale(20),
//     borderRightWidth: moderateScale(20),
//     borderBottomWidth: moderateScale(35),
//     borderStyle: 'solid',
//     backgroundColor: 'transparent',
//     borderLeftColor: 'transparent',
//     borderRightColor: 'transparent',
//     borderBottomColor: '#6B5B95',
//   },
//   heartIcon: {
//     position: 'absolute',
//     bottom: '55%',
//     right: '35%',
//     width: moderateScale(24),
//     height: moderateScale(24),
//     backgroundColor: '#5B7FA8',
//     borderRadius: moderateScale(12),
//   },
//   orangeShape: {
//     position: 'absolute',
//     bottom: moderateScale(10),
//     right: moderateScale(10),
//     width: moderateScale(35),
//     height: moderateScale(35),
//     backgroundColor: '#F5A623',
//     borderTopLeftRadius: moderateScale(20),
//     borderTopRightRadius: moderateScale(20),
//     borderBottomRightRadius: moderateScale(20),
//   },
// });

// export default SendCardSection;

// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image } from 'react-native';
// import AppText from '../../../components/AppText';
// import AppTextInput from '../../../components/AppTextInput';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
// const { width, height } = Dimensions.get('window');

// const SendCardSection = ({ onStartWriting }) => {
//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           <AppText style={styles.title} numberOfLines={3}>
//             Send a card{'\n'}to a friend{'\n'}on campus!
//           </AppText>

//           <TouchableOpacity
//             style={styles.button}
//             onPress={onStartWriting}
//             activeOpacity={0.7}
//           >
//             <AppText style={styles.buttonText} numberOfLines={1} adjustsFontSizeToFit>
//               Start Writing
//             </AppText>
//           </TouchableOpacity>
//         </View>
//          <Image source={require('../../../assets/sendMesg.png')} style={styles.imageStyle} />
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     backgroundColor: '#FFFFFF',
//     marginHorizontal: wp(5),
//     borderRadius: moderateScale(24),
//     padding: isTablet ? moderateScale(28) : moderateScale(20),
//     marginBottom: hp(2),
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.15,
//     shadowRadius: 12,
//     elevation: 8,
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   textContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     paddingRight: wp(3),
//   },
//   title: {
//     fontSize: isTablet ? moderateScale(24) : moderateScale(20),
//     fontWeight: '700',
//     color: '#6B5B95',
//     lineHeight: isTablet ? moderateScale(34) : moderateScale(28),
//     marginBottom: hp(2),
//     letterSpacing: 0.3,
//   },
//   button: {
//     backgroundColor: '#9B8AC4',
//     borderRadius: moderateScale(25),
//     paddingVertical: hp(1.6),
//     paddingHorizontal: wp(7),
//     alignSelf: 'flex-start',
//     alignItems: 'center',
//     justifyContent: 'center',
//     minWidth: wp(32),
//     shadowColor: '#9B8AC4',
//     shadowOffset: {
//       width: 0,
//       height: 4,
//     },
//     shadowOpacity: 0.3,
//     shadowRadius: 8,
//     elevation: 6,
//   },
//   buttonText: {
//     fontSize: isTablet ? moderateScale(15) : moderateScale(14),
//     fontWeight: '600',
//     color: '#FFFFFF',
//     textAlign: 'center',
//     letterSpacing: 0.5,
//   },

//    imageStyle: {
//         width: width * 0.3,
//         height: height / 6.8,
//     },
// });

// export default SendCardSection;

import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  ActivityIndicator,
} from 'react-native';
import AppText from '../../../components/AppText';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { fetchStudentProfile } from '../../../fetures/studentSlice';

const TABS = ['This Week', 'This Semester', 'All Time'];

const PERIOD_MAP = { 0: 'week', 1: 'semester', 2: 'all' };

const MEDAL = { 1: '🥇', 2: '🥈', 3: '🥉' };

const AVATAR_COLORS = [
  '#E57373',
  '#F06292',
  '#BA68C8',
  '#9575CD',
  '#7986CB',
  '#64B5F6',
  '#4DD0E1',
  '#4DB6AC',
  '#81C784',
  '#FFD54F',
  '#FF8A65',
  '#A1887F',
];

// Helper function to format ISO dates beautifully
const formatDate = dateString => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const Avatar = ({ name, image, size = 32 }) => {
  const letter = (name || '?')[0].toUpperCase();
  const color = AVATAR_COLORS[letter.charCodeAt(0) % AVATAR_COLORS.length];

  return image ? (
    <Image
      source={{ uri: image }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  ) : (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppText
        style={{ color: '#fff', fontWeight: '800', fontSize: size / 2.4 }}
      >
        {letter}
      </AppText>
    </View>
  );
};

const SendCardSection = ({ onSeeLeaderboard, screenData }) => {
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState(0);

  // studentSlice se loading state nikal li tabs ke liye[cite: 1]
  const { loading: tabLoading } = useSelector(state => state.student);

  // Data hum seedhe screenData (ya jo parent se mil raha hai) se read karenge
  const leaderboardData = screenData?.leaderboard || null;
  console.log('Leaderboard data in SendCardSection:', leaderboardData);

  const handleTabChange = async index => {
    if (index === activeTab) return; // already on this tab
    setActiveTab(index);

    try {
      // Ab hum studentSlice me period bhej rahe hain![cite: 1]
      await dispatch(
        fetchStudentProfile({ period: PERIOD_MAP[index] }),
      ).unwrap();
    } catch (err) {
      console.log(err, 'student slice tab fetch error');
    }
  };

  const top3 = leaderboardData?.top3 || [];
  const myResult = leaderboardData?.myResult || null;

  // Extract start and end dates from data
  const startDate = leaderboardData?.startDate;
  const endDate = leaderboardData?.endDate;

  return (
    <View style={styles.container}>
      {/* HEADER */}
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <AppText style={styles.headerIcon}>🏆</AppText>
          <View>
            <AppText style={styles.title}>Kindness Champions</AppText>
            {/* Show dates only when Week (0) or Semester (1) is selected and dates exist */}
            {!tabLoading &&
              (activeTab === 0 || activeTab === 1) &&
              startDate &&
              endDate && (
                <AppText style={styles.dateSubtitle}>
                  {formatDate(startDate)} - {formatDate(endDate)}
                </AppText>
              )}
          </View>
        </View>
        <TouchableOpacity onPress={onSeeLeaderboard} activeOpacity={0.7}>
          <AppText style={styles.seeAll}>See full ›</AppText>
        </TouchableOpacity>
      </View>

      {/* TABS */}
      <View style={styles.tabsRow}>
        {TABS.map((tab, index) => (
          <TouchableOpacity
            key={tab}
            style={[styles.tab, activeTab === index && styles.tabActive]}
            onPress={() => handleTabChange(index)}
            activeOpacity={0.7}
          >
            <AppText
              style={[
                styles.tabText,
                activeTab === index && styles.tabTextActive,
              ]}
              numberOfLines={1}
            >
              {tab}
            </AppText>
          </TouchableOpacity>
        ))}
      </View>

      {/* CONTENT */}
      {tabLoading ? (
        <ActivityIndicator
          size="small"
          color="#473C8C"
          style={{ paddingVertical: hp(2) }}
        />
      ) : top3.length === 0 ? (
        <AppText style={styles.emptyText}>
          No cards sent yet this period — be the first!
        </AppText>
      ) : (
        top3.map(item => (
          <View key={item.studentId} style={styles.row}>
            <AppText style={styles.medal}>{MEDAL[item.rank]}</AppText>
            <Avatar name={item.name} image={item.profileImage} />
            <AppText style={styles.name} numberOfLines={1}>
              {item.name}
            </AppText>
            <AppText style={styles.letters}>
              {item.cardsSent} {item.cardsSent === 1 ? 'card' : 'cards'}
            </AppText>
          </View>
        ))
      )}

      {/* YOU — only show if not already in top3 */}
      {!tabLoading &&
        myResult &&
        !top3.some(t => t.studentId === myResult.studentId) && (
          <View style={styles.meRow}>
            <AppText style={styles.meRank}>{myResult.rank}</AppText>
            <Avatar name={myResult.name} image={myResult.profileImage} />
            <AppText style={styles.meName} numberOfLines={1}>
              {myResult.name}
            </AppText>
            <AppText style={styles.meLetters}>
              {myResult.cardsSent} {myResult.cardsSent === 1 ? 'card' : 'cards'}
            </AppText>
          </View>
        )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp(4),
    borderRadius: moderateScale(20),
    padding: isTablet ? moderateScale(22) : moderateScale(12),
    marginBottom: hp(2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 6,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.6),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
    gap: wp(1),
  },
  headerIcon: {
    fontSize: moderateScale(14),
    marginRight: wp(1),
  },
  title: {
    fontSize: isTablet ? moderateScale(19) : moderateScale(15),
    fontWeight: '800',
    color: '#222',
  },
  dateSubtitle: {
    fontSize: moderateScale(10.5),
    color: '#666',
    fontWeight: '500',
    marginTop: hp(0.2),
  },
  seeAll: {
    fontSize: moderateScale(10),
    fontWeight: '800',
    color: '#473C8C',
  },
  tabsRow: {
    flexDirection: 'row',
    gap: wp(2),
    marginBottom: hp(1.8),
  },
  tab: {
    paddingVertical: hp(0.8),
    paddingHorizontal: wp(3),
    borderRadius: moderateScale(20),
    backgroundColor: '#F2EDFF',
  },
  tabActive: {
    backgroundColor: '#473C8C',
  },
  tabText: {
    fontSize: moderateScale(11.5),
    fontWeight: '700',
    color: '#473C8C',
  },
  tabTextActive: {
    color: '#FFFFFF',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.9),
    gap: wp(2.5),
  },
  medal: {
    fontSize: moderateScale(16),
    width: moderateScale(22),
  },
  name: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: '700',
    color: '#222',
  },
  letters: {
    fontSize: moderateScale(12),
    color: '#888',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: moderateScale(13),
    color: '#888',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: hp(1.5),
  },
  meRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F2EDFF',
    borderRadius: moderateScale(12),
    paddingVertical: hp(1),
    paddingHorizontal: wp(2),
    marginTop: hp(0.6),
    gap: wp(2.5),
  },
  meRank: {
    fontSize: moderateScale(13),
    fontWeight: '800',
    color: '#473C8C',
    width: moderateScale(22),
    textAlign: 'center',
  },
  meName: {
    flex: 1,
    fontSize: moderateScale(14),
    fontWeight: '800',
    color: '#473C8C',
  },
  meLetters: {
    fontSize: moderateScale(12),
    color: '#473C8C',
    fontWeight: '700',
  },
});

export default SendCardSection;
