import React from 'react';
import { View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import AppText from '../../../components/AppText';
import { wp, hp, moderateScale, isTablet } from '../../../utils/responsive';

// Format event start time into a human-readable label
const formatEventLabel = (startTime, status) => {
  const start = new Date(startTime);
  const now = new Date();
  const tomorrow = new Date(now);
  tomorrow.setDate(now.getDate() + 1);

  if (status === 'today') {
    const time = start.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
      hour12: true,
    });
    return `Today · ${time}`;
  }

  const isTomorrow = start.toDateString() === tomorrow.toDateString();
  if (isTomorrow) return 'Starts tomorrow';

  return start.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
};

const CategoryBadge = ({ category }) => (
  <View style={styles.badge}>
    <AppText style={styles.badgeText}>
      {category?.charAt(0).toUpperCase() + category?.slice(1)}
    </AppText>
  </View>
);

const EventRow = ({ item, onJoin, isToday }) => (
  <View style={[styles.eventRow, isToday && styles.eventRowToday]}>
    {/* Emoji */}
    <View style={[styles.emojiCircle, isToday && styles.emojiCircleToday]}>
      <AppText style={styles.emoji}>{item.emoji}</AppText>
    </View>

    {/* Info */}
    <View style={styles.eventInfo}>
      <AppText style={styles.eventTitle} numberOfLines={1}>
        {item.title}
      </AppText>
      <View style={styles.metaRow}>
        <AppText style={styles.eventTime}>
          {formatEventLabel(item.startTime, item.status)}
        </AppText>
        <CategoryBadge category={item.category} />
      </View>
    </View>

    {/* Join button */}
    <TouchableOpacity
      style={[styles.joinBtn, isToday && styles.joinBtnToday]}
      onPress={() => onJoin(item)}
      activeOpacity={0.75}
    >
      <AppText style={[styles.joinText, isToday && styles.joinTextToday]}>
        Join In
      </AppText>
    </TouchableOpacity>
  </View>
);

// screenData comes as prop from HomeScreen (state.student)
const UpcomingCampus = ({ screenData, onJoinEvent }) => {
  const todaysEvent = screenData?.event?.todaysEvent || null;
  const nextEvents = screenData?.event?.next || [];

  // Nothing to show
  if (!todaysEvent && nextEvents.length === 0) return null;

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerRow}>
        <AppText style={styles.headerIcon}>📅</AppText>
        <AppText style={styles.title}>Upcoming on Events</AppText>
      </View>

      {/* Today's event — highlighted */}
      {todaysEvent && (
        <EventRow item={todaysEvent} onJoin={onJoinEvent} isToday />
      )}

      {/* Divider if both sections exist */}
      {todaysEvent && nextEvents.length > 0 && <View style={styles.divider} />}

      {/* Upcoming events */}
      {nextEvents.map((item, index) => (
        <EventRow
          key={item._id}
          item={item}
          onJoin={onJoinEvent}
          isToday={false}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EEF8EE',
    marginHorizontal: wp(4),
    borderRadius: moderateScale(20),
    padding: isTablet ? moderateScale(20) : moderateScale(14),
    marginBottom: hp(2),
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: hp(1.4),
  },
  headerIcon: {
    fontSize: moderateScale(15),
    marginRight: wp(2),
  },
  title: {
    fontSize: isTablet ? moderateScale(17) : moderateScale(15),
    fontWeight: '800',
    color: '#1A4731',
  },
  divider: {
    height: 1,
    backgroundColor: '#C8E6C9',
    marginVertical: hp(1),
  },

  // Event row
  eventRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: hp(0.8),
    gap: wp(2.5),
  },
  eventRowToday: {
    backgroundColor: '#FFFFFF',
    borderRadius: moderateScale(14),
    paddingHorizontal: wp(2.5),
    paddingVertical: hp(1.2),
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.06,
    shadowRadius: 6,
    elevation: 3,
  },

  // Emoji circle
  emojiCircle: {
    width: moderateScale(38),
    height: moderateScale(38),
    borderRadius: moderateScale(19),
    backgroundColor: '#C8E6C9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emojiCircleToday: {
    backgroundColor: '#2E7D32',
  },
  emoji: {
    fontSize: moderateScale(18),
  },

  // Event info
  eventInfo: {
    flex: 1,
  },
  eventTitle: {
    fontSize: isTablet ? moderateScale(14) : moderateScale(13),
    fontWeight: '700',
    color: '#1A2E1A',
    marginBottom: 3,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: wp(2),
  },
  eventTime: {
    fontSize: moderateScale(11.5),
    color: '#555',
    fontWeight: '500',
  },

  // Category badge
  badge: {
    backgroundColor: '#C8E6C9',
    borderRadius: moderateScale(8),
    paddingHorizontal: wp(1.8),
    paddingVertical: 2,
  },
  badgeText: {
    fontSize: moderateScale(10),
    fontWeight: '700',
    color: '#2E7D32',
  },

  // Join button
  joinBtn: {
    backgroundColor: '#C8E6C9',
    borderRadius: moderateScale(20),
    paddingVertical: hp(0.9),
    paddingHorizontal: wp(4),
  },
  joinBtnToday: {
    backgroundColor: '#2E7D32',
  },
  joinText: {
    fontSize: moderateScale(12),
    fontWeight: '700',
    color: '#2E7D32',
  },
  joinTextToday: {
    color: '#FFFFFF',
  },
});

export default UpcomingCampus;
