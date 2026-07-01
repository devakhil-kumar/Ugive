import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import AppText from '../../../components/AppText';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

// backend "icon" string → emoji
const ICON_MAP = {
  send: '✉️',
  card_sent: '✉️',
  streak: '🏆',
  reward: '☕',
  voucher: '☕',
  badge: '🎖️',
  default: '⚡',
};

// ISO timestamp → "2m ago" / "3h ago" / "5d ago"
const timeAgo = timestamp => {
  const diff = Date.now() - new Date(timestamp).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 1) return 'just now';
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
};

// screenData + user come from HomeScreen via useSelector(state => state.student)
const RecentActivity = ({ onSeeAll, screenData }) => {
  const activities = screenData?.recentActivity || [];

  return (
    <View style={styles.container}>
      <View style={styles.headerRow}>
        <View style={styles.headerLeft}>
          <AppText style={styles.headerIcon}>⚡</AppText>
          <AppText style={styles.title}>Recent Activity</AppText>
        </View>
        {/* <TouchableOpacity onPress={onSeeAll} activeOpacity={0.7}>
          <AppText style={styles.seeAll}>See all</AppText>
        </TouchableOpacity> */}
      </View>

      {activities.length === 0 ? (
        <AppText style={styles.emptyText}>
          No activity yet — send a card!
        </AppText>
      ) : (
        activities.map((item, index) => (
          <View
            key={item.timestamp + index}
            style={[
              styles.row,
              index < activities.length - 1 && styles.rowBorder,
            ]}
          >
            <View style={styles.iconCircle}>
              <AppText style={{ fontSize: moderateScale(14) }}>
                {ICON_MAP[item.icon] || ICON_MAP[item.type] || ICON_MAP.default}
              </AppText>
            </View>
            <View style={{ flex: 1 }}>
              <AppText style={styles.text} numberOfLines={1}>
                {item.title}
              </AppText>
              {item.subtitle ? (
                <AppText style={styles.subtitle} numberOfLines={3}>
                  {item.subtitle}
                </AppText>
              ) : null}
              <AppText style={styles.time}>{timeAgo(item.timestamp)}</AppText>
            </View>
          </View>
        ))
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: wp(5),
    borderRadius: moderateScale(18),
    padding: isTablet ? moderateScale(20) : moderateScale(16),
    marginBottom: hp(3),
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: hp(1.4),
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    fontSize: moderateScale(15),
    marginRight: wp(2),
  },
  title: {
    fontSize: isTablet ? moderateScale(17) : moderateScale(15),
    fontWeight: '800',
    color: '#222',
  },
  seeAll: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#473C8C',
  },
  emptyText: {
    fontSize: moderateScale(13),
    color: '#999',
    fontWeight: '500',
    textAlign: 'center',
    paddingVertical: hp(1.5),
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.9),
    gap: wp(2.5),
  },
  rowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F5F5F5',
  },
  iconCircle: {
    width: moderateScale(34),
    height: moderateScale(34),
    borderRadius: moderateScale(17),
    backgroundColor: '#F2EDFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    fontSize: moderateScale(13.5),
    fontWeight: '600',
    color: '#333',
  },
  subtitle: {
    fontSize: moderateScale(11.5),
    color: '#888',
    fontWeight: '400',
    marginTop: 1,
  },
  time: {
    fontSize: moderateScale(11),
    color: '#999',
    marginTop: 2,
  },
});

export default RecentActivity;
