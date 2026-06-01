// ─── components/events/RsvpConfirmModal.js ───────────────────────────────────
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import AppText from '../../../../components/AppText';
import AppTextInput from '../../../../components/AppTextInput';
import Icon from '@react-native-vector-icons/ionicons';

// ─── Config for each status option ───────────────────────────────────────────

const STATUS_CONFIG = {
  going: {
    icon: 'checkmark-circle-outline',
    iconColor: '#4CAF50',
    label: 'Going',
    description: "You'll be marked as attending this event.",
    confirmBg: '#4CAF50',
    confirmLabel: "Yes, I'm Going!",
  },
  not_going: {
    icon: 'close-circle-outline',
    iconColor: '#FF6B6B',
    label: 'Not Going',
    description: "You'll be marked as not attending this event.",
    confirmBg: '#FF6B6B',
    confirmLabel: 'Yes, Not Going',
  },
  maybe: {
    icon: 'help-circle-outline',
    iconColor: '#F3B11C',
    label: 'Maybe',
    description: "You'll be marked as maybe attending this event.",
    confirmBg: '#F3B11C',
    confirmLabel: 'Yes, Maybe',
  },
};

// ─── Component ────────────────────────────────────────────────────────────────

const RsvpConfirmModal = ({
  visible,
  eventTitle,
  selectedStatus, // 'going' | 'not_going' | 'maybe'
  isSubmitting,
  onConfirm, // () => void
  onCancel, // () => void
}) => {
  const config = STATUS_CONFIG[selectedStatus] ?? STATUS_CONFIG.going;

  return (
    <Modal
      visible={visible}
      animationType="fade"
      transparent
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.card}>
          {/* Icon */}
          <View
            style={[
              styles.iconCircle,
              { backgroundColor: config.iconColor + '22' },
            ]}
          >
            <Icon name={config.icon} size={44} color={config.iconColor} />
          </View>

          {/* Title */}
          <AppText style={styles.title}>
            Mark as{' '}
            <AppText style={[styles.statusLabel, { color: config.iconColor }]}>
              {config.label}
            </AppText>
            ?
          </AppText>

          {/* Event name */}
          <AppText style={styles.eventName} numberOfLines={2}>
            {eventTitle}
          </AppText>

          {/* Description */}
          <AppText style={styles.description}>{config.description}</AppText>

          {/* Divider */}
          <View style={styles.divider} />

          {/* Action buttons */}
          <View style={styles.actionRow}>
            {/* Cancel */}
            <TouchableOpacity
              style={styles.cancelBtn}
              onPress={onCancel}
              disabled={isSubmitting}
              activeOpacity={0.7}
            >
              <Icon name="close" size={16} color="#ffffffaa" />
              <AppText style={styles.cancelBtnText}>Cancel</AppText>
            </TouchableOpacity>

            {/* Confirm */}
            <TouchableOpacity
              style={[styles.confirmBtn, { backgroundColor: config.confirmBg }]}
              onPress={onConfirm}
              disabled={isSubmitting}
              activeOpacity={0.8}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#fff" />
              ) : (
                <>
                  <Icon name="checkmark" size={16} color="#fff" />
                  <AppText style={styles.confirmBtnText}>
                    {config.confirmLabel}
                  </AppText>
                </>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: '#000000aa',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  card: {
    backgroundColor: '#2d1f52',
    borderRadius: 24,
    padding: 24,
    width: '100%',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ffffff18',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 20,
  },

  // ── Icon ──
  iconCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },

  // ── Text ──
  title: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
    marginBottom: 8,
  },
  statusLabel: {
    fontWeight: '900',
  },
  eventName: {
    color: '#ffffffcc',
    fontSize: 14,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
  },
  description: {
    color: '#ffffff66',
    fontSize: 13,
    textAlign: 'center',
    lineHeight: 18,
  },

  // ── Divider ──
  divider: {
    width: '100%',
    height: 1,
    backgroundColor: '#ffffff18',
    marginVertical: 20,
  },

  // ── Buttons ──
  actionRow: {
    flexDirection: 'row',
    gap: 12,
    width: '100%',
  },
  cancelBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
    backgroundColor: '#ffffff18',
    borderWidth: 1,
    borderColor: '#ffffff22',
  },
  cancelBtnText: {
    color: '#ffffffaa',
    fontSize: 14,
    fontWeight: '700',
  },
  confirmBtn: {
    flex: 1.4,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 6,
    paddingVertical: 14,
    borderRadius: 14,
  },
  confirmBtnText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '800',
  },
});

export default RsvpConfirmModal;
