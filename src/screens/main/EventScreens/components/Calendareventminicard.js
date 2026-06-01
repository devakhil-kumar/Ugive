import { View, Text, StyleSheet } from 'react-native';
import AppText from '../../../../components/AppText';
import AppTextInput from '../../../../components/AppTextInput';
import Icon from '@react-native-vector-icons/ionicons';

const formatTime = iso => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const CalendarEventMiniCard = ({ item }) => {
  const startTime = formatTime(item.startTime);
  const endTime = formatTime(item.endTime);
  const isOnline = item?.location?.isOnline;

  return (
    <View style={styles.miniCard}>
      {/* Left: emoji + text */}
      <View style={styles.miniCardLeft}>
        <View style={styles.miniEmojiBox}>
          <AppText style={styles.miniEmoji}>{item.emoji || '📅'}</AppText>
        </View>

        <View style={styles.miniCardTextBlock}>
          <AppText style={styles.miniCardTitle} numberOfLines={1}>
            {item.title}
          </AppText>

          <View style={styles.miniCardMeta}>
            <View style={styles.miniMetaRow}>
              <Icon name="time-outline" size={10} color="#ffffffaa" />
              <AppText style={styles.miniMetaText}>
                {startTime} – {endTime}
              </AppText>
            </View>
            <View style={styles.miniMetaRow}>
              <Icon
                name={isOnline ? 'laptop-outline' : 'location-outline'}
                size={10}
                color="#ffffffaa"
              />
              <AppText style={styles.miniMetaText}>
                {isOnline ? 'Online' : item?.location?.address || 'TBD'}
              </AppText>
            </View>
          </View>

          {item.category && (
            <View style={styles.miniCategoryPill}>
              <AppText style={styles.miniCategoryText}>
                {item.category.toUpperCase()}
              </AppText>
            </View>
          )}
        </View>
      </View>

      {/* Right: going count */}
      <View style={styles.miniRsvp}>
        <Icon name="people-outline" size={12} color="#F3B11C" />
        <AppText style={styles.miniRsvpCount}>{item.goingCount ?? 0}</AppText>
        <AppText style={styles.miniRsvpLabel}>Going</AppText>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  miniCard: {
    backgroundColor: '#3d2b6b',
    borderRadius: 12,
    padding: 10,
    marginBottom: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#F3B11C22',
  },
  miniCardLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  miniEmojiBox: {
    width: 40,
    height: 40,
    backgroundColor: '#F3B11C22',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  miniEmoji: { fontSize: 22 },
  miniCardTextBlock: { flex: 1 },
  miniCardTitle: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 13,
    marginBottom: 4,
  },
  miniCardMeta: { gap: 3 },
  miniMetaRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  miniMetaText: { color: '#ffffffaa', fontSize: 10, fontWeight: '500' },
  miniCategoryPill: {
    alignSelf: 'flex-start',
    backgroundColor: '#F3B11C33',
    borderRadius: 20,
    paddingHorizontal: 8,
    paddingVertical: 1,
    marginTop: 4,
  },
  miniCategoryText: {
    color: '#F3B11C',
    fontSize: 8,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  miniRsvp: { alignItems: 'center', marginLeft: 8, gap: 2 },
  miniRsvpCount: { color: '#F3B11C', fontWeight: '800', fontSize: 16 },
  miniRsvpLabel: { color: '#F3B11C88', fontSize: 8, fontWeight: '600' },
});

export default CalendarEventMiniCard;
