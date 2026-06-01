// ─── components/events/EventCard.js ──────────────────────────────────────────
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import AppText from '../../../../components/AppText';
import AppTextInput from '../../../../components/AppTextInput';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@react-native-vector-icons/feather';
import { useNavigation } from '@react-navigation/native';
import {
  submitRsvp,
  selectRsvpStatus,
  selectRsvpSubmitting,
} from '../../../../fetures/rsvpslice';
import RsvpConfirmModal from './Rsvpconfirmmodal';

const formatDate = iso => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleDateString('en-US', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
};

const formatTime = iso => {
  if (!iso) return '';
  const d = new Date(iso);
  return d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });
};

const RSVP_OPTIONS = [
  {
    status: 'going',
    label: 'Going',
    icon: 'check-circle',
    activeIcon: 'check-circle',
    activeColor: '#4CAF50',
  },
  {
    status: 'maybe',
    label: 'Maybe',
    icon: 'help-circle',
    activeIcon: 'help-circle',
    activeColor: '#F3B11C',
  },
  {
    status: 'not_going',
    label: 'Not Going',
    icon: 'x-circle',
    activeIcon: 'x-circle',
    activeColor: '#FF6B6B',
  },
];

const EventCard = ({ item, onPress }) => {
  const dispatch = useDispatch();

  const startDate = formatDate(item.startTime);
  const startTime = formatTime(item.startTime);
  const endTime = formatTime(item.endTime);
  const isOnline = item?.location?.isOnline;
  const eventId = item._id ?? item.id;
  const navigation = useNavigation();

  const currentStatus = useSelector(selectRsvpStatus(eventId));
  const isSubmitting = useSelector(selectRsvpSubmitting(eventId));
  console.log(currentStatus, 'stutas++_+_+_+++___+_+++_+_');

  const [pendingStatus, setPendingStatus] = useState(null); // which button tapped
  const [modalVisible, setModalVisible] = useState(false);

  const handleRsvpTap = status => {
    if (isSubmitting) return;
    setPendingStatus(status);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    if (!pendingStatus) return;
    await dispatch(submitRsvp({ eventId, status: pendingStatus }));
    setModalVisible(false);
    setPendingStatus(null);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setPendingStatus(null);
  };

  const handleEventPress = item => {
    navigation.navigate('EventDetail', { eventId: item._id });
  };

  return (
    <>
      <TouchableOpacity
        style={styles.card}
        onPress={() => handleEventPress(item)}
        activeOpacity={0.9}
      >
        {/* Left accent strip — color reflects current RSVP status */}
        <View
          style={[
            styles.cardAccent,
            currentStatus === 'going' && { backgroundColor: '#4CAF50' },
            currentStatus === 'maybe' && { backgroundColor: '#F3B11C' },
            currentStatus === 'not_going' && { backgroundColor: '#FF6B6B' },
          ]}
        />

        {/* Body */}
        <View style={styles.cardBody}>
          <View style={styles.topRow}>
            {/* Emoji / Image */}
            <View style={styles.cardImageBox}>
              {item.image ? (
                <Image source={{ uri: item.image }} style={styles.cardImage} />
              ) : (
                <AppText style={styles.cardEmoji}>{item.emoji || '📅'}</AppText>
              )}
            </View>

            {/* Content */}
            <View style={styles.cardContent}>
              <View style={styles.headerRow}>
                <View style={styles.categoryPill}>
                  <AppText style={styles.categoryText}>
                    {item.category?.toUpperCase() || 'EVENT'}
                  </AppText>
                </View>

                {/* Going count badge */}
                <View style={styles.goingBadge}>
                  <Icon name="users" size={11} color="#F3B11C" />
                  <AppText style={styles.goingCount}>
                    {item.goingCount ?? 0}
                  </AppText>
                </View>
              </View>

              <AppText style={styles.cardTitle} numberOfLines={1}>
                {item.title}
              </AppText>

              <AppText style={styles.cardDescription} numberOfLines={2}>
                {item.description}
              </AppText>

              {/* Date & Time */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Icon name="calendar" size={11} color="#ffffffbb" />
                  <AppText style={styles.metaText}>{startDate}</AppText>
                </View>
                <View style={styles.metaItem}>
                  <Icon name="clock" size={11} color="#ffffffbb" />
                  <AppText style={styles.metaText}>
                    {startTime} – {endTime}
                  </AppText>
                </View>
              </View>

              {/* Location */}
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Icon
                    name={isOnline ? 'monitor' : 'map-pin'}
                    size={11}
                    color="#ffffffbb"
                  />
                  <AppText style={styles.metaText} numberOfLines={1}>
                    {isOnline
                      ? 'Online'
                      : item?.location?.address || 'Location TBD'}
                  </AppText>
                </View>
              </View>

              {/* Tags */}
              {item.tags?.length > 0 && (
                <View style={styles.tagsRow}>
                  {item.tags.slice(0, 3).map(tag => (
                    <View key={tag} style={styles.tag}>
                      <AppText style={styles.tagText}>#{tag}</AppText>
                    </View>
                  ))}
                </View>
              )}
            </View>
          </View>
          <View style={styles.rsvpRow}>
            {RSVP_OPTIONS.map(opt => {
              const isActive = currentStatus === opt.status;
              return (
                <TouchableOpacity
                  key={opt.status}
                  style={[
                    styles.rsvpBtn,
                    isActive && {
                      backgroundColor: opt.activeColor + '22',
                      borderColor: opt.activeColor,
                    },
                  ]}
                  onPress={() => handleRsvpTap(opt.status)}
                  disabled={isSubmitting}
                  activeOpacity={0.75}
                >
                  <Icon
                    name={isActive ? opt.activeIcon : opt.icon}
                    size={15}
                    color={isActive ? opt.activeColor : '#ffffff66'}
                  />
                  <AppText
                    style={[
                      styles.rsvpBtnText,
                      isActive && { color: opt.activeColor, fontWeight: '700' },
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>
      </TouchableOpacity>
      <RsvpConfirmModal
        visible={modalVisible}
        eventTitle={item.title}
        selectedStatus={pendingStatus}
        isSubmitting={isSubmitting}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#6955A5',
    borderRadius: 16,
    marginBottom: 16,
    flexDirection: 'row',
    alignItems: 'stretch',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#ffffff18',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },

  // ── Left accent ──
  cardAccent: {
    width: 4,
    backgroundColor: '#F3B11C',
    borderTopLeftRadius: 16,
    borderBottomLeftRadius: 16,
  },

  // ── Body (right of accent) ──
  cardBody: {
    flex: 1,
    paddingVertical: 12,
    paddingRight: 12,
  },
  topRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },

  // ── Emoji box ──
  cardImageBox: {
    width: 60,
    height: 60,
    backgroundColor: '#F3B11C22',
    borderRadius: 14,
    marginLeft: 10,
    marginRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  cardImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  cardEmoji: { fontSize: 28 },

  // ── Content ──
  cardContent: { flex: 1 },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  categoryPill: {
    backgroundColor: '#F3B11C33',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 2,
    borderWidth: 1,
    borderColor: '#F3B11C55',
  },
  categoryText: {
    color: '#F3B11C',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  goingBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    backgroundColor: '#F3B11C18',
    borderRadius: 10,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  goingCount: { color: '#F3B11C', fontSize: 11, fontWeight: '700' },

  cardTitle: {
    color: '#FFFFFF',
    fontWeight: '800',
    fontSize: 14,
    marginBottom: 3,
  },
  cardDescription: {
    color: '#ffffffaa',
    fontSize: 12,
    lineHeight: 17,
    marginBottom: 6,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginBottom: 3,
    gap: 10,
  },
  metaItem: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  metaText: {
    color: '#ffffffbb',
    fontSize: 11,
    fontWeight: '500',
    flexShrink: 1,
  },
  tagsRow: { flexDirection: 'row', flexWrap: 'wrap', marginTop: 4, gap: 5 },
  tag: {
    backgroundColor: '#ffffff18',
    borderRadius: 20,
    paddingHorizontal: 7,
    paddingVertical: 2,
  },
  tagText: { color: '#ffffffcc', fontSize: 10, fontWeight: '600' },

  // ── RSVP row ──
  rsvpRow: {
    flexDirection: 'row',
    gap: 8,
    marginTop: 12,
    marginLeft: 10,
  },
  rsvpBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 7,
    borderRadius: 10,
    backgroundColor: '#ffffff0f',
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  rsvpBtnText: {
    color: '#ffffff66',
    fontSize: 11,
    fontWeight: '600',
  },
});

export default EventCard;
