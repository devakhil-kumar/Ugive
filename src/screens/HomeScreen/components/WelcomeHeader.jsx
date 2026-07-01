// import React from 'react';
// import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
// import AppText from '../../../components/AppText';
// import AppTextInput from '../../../components/AppTextInput';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
// import { useDispatch, useSelector } from 'react-redux';
// import { useFocusEffect } from '@react-navigation/native';
// import { fetchStudentProfile } from '../../../fetures/studentSlice';

// const WelcomeHeader = ({ userName, onProfilePress }) => {
//   const dispatch = useDispatch();

//   useFocusEffect(
//     React.useCallback(() => {
//       dispatch(fetchStudentProfile());
//     }, [dispatch]),
//   );

//   const { user, loading } = useSelector(state => state.student);
//   console.log(user, 'user in welcome header');

//   return (
//     <View style={styles.container}>
//       <View style={styles.content}>
//         <View style={styles.textContainer}>
//           <View
//             style={{
//               justifyContent: 'space-between',
//               flexDirection: 'row',
//               alignItems: 'center',
//             }}
//           >
//             <AppText style={styles.logo}>UGive</AppText>
//             <TouchableOpacity
//               style={styles.profileButton}
//               onPress={onProfilePress}
//               activeOpacity={0.8}
//             >
//               <Image
//                 source={
//                   user?.profileImage
//                     ? { uri: user.profileImage }
//                     : require('../../../assets/profile.png')
//                 }
//                 style={styles.profileStyle}
//               />
//             </TouchableOpacity>
//           </View>

//           <AppText style={styles.welcomeText}>
//             Welcome, <AppText style={styles.userName}>{user?.name}</AppText>!
//           </AppText>
//           <AppText style={styles.tagline}>
//             Be the difference in{'\n'}someone's world today
//           </AppText>
//         </View>
//       </View>
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     paddingHorizontal: wp(6),
//     paddingTop: hp(2),
//     paddingBottom: hp(3),
//   },
//   content: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//   },
//   textContainer: {
//     flex: 1,
//     paddingRight: wp(4),
//   },
//   logo: {
//     fontSize: isTablet ? moderateScale(56) : moderateScale(48),
//     fontWeight: '700',
//     color: '#FFFFFF',
//     letterSpacing: -1,
//     marginBottom: hp(1),
//   },
//   welcomeText: {
//     fontSize: isTablet ? moderateScale(32) : moderateScale(28),
//     fontWeight: '400',
//     color: '#FFFFFF',
//     marginBottom: hp(1.5),
//   },
//   userName: {
//     color: '#F3B11C',
//     fontWeight: '600',
//   },
//   tagline: {
//     fontSize: isTablet ? moderateScale(26) : moderateScale(22),
//     fontWeight: '600',
//     color: '#FFFFFF',
//     lineHeight: isTablet ? moderateScale(36) : moderateScale(30),
//   },
//   profileButton: {
//     width: moderateScale(40),
//     height: moderateScale(40),
//     borderRadius: moderateScale(28),
//     backgroundColor: '#FFFFFF',
//     justifyContent: 'center',
//     alignItems: 'center',
//     borderWidth: 2,
//     borderColor: '#FFFFFF',
//   },
//   profileStyle: {
//     width: 40,
//     height: 40,
//     alignSelf: 'center',
//     borderRadius: 80,
//   },
// });

// export default WelcomeHeader;

import React from 'react';
import {
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
  Platform,
  Share,
} from 'react-native';
import AppText from '../../../components/AppText';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
import Icon from '@react-native-vector-icons/ionicons';

// onStartWriting -> "Write a Letter" button press
// user + screenData come from HomeScreen via useSelector(state => state.student)

const APP_LINKS = {
  android:
    'https://play.google.com/store/apps/details?id=com.ugivenew.com&hl=en_IN',
  ios: 'https://apps.apple.com/us/app/ugive/id6758373145',
};

const WelcomeHeader = ({
  userName,
  onProfilePress,
  onStartWriting,
  user,
  screenData,
}) => {
  const studentsEncouragedThisWeek =
    screenData?.banner?.collegeEncouragedThisWeek;
  const displayName = user?.name || userName || '';
  const firstName = displayName.trim().split(' ')[0];

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
    <View style={styles.container}>
      <View style={styles.topRow}>
        <AppText style={styles.greeting} numberOfLines={1}>
          👋 Hey {firstName || userName}!
        </AppText>

        <TouchableOpacity
          style={styles.profileButton}
          onPress={onProfilePress}
          activeOpacity={0.8}
        >
          <Image
            source={
              user?.profileImage
                ? { uri: user.profileImage }
                : require('../../../assets/profile.png')
            }
            style={styles.profileStyle}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={handleShareApp}
          style={{ marginBottom: wp(2) }}
          activeOpacity={0.8}
        >
          {/* <Feather name="share" color={'#010101'} size={30} /> */}
          <Icon name="share-outline" color={'#fff'} size={30} />
        </TouchableOpacity>
      </View>
      <View style={styles.middleRow}>
        <View style={styles.statPill}>
          <AppText style={styles.subtitle}>
            You could make someone's{'\n'} dayin under 60 seconds.
          </AppText>
          <View
            style={{
              flexDirection: 'row',
              marginTop: hp(2),
            }}
          >
            <View style={styles.heartCircle}>
              <AppText style={{ fontSize: moderateScale(14) }}>❤️</AppText>
            </View>
            <AppText style={styles.statText}>
              {studentsEncouragedThisWeek} students encouraged{'\n'}this week
            </AppText>
          </View>
        </View>

        <Image
          source={require('../../../assets/sendMesg.png')}
          style={styles.illustration}
          resizeMode="contain"
        />
      </View>
      <TouchableOpacity
        style={styles.button}
        onPress={onStartWriting}
        activeOpacity={0.8}
      >
        <AppText style={styles.buttonText}>✏️ Write a Letter</AppText>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#473C8C',
    paddingHorizontal: wp(6),
    paddingTop: hp(2.2),
    paddingBottom: hp(3),
    borderBottomLeftRadius: moderateScale(28),
    borderBottomRightRadius: moderateScale(28),
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.2),
  },
  greeting: {
    flex: 1,
    fontSize: isTablet ? moderateScale(28) : moderateScale(28),
    fontWeight: '800',
    color: '#FFFFFF',
    paddingRight: wp(3),
  },
  profileButton: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginRight: wp(2),
  },
  profileStyle: {
    width: moderateScale(44),
    height: moderateScale(44),
    borderRadius: moderateScale(22),
  },
  subtitle: {
    fontSize: isTablet ? moderateScale(16) : moderateScale(15),
    fontWeight: '500',
    color: 'rgba(255,255,255,0.9)', //
    lineHeight: isTablet ? moderateScale(26) : moderateScale(17),
    // marginBottom: hp(1),
  },
  middleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    marginBottom: hp(2.4),
  },
  statPill: {
    // flexDirection: 'row',
    // alignItems: 'center',
    marginRight: wp(3),
  },
  heartCircle: {
    width: moderateScale(30),
    height: moderateScale(30),
    borderRadius: moderateScale(15),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp(2.5),
  },
  statText: {
    fontSize: moderateScale(12),
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: moderateScale(16),
    flexShrink: 1,
  },
  illustration: {
    width: isTablet ? moderateScale(110) : moderateScale(90),
    height: isTablet ? moderateScale(110) : moderateScale(90),
  },
  button: {
    backgroundColor: '#F3B11C',
    borderRadius: moderateScale(20),
    paddingVertical: hp(1.8),
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F3B11C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 6,
    width: '90%',
    alignSelf: 'center',
  },
  buttonText: {
    fontSize: moderateScale(16),
    fontWeight: '700',
    color: '#2D2654',
  },
});

export default WelcomeHeader;
