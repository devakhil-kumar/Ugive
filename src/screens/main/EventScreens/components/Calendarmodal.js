import {
  View,
  Text,
  StyleSheet,
  Modal,
  ScrollView,
  Animated,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
} from 'react-native';
import AppText from '../../../../components/AppText';
import AppTextInput from '../../../../components/AppTextInput';
import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Calendar } from 'react-native-calendars';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome';

import {
  fetchCalendarEvents,
  setCalendarMonth,
  selectEventsByDate,
} from '../../../../fetures/calendarslice';
import CalendarEventMiniCard from './Calendareventminicard';

// ─── Helper ───────────────────────────────────────────────────────────────────

const toDateKey = date => {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
};

// ─── CalendarModal ─────────────────────────────────────────────────────────────

const CalendarModal = ({ visible, onClose }) => {
  const dispatch = useDispatch();
  const eventsByDate = useSelector(selectEventsByDate);
  const calLoading = useSelector(s => s.calendar?.loading ?? false);

  const now = new Date();

  // ── FIX 1: Always reset to current month when modal opens ──
  const [currentMonth, setCurrentMonth] = useState(now.getMonth() + 1);
  const [currentYear, setCurrentYear] = useState(now.getFullYear());
  const [selectedDate, setSelectedDate] = useState(null);

  useEffect(() => {
    if (visible) {
      // Reset to today's month every time the modal opens
      const today = new Date();
      setCurrentMonth(today.getMonth() + 1);
      setCurrentYear(today.getFullYear());
      setSelectedDate(null);
      dispatch(
        fetchCalendarEvents({
          month: today.getMonth() + 1,
          year: today.getFullYear(),
        }),
      );
    }
  }, [visible]);

  // ── Animated panel ────────────────────────────────────────────────────────
  const panelAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.spring(panelAnim, {
      toValue: selectedDate ? 1 : 0,
      useNativeDriver: false,
      tension: 60,
      friction: 10,
    }).start();
  }, [selectedDate, eventsByDate]);

  // ── Month change ──────────────────────────────────────────────────────────
  const onMonthChange = month => {
    setCurrentMonth(month.month);
    setCurrentYear(month.year);
    setSelectedDate(null);
    dispatch(fetchCalendarEvents({ month: month.month, year: month.year }));
    dispatch(setCalendarMonth({ month: month.month, year: month.year }));
  };

  // ── markedDates ───────────────────────────────────────────────────────────
  const markedDates = {};
  Object.keys(eventsByDate).forEach(dateStr => {
    markedDates[dateStr] = {
      selected: dateStr === selectedDate,
      selectedColor: '#F3B11C',
      selectedTextColor: '#1a1228',
    };
  });
  if (selectedDate && !markedDates[selectedDate]) {
    markedDates[selectedDate] = {
      selected: true,
      selectedColor: '#6955A5',
      selectedTextColor: '#fff',
    };
  }

  // ── Custom day cell ───────────────────────────────────────────────────────
  const renderDay = ({ date, state }) => {
    if (!date) return <View style={styles.dayCell} />;

    const dateStr = date.dateString;
    const dayEvents = eventsByDate[dateStr] ?? [];
    const hasEvents = dayEvents.length > 0;
    const isSelected = dateStr === selectedDate;
    const isToday = dateStr === toDateKey(new Date());
    const emoji = hasEvents ? dayEvents[0].emoji || '📅' : null;
    const extraCount = dayEvents.length > 1 ? dayEvents.length - 1 : 0;

    return (
      <TouchableOpacity
        onPress={() => setSelectedDate(dateStr)}
        style={[
          styles.dayCell,
          isSelected && styles.dayCellSelected,
          isToday && !isSelected && styles.dayCellToday,
        ]}
        activeOpacity={0.7}
      >
        {/* Date number */}
        <AppText
          style={[
            styles.dayNumber,
            state === 'disabled' && styles.dayNumberDisabled,
            isSelected && styles.dayNumberSelected,
            isToday && !isSelected && styles.dayNumberToday,
          ]}
        >
          {date.day}
        </AppText>

        {/* Emoji + overflow badge */}
        {hasEvents ? (
          <View style={styles.dayEmojiRow}>
            <AppText style={styles.dayEmoji}>{emoji}</AppText>
            {extraCount > 0 && (
              <View style={styles.extraBadge}>
                <AppText style={styles.extraBadgeText}>+{extraCount}</AppText>
              </View>
            )}
          </View>
        ) : (
          <View style={styles.dayEmojiPlaceholder} />
        )}

        {/* Gold dot */}
        {hasEvents && (
          <View style={[styles.dayDot, isSelected && styles.dayDotSelected]} />
        )}
      </TouchableOpacity>
    );
  };

  // ── Derived ───────────────────────────────────────────────────────────────
  const selectedEvents = selectedDate ? eventsByDate[selectedDate] ?? [] : [];

  const panelMaxHeight = panelAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [0, Math.min(selectedEvents.length * 130 + 60, 320)],
  });

  const panelOpacity = panelAnim.interpolate({
    inputRange: [0, 0.4, 1],
    outputRange: [0, 0, 1],
  });

  // ── Render ────────────────────────────────────────────────────────────────
  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {/* Tap-outside-to-close backdrop */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={onClose}
        />

        <View style={styles.modalSheet}>
          {/* Drag handle */}
          <View style={styles.sheetHandle} />

          {/* Header */}
          <View style={styles.modalHeader}>
            <View style={styles.modalTitleRow}>
              <FontAwesome name="calendar" size={20} color="#F3B11C" />
              <AppText style={styles.modalTitle}>Event Calendar</AppText>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
              <FontAwesome name="close" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>

          {/* Calendar widget */}
          <Calendar
            current={`${currentYear}-${String(currentMonth).padStart(
              2,
              '0',
            )}-01`}
            onMonthChange={onMonthChange}
            markedDates={markedDates}
            dayComponent={renderDay}
            theme={{
              backgroundColor: 'transparent',
              calendarBackground: 'transparent',
              textSectionTitleColor: '#F3B11C',
              arrowColor: '#F3B11C',
              monthTextColor: '#FFFFFF',
              indicatorColor: '#F3B11C',
              textMonthFontWeight: '800',
              textDayHeaderFontWeight: '700',
              textMonthFontSize: 17,
              textDayHeaderFontSize: 12,
            }}
            style={styles.calendarWidget}
          />

          {/* Loading indicator */}
          {calLoading && (
            <View style={styles.calLoader}>
              <ActivityIndicator size="small" color="#F3B11C" />
              <AppText style={styles.calLoaderText}>Loading events…</AppText>
            </View>
          )}

          {/* Expandable event panel */}
          <Animated.View
            style={[
              styles.eventPanel,
              { maxHeight: panelMaxHeight, opacity: panelOpacity },
            ]}
          >
            {selectedDate && (
              <>
                {/* Panel header */}
                <View style={styles.eventPanelHeader}>
                  {/* <Icon name="list-outline" size={14} color="#F3B11C" /> */}
                  <AppText style={styles.eventPanelTitle}>
                    {selectedEvents.length > 0
                      ? `${selectedEvents.length} Event${
                          selectedEvents.length > 1 ? 's' : ''
                        } on ${selectedDate}`
                      : `No events on ${selectedDate}`}
                  </AppText>
                </View>

                {selectedEvents.length === 0 ? (
                  <View style={styles.noEventRow}>
                    <Icon name="calendar-outline" size={20} color="#ffffff44" />
                    <AppText style={styles.noEventText}>
                      Nothing scheduled for this day
                    </AppText>
                  </View>
                ) : (
                  <ScrollView
                    showsVerticalScrollIndicator={false}
                    style={styles.eventPanelScroll}
                  >
                    {selectedEvents.map(evt => (
                      <CalendarEventMiniCard key={evt._id} item={evt} />
                    ))}
                  </ScrollView>
                )}
              </>
            )}
          </Animated.View>
        </View>
      </View>
    </Modal>
  );
};

// ─── Styles ───────────────────────────────────────────────────────────────────

const styles = StyleSheet.create({
  // ── Modal shell ──
  modalOverlay: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: '#00000066',
  },
  modalSheet: {
    backgroundColor: '#2d1f52',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingBottom: Platform.OS === 'ios' ? 36 : 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -6 },
    shadowOpacity: 0.35,
    shadowRadius: 12,
    elevation: 20,
  },
  sheetHandle: {
    alignSelf: 'center',
    width: 40,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#ffffff44',
    marginTop: 12,
    marginBottom: 4,
  },

  // ── Header ──
  modalHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 4,
    paddingBottom: 4,
  },
  modalTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  modalTitle: { color: '#FFFFFF', fontSize: 18, fontWeight: '800' },
  closeBtn: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#ffffff18',
    justifyContent: 'center',
    alignItems: 'center',
  },

  // ── Calendar ──
  calendarWidget: { marginHorizontal: 8 },
  calLoader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    gap: 8,
  },
  calLoaderText: { color: '#F3B11Caa', fontSize: 12 },

  // ── Custom day cell ──
  dayCell: {
    width: 44,
    height: 58,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 5,
    borderRadius: 10,
  },
  dayCellSelected: { backgroundColor: '#F3B11C', borderRadius: 10 },
  dayCellToday: { borderWidth: 1.5, borderColor: '#F3B11C', borderRadius: 10 },
  dayNumber: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    lineHeight: 18,
  },
  dayNumberDisabled: { color: '#ffffff30' },
  dayNumberSelected: { color: '#1a1228', fontWeight: '800' },
  dayNumberToday: { color: '#F3B11C', fontWeight: '800' },
  dayEmojiRow: { flexDirection: 'row', alignItems: 'center', marginTop: 2 },
  dayEmoji: { fontSize: 13, lineHeight: 16 },
  extraBadge: {
    backgroundColor: '#F3B11C',
    borderRadius: 6,
    paddingHorizontal: 3,
    paddingVertical: 1,
    marginLeft: 1,
  },
  extraBadgeText: { color: '#1a1228', fontSize: 7, fontWeight: '800' },
  dayEmojiPlaceholder: { height: 16, marginTop: 2 },
  dayDot: {
    width: 5,
    height: 5,
    borderRadius: 3,
    backgroundColor: '#F3B11C',
    marginTop: 3,
  },
  dayDotSelected: { backgroundColor: '#1a1228' },

  // ── Expandable event panel ──
  eventPanel: {
    overflow: 'hidden',
    marginHorizontal: 16,
    // marginTop: 4,
    borderTopWidth: 1,
    borderTopColor: '#F3B11C44',
  },
  eventPanelHeader: {
    paddingVertical: 10,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  eventPanelTitle: {
    color: '#F3B11C',
    fontWeight: '700',
    fontSize: 13,
    letterSpacing: 0.3,
  },
  eventPanelScroll: { flexGrow: 0, height: 100 },
  noEventRow: {
    flexDirection: 'row',
    // alignItems: 'center',
    // paddingVertical: 12,
    gap: 8,
  },
  noEventText: { color: '#ffffff66', fontSize: 14, lineHeight: 18 },
});

export default CalendarModal;
