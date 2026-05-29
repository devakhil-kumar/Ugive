import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Linking,
} from 'react-native';
import { useEffect } from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@react-native-vector-icons/feather';

import GradientScreen from '../../../common/GradientScreen';
import {
  fetchEventDetail,
  clearEventDetail,
  selectEventDetail,
  selectEventDetailLoading,
  selectEventDetailError,
} from '../../../../fetures/eventDetailsSlice';
import RsvpConfirmModal from './Rsvpconfirmmodal';
import {
  submitRsvp,
  selectRsvpStatus,
  selectRsvpSubmitting,
} from '../../../../fetures/rsvpslice';
import { useState } from 'react';

// ─── Helpers ──────────────────────────────────────────────────────────────────

const formatDate = iso => {
  if (!iso) return '';
  return new Date(iso).toLocaleDateString('en-US', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
};

const formatTime = iso => {
  if (!iso) return '';
  return new Date(iso).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
  });
};

// ─── RSVP config ──────────────────────────────────────────────────────────────

const RSVP_OPTIONS = [
  {
    status: 'going',
    label: 'Going',
    icon: 'check-circle',
    color: '#4CAF50',
  },
  {
    status: 'maybe',
    label: 'Maybe',
    icon: 'help-circle',
    color: '#F3B11C',
  },
  {
    status: 'not_going',
    label: 'Not Going',
    icon: 'x-circle',
    color: '#FF6B6B',
  },
];

// ─── Info Row ─────────────────────────────────────────────────────────────────

const InfoRow = ({ icon, label, value }) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIconBox}>
      <Icon name={icon} size={16} color="#F3B11C" />
    </View>
    <View style={styles.infoTextBlock}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
  </View>
);

// ─── Section Header ───────────────────────────────────────────────────────────

const SectionHeader = ({ title }) => (
  <View style={styles.sectionHeader}>
    <View style={styles.sectionAccent} />
    <Text style={styles.sectionTitle}>{title}</Text>
  </View>
);

// ─── Attachment type helpers ──────────────────────────────────────────────────

const getFileType = fileType => {
  if (!fileType) return 'unknown';
  if (fileType.startsWith('image/')) return 'image';
  if (fileType === 'application/pdf') return 'pdf';
  if (fileType.includes('wordprocessingml') || fileType.includes('msword'))
    return 'docx';
  return 'file';
};

// ─── Single Attachment Card ────────────────────────────────────────────────────

const AttachmentCard = ({ attachment }) => {
  const type = getFileType(attachment.fileType);

  const handlePreview = () => {
    Linking.openURL(attachment.fileUrl).catch(() => {});
  };

  // ── IMAGE ──
  if (type === 'image') {
    return (
      <TouchableOpacity
        style={styles.attachmentItem}
        activeOpacity={0.85}
        onPress={handlePreview}
      >
        <Image
          source={{ uri: attachment.fileUrl }}
          style={styles.attachmentImage}
          resizeMode="cover"
        />
        <View style={styles.attachmentBadge}>
          <Icon name="image" size={10} color="#F3B11C" />
          <Text style={styles.attachmentBadgeText}>View</Text>
        </View>
      </TouchableOpacity>
    );
  }

  // ── PDF ──
  if (type === 'pdf') {
    return (
      <View style={styles.attachmentItem}>
        <View style={styles.fileCardBg}>
          <View style={styles.fileIconBox}>
            <Icon name="file-text" size={32} color="#FF5A5A" />
          </View>
          <Text style={styles.fileCardName} numberOfLines={2}>
            {attachment.fileName}
          </Text>
          <Text style={styles.fileCardSize}>
            {(attachment.fileSize / 1024).toFixed(1)} KB
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.previewBtn,
            { backgroundColor: '#FF5A5A22', borderColor: '#FF5A5A55' },
          ]}
          onPress={handlePreview}
          activeOpacity={0.8}
        >
          <Icon name="eye" size={12} color="#FF5A5A" />
          <Text style={[styles.previewBtnText, { color: '#FF5A5A' }]}>
            Preview PDF
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── DOCX ──
  if (type === 'docx') {
    return (
      <View style={styles.attachmentItem}>
        <View style={styles.fileCardBg}>
          <View style={styles.fileIconBox}>
            <Icon name="file" size={32} color="#4A90D9" />
          </View>
          <Text style={styles.fileCardName} numberOfLines={2}>
            {attachment.fileName}
          </Text>
          <Text style={styles.fileCardSize}>
            {(attachment.fileSize / 1024).toFixed(1)} KB
          </Text>
        </View>
        <TouchableOpacity
          style={[
            styles.previewBtn,
            { backgroundColor: '#4A90D922', borderColor: '#4A90D955' },
          ]}
          onPress={handlePreview}
          activeOpacity={0.8}
        >
          <Icon name="eye" size={12} color="#4A90D9" />
          <Text style={[styles.previewBtnText, { color: '#4A90D9' }]}>
            Preview DOCX
          </Text>
        </TouchableOpacity>
      </View>
    );
  }

  // ── GENERIC FILE ──
  return (
    <View style={styles.attachmentItem}>
      <View style={styles.fileCardBg}>
        <View style={styles.fileIconBox}>
          <Icon name="paperclip" size={32} color="#F3B11C" />
        </View>
        <Text style={styles.fileCardName} numberOfLines={2}>
          {attachment.fileName}
        </Text>
      </View>
      <TouchableOpacity
        style={[
          styles.previewBtn,
          { backgroundColor: '#F3B11C22', borderColor: '#F3B11C55' },
        ]}
        onPress={handlePreview}
        activeOpacity={0.8}
      >
        <Icon name="download" size={12} color="#F3B11C" />
        <Text style={[styles.previewBtnText, { color: '#F3B11C' }]}>
          Open File
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// ─── Main Screen ──────────────────────────────────────────────────────────────

const EventDetailScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const dispatch = useDispatch();

  const { eventId } = route.params;

  const event = useSelector(selectEventDetail);
  const loading = useSelector(selectEventDetailLoading);
  const error = useSelector(selectEventDetailError);
  const currentRsvpStatus = useSelector(selectRsvpStatus(eventId));
  const isSubmitting = useSelector(selectRsvpSubmitting(eventId));

  const [pendingStatus, setPendingStatus] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  // ── Fetch on mount, clear on unmount ──────────────────────────────────────
  useEffect(() => {
    dispatch(fetchEventDetail(eventId));
    return () => dispatch(clearEventDetail());
  }, [eventId]);

  // ── RSVP handlers ─────────────────────────────────────────────────────────
  const handleRsvpTap = status => {
    if (isSubmitting) return;
    setPendingStatus(status);
    setModalVisible(true);
  };

  const handleConfirm = async () => {
    await dispatch(submitRsvp({ eventId, status: pendingStatus }));
    setModalVisible(false);
    setPendingStatus(null);
  };

  const handleCancel = () => {
    setModalVisible(false);
    setPendingStatus(null);
  };

  // ── Active RSVP display ───────────────────────────────────────────────────
  // Use redux status if user has acted in session, else fall back to API field
  const activeStatus = currentRsvpStatus ?? event?.myRsvpStatus ?? null;
  const activeConfig = RSVP_OPTIONS.find(o => o.status === activeStatus);

  // ── Loading ───────────────────────────────────────────────────────────────
  if (loading) {
    return (
      <GradientScreen colors={['#6955A5']}>
        <View style={styles.centerFull}>
          <ActivityIndicator size="large" color="#F3B11C" />
          <Text style={styles.loadingText}>Loading event…</Text>
        </View>
      </GradientScreen>
    );
  }

  // ── Error ─────────────────────────────────────────────────────────────────
  if (error || !event) {
    return (
      <GradientScreen colors={['#6955A5']}>
        <View style={styles.centerFull}>
          <Icon name="alert-triangle" size={44} color="#FF6B6B" />
          <Text style={styles.errorText}>{error ?? 'Event not found'}</Text>
          <TouchableOpacity
            style={styles.retryBtn}
            onPress={() => dispatch(fetchEventDetail(eventId))}
          >
            <Text style={styles.retryBtnText}>Retry</Text>
          </TouchableOpacity>
        </View>
      </GradientScreen>
    );
  }

  const isOnline = event?.location?.isOnline;

  return (
    <GradientScreen colors={['#6955A5']}>
      <View style={styles.pageBg}>
        {/* ── Top Bar ── */}
        <View style={styles.topBar}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Icon name="arrow-left" size={26} color="#FFF" />
          </TouchableOpacity>
          <Text style={styles.topBarTitle} numberOfLines={1}>
            Event Details
          </Text>
          <View style={{ width: 38 }} />
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}
        >
          {/* ── Hero Card ── */}
          <View style={styles.heroCard}>
            {/* Accent strip — color reflects RSVP status */}
            <View
              style={[
                styles.heroAccent,
                activeConfig && { backgroundColor: activeConfig.color },
              ]}
            />

            <View style={styles.heroBody}>
              {/* Image (full-width banner) or Emoji fallback */}
              {event.image ? (
                <View style={styles.heroBannerBox}>
                  <Image
                    source={{ uri: event.image }}
                    style={styles.heroBanner}
                  />
                  {/* Emoji overlay on banner */}
                  <View style={styles.heroBannerEmoji}>
                    <Text style={styles.heroEmojiBadge}>
                      {event.emoji || '📅'}
                    </Text>
                  </View>
                </View>
              ) : (
                <View style={styles.heroImageBox}>
                  <Text style={styles.heroEmoji}>{event.emoji || '📅'}</Text>
                </View>
              )}

              {/* Category + Title */}
              <View style={styles.heroCategoryRow}>
                <View style={styles.categoryPill}>
                  <Text style={styles.categoryText}>
                    {event.category?.toUpperCase() || 'EVENT'}
                  </Text>
                </View>

                {/* RSVP status chip */}
                {activeConfig && (
                  <View
                    style={[
                      styles.statusChip,
                      { borderColor: activeConfig.color },
                    ]}
                  >
                    <Icon
                      name={activeConfig.icon}
                      size={12}
                      color={activeConfig.color}
                    />
                    <Text
                      style={[
                        styles.statusChipText,
                        { color: activeConfig.color },
                      ]}
                    >
                      {activeConfig.label}
                    </Text>
                  </View>
                )}
              </View>

              <Text style={styles.heroTitle}>{event.title}</Text>
              <Text style={styles.heroDescription}>{event.description}</Text>

              {/* Stats row */}
              <View style={styles.statsRow}>
                <View style={styles.statItem}>
                  <Icon name="users" size={14} color="#F3B11C" />
                  <Text style={styles.statValue}>{event.goingCount ?? 0}</Text>
                  <Text style={styles.statLabel}>Going</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Icon name="list" size={14} color="#F3B11C" />
                  <Text style={styles.statValue}>{event.rsvpCount ?? 0}</Text>
                  <Text style={styles.statLabel}>RSVPs</Text>
                </View>
                <View style={styles.statDivider} />
                <View style={styles.statItem}>
                  <Icon name="tag" size={14} color="#F3B11C" />
                  <Text style={styles.statValue}>
                    {event.tags?.length ?? 0}
                  </Text>
                  <Text style={styles.statLabel}>Tags</Text>
                </View>
              </View>
            </View>
          </View>

          {/* ── RSVP Section ── */}
          <SectionHeader title="Your Response" />
          <View style={styles.rsvpCard}>
            <Text style={styles.rsvpPrompt}>Will you attend this event?</Text>
            <View style={styles.rsvpRow}>
              {RSVP_OPTIONS.map(opt => {
                const isActive = activeStatus === opt.status;
                return (
                  <TouchableOpacity
                    key={opt.status}
                    style={[
                      styles.rsvpBtn,
                      isActive && {
                        backgroundColor: opt.color + '22',
                        borderColor: opt.color,
                      },
                    ]}
                    onPress={() => handleRsvpTap(opt.status)}
                    disabled={isSubmitting}
                    activeOpacity={0.75}
                  >
                    {isSubmitting && pendingStatus === opt.status ? (
                      <ActivityIndicator size="small" color={opt.color} />
                    ) : (
                      <Icon
                        name={opt.icon}
                        size={20}
                        color={isActive ? opt.color : '#ffffff55'}
                      />
                    )}
                    <Text
                      style={[
                        styles.rsvpBtnText,
                        isActive && { color: opt.color, fontWeight: '700' },
                      ]}
                    >
                      {opt.label}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>

          {/* ── Event Info ── */}
          <SectionHeader title="Event Info" />
          <View style={styles.infoCard}>
            <InfoRow
              icon="calendar"
              label="Date"
              value={formatDate(event.startTime)}
            />
            <View style={styles.infoDivider} />
            <InfoRow
              icon="clock"
              label="Time"
              value={`${formatTime(event.startTime)} – ${formatTime(
                event.endTime,
              )}`}
            />
            <View style={styles.infoDivider} />
            <InfoRow
              icon={isOnline ? 'monitor' : 'map-pin'}
              label="Location"
              value={
                isOnline
                  ? 'Online Event'
                  : event?.location?.address || 'Location TBD'
              }
            />
            {isOnline && event?.location?.onlineLink ? (
              <>
                <View style={styles.infoDivider} />
                <InfoRow
                  icon="link"
                  label="Join Link"
                  value={event.location.onlineLink}
                />
              </>
            ) : null}
          </View>

          {/* ── Organiser ── */}
          <SectionHeader title="Organiser" />
          <View style={styles.infoCard}>
            <InfoRow
              icon="home"
              label="University"
              value={event?.university?.name || '—'}
            />
            <View style={styles.infoDivider} />
            <InfoRow
              icon="layers"
              label="College / Hall"
              value={event?.college?.name || '—'}
            />
          </View>

          {/* ── Tags ── */}
          {event.tags?.length > 0 && (
            <>
              <SectionHeader title="Tags" />
              <View style={styles.tagsCard}>
                {event.tags.map(tag => (
                  <View key={tag} style={styles.tag}>
                    <Icon name="hash" size={11} color="#F3B11C" />
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </>
          )}

          {/* ── Attachments ── */}
          {(() => {
            // Filter out empty strings from API response
            const validAttachments = (event.attachments || []).filter(
              a => a && typeof a === 'object' && a.fileUrl,
            );
            if (validAttachments.length === 0) return null;
            return (
              <>
                <SectionHeader title="Attachments" />
                <View style={styles.attachmentsCard}>
                  <ScrollView
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    contentContainerStyle={styles.attachmentsScroll}
                  >
                    {validAttachments.map((attachment, index) => (
                      <AttachmentCard key={index} attachment={attachment} />
                    ))}
                  </ScrollView>
                  <Text style={styles.attachmentCount}>
                    {validAttachments.length} attachment
                    {validAttachments.length > 1 ? 's' : ''}
                  </Text>
                </View>
              </>
            );
          })()}

          <View style={{ height: 30 }} />
        </ScrollView>

        {/* ── RSVP Confirmation Modal ── */}
        <RsvpConfirmModal
          visible={modalVisible}
          eventTitle={event.title}
          selectedStatus={pendingStatus}
          isSubmitting={isSubmitting}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </View>
    </GradientScreen>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  pageBg: { flex: 1, paddingHorizontal: 16, paddingTop: 13 },

  // ── Top bar ──
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  backBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    // backgroundColor: '#F3B11C22',
    // borderWidth: 1,
    borderColor: '#F3B11C55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  topBarTitle: {
    color: '#F3B11C',
    fontSize: 20,
    fontWeight: '800',
    flex: 1,
    textAlign: 'center',
    marginHorizontal: 8,
  },

  scrollContent: { paddingBottom: 20 },

  // ── States ──
  centerFull: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 12,
  },
  loadingText: { color: '#fff', fontSize: 15, marginTop: 8 },
  errorText: {
    color: '#FF6B6B',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  retryBtn: {
    backgroundColor: '#F3B11C',
    paddingHorizontal: 28,
    paddingVertical: 11,
    borderRadius: 22,
  },
  retryBtnText: { color: '#1a1228', fontSize: 14, fontWeight: '700' },

  // ── Hero card ──
  heroCard: {
    backgroundColor: '#3d2b6b',
    borderRadius: 20,
    flexDirection: 'row',
    overflow: 'hidden',
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff18',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
  },
  heroAccent: {
    width: 5,
    backgroundColor: '#F3B11C',
  },
  heroBody: { flex: 1, padding: 16 },
  heroImageBox: {
    width: 72,
    height: 72,
    backgroundColor: '#F3B11C22',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 14,
    overflow: 'hidden',
  },
  heroImage: { width: '100%', height: '100%', resizeMode: 'cover' },
  heroEmoji: { fontSize: 36 },
  heroCategoryRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  categoryPill: {
    backgroundColor: '#F3B11C33',
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderWidth: 1,
    borderColor: '#F3B11C55',
  },
  categoryText: {
    color: '#F3B11C',
    fontSize: 9,
    fontWeight: '800',
    letterSpacing: 0.8,
  },
  statusChip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    borderWidth: 1,
    borderRadius: 20,
    paddingHorizontal: 9,
    paddingVertical: 3,
  },
  statusChipText: { fontSize: 10, fontWeight: '700' },
  heroTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '900',
    marginBottom: 6,
    lineHeight: 26,
  },
  heroDescription: {
    color: '#ffffffaa',
    fontSize: 13,
    lineHeight: 19,
    marginBottom: 16,
  },

  // ── Stats ──
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#ffffff0d',
    borderRadius: 14,
    paddingVertical: 12,
  },
  statItem: { flex: 1, alignItems: 'center', gap: 3 },
  statValue: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  statLabel: { color: '#ffffff66', fontSize: 10, fontWeight: '600' },
  statDivider: { width: 1, backgroundColor: '#ffffff22' },

  // ── Section header ──
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 10,
  },
  sectionAccent: {
    width: 3,
    height: 16,
    backgroundColor: '#F3B11C',
    borderRadius: 2,
  },
  sectionTitle: {
    color: '#F3B11C',
    fontSize: 13,
    fontWeight: '800',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },

  // ── RSVP card ──
  rsvpCard: {
    backgroundColor: '#3d2b6b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff18',
  },
  rsvpPrompt: {
    color: '#ffffffaa',
    fontSize: 13,
    marginBottom: 12,
    fontWeight: '500',
  },
  rsvpRow: { flexDirection: 'row', gap: 8 },
  rsvpBtn: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 12,
    borderRadius: 12,
    backgroundColor: '#ffffff0f',
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  rsvpBtnText: { color: '#ffffff55', fontSize: 11, fontWeight: '600' },

  // ── Info card ──
  infoCard: {
    backgroundColor: '#3d2b6b',
    borderRadius: 16,
    paddingHorizontal: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff18',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  infoIconBox: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: '#F3B11C18',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoTextBlock: { flex: 1 },
  infoLabel: {
    color: '#ffffff55',
    fontSize: 11,
    fontWeight: '600',
    marginBottom: 2,
  },
  infoValue: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 19,
  },
  infoDivider: { height: 1, backgroundColor: '#ffffff0f', marginLeft: 50 },

  // ── Tags ──
  tagsCard: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    backgroundColor: '#3d2b6b',
    borderRadius: 16,
    padding: 16,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff18',
  },
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    backgroundColor: '#F3B11C18',
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 1,
    borderColor: '#F3B11C33',
  },
  tagText: { color: '#F3B11C', fontSize: 12, fontWeight: '600' },

  // ── Hero banner (when image available) ──
  heroBannerBox: {
    width: '100%',
    height: 160,
    borderRadius: 14,
    overflow: 'hidden',
    marginBottom: 14,
    position: 'relative',
  },
  heroBanner: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  heroBannerEmoji: {
    position: 'absolute',
    bottom: 10,
    left: 10,
    backgroundColor: '#00000066',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  heroEmojiBadge: { fontSize: 22 },

  // ── Attachments ──
  attachmentsCard: {
    backgroundColor: '#3d2b6b',
    borderRadius: 16,
    paddingVertical: 14,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ffffff18',
  },
  attachmentsScroll: {
    paddingHorizontal: 14,
    gap: 10,
  },
  attachmentItem: {
    width: 140,
    // height: 100,
    borderRadius: 12,
    overflow: 'hidden',
    position: 'relative',
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  attachmentImage: {
    width: '100%',
    height: '100%',
  },
  attachmentBadge: {
    position: 'absolute',
    bottom: 6,
    right: 6,
    backgroundColor: '#00000088',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 3,
    paddingHorizontal: 6,
    paddingVertical: 3,
  },
  attachmentBadgeText: {
    color: '#F3B11C',
    fontSize: 10,
    fontWeight: '700',
  },
  attachmentCount: {
    color: '#ffffff66',
    fontSize: 11,
    fontWeight: '500',
    paddingHorizontal: 16,
    paddingTop: 10,
  },

  // ── File card (PDF / DOCX) ──
  fileCardBg: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    backgroundColor: '#ffffff08',
  },
  fileIconBox: {
    width: 52,
    height: 52,
    borderRadius: 14,
    backgroundColor: '#ffffff12',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 8,
  },
  fileCardName: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
    lineHeight: 13,
    paddingHorizontal: 4,
  },
  fileCardSize: {
    color: '#ffffff55',
    fontSize: 9,
    marginTop: 3,
  },
  previewBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 5,
    paddingVertical: 7,
    marginHorizontal: 10,
    marginBottom: 8,
    borderRadius: 8,
    borderWidth: 1,
  },
  previewBtnText: {
    fontSize: 11,
    fontWeight: '700',
  },
});

export default EventDetailScreen;
