import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import Icon from 'react-native-vector-icons/Ionicons';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';
import { useDispatch, useSelector } from 'react-redux';
import { useFocusEffect } from '@react-navigation/native';
import { fetchStudentProfile } from '../../../fetures/studentSlice';

const WelcomeHeader = ({ userName, onProfilePress }) => {
  const dispatch = useDispatch();

  useFocusEffect(
    React.useCallback(() => {
      dispatch(fetchStudentProfile());
    }, [dispatch]),
  );

  const { user, loading } = useSelector(state => state.student);
  console.log(user, 'user in welcome header');

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <View
            style={{
              justifyContent: 'space-between',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <AppText style={styles.logo}>UGive</AppText>
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
          </View>

          <AppText style={styles.welcomeText}>
            Welcome, <AppText style={styles.userName}>{user?.name}</AppText>!
          </AppText>
          <AppText style={styles.tagline}>
            Be the difference in{'\n'}someone's world today
          </AppText>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: wp(6),
    paddingTop: hp(2),
    paddingBottom: hp(3),
  },
  content: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  textContainer: {
    flex: 1,
    paddingRight: wp(4),
  },
  logo: {
    fontSize: isTablet ? moderateScale(56) : moderateScale(48),
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: -1,
    marginBottom: hp(1),
  },
  welcomeText: {
    fontSize: isTablet ? moderateScale(32) : moderateScale(28),
    fontWeight: '400',
    color: '#FFFFFF',
    marginBottom: hp(1.5),
  },
  userName: {
    color: '#F3B11C',
    fontWeight: '600',
  },
  tagline: {
    fontSize: isTablet ? moderateScale(26) : moderateScale(22),
    fontWeight: '600',
    color: '#FFFFFF',
    lineHeight: isTablet ? moderateScale(36) : moderateScale(30),
  },
  profileButton: {
    width: moderateScale(40),
    height: moderateScale(40),
    borderRadius: moderateScale(28),
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  profileStyle: {
    width: 40,
    height: 40,
    alignSelf: 'center',
    borderRadius: 80,
  },
});

export default WelcomeHeader;
