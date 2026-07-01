import {
  View,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  ScrollView,
  Modal,
} from 'react-native';
import AppText from '../../../components/AppText';
import { useEffect, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@react-native-vector-icons/ionicons';
import FontAwesome from '@react-native-vector-icons/fontawesome';
import GradientScreen from '../../common/GradientScreen';
import { fetchEventList, resetEvents } from '../../../fetures/eventListSlice';
import EventCard from './components/Eventcard';
import EventListFooter from './components/Eventlistfooter';
import CalendarModal from './components/Calendarmodal';
import { seedRsvpStatuses } from '../../../fetures/rsvpslice';

const LIMIT = 10;

const CATEGORIES = [
  'All',
  'Creative pop-up',
  'Faith',
  'Red Frogs',
  'Social',
  'Off-campus',
  'Blokes',
  'Gals',
  'Sports',
  'Uni event',
  'Academic',
  'Other',
];

const EventList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');

  // RSVP Modal States
  const [rsvpModalVisible, setRsvpModalVisible] = useState(false);
  const [selectedRsvpLists, setSelectedRsvpLists] = useState(null);
  const [activeRsvpTab, setActiveRsvpTab] = useState('going'); // 'going' | 'maybe' | 'notGoing'

  const eventState = useSelector(state => state.eventList) ?? {};
  const events = eventState.events ?? [];
  const loading = eventState.loading ?? false;
  const loadingMore = eventState.loadingMore ?? false;
  const error = eventState.error ?? null;
  const hasMore = eventState.hasMore ?? false;
  const page = eventState.page ?? 1;

  const categoryParam =
    selectedCategory === 'All' ? undefined : selectedCategory;

  useEffect(() => {
    dispatch(
      fetchEventList({ page: 1, limit: LIMIT, category: categoryParam }),
    );
  }, [dispatch, categoryParam]);

  useEffect(() => {
    if (events.length > 0) {
      dispatch(seedRsvpStatuses(events));
    }
  }, [events, dispatch]);

  const handleCategorySelect = useCallback(
    async cat => {
      if (cat === selectedCategory) return;
      setSelectedCategory(cat);
      dispatch(resetEvents());
      const param = cat === 'All' ? undefined : cat;
      dispatch(fetchEventList({ page: 1, limit: LIMIT, category: param }));
    },
    [dispatch, selectedCategory],
  );

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(resetEvents());
    await dispatch(
      fetchEventList({ page: 1, limit: LIMIT, category: categoryParam }),
    );
    setRefreshing(false);
  }, [dispatch, categoryParam]);

  const onEndReached = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      dispatch(
        fetchEventList({
          page: page + 1,
          limit: LIMIT,
          category: categoryParam,
        }),
      );
    }
  }, [dispatch, loadingMore, hasMore, loading, page, categoryParam]);

  const handleEventPress = item => {
    navigation.navigate('EventDetail', { eventId: item._id });
  };

  // Triggered when someone taps on the RSVP counts in EventCard
  const handleCountPress = rsvpLists => {
    setSelectedRsvpLists(rsvpLists);
    setActiveRsvpTab('going'); // Default tab when opening
    setRsvpModalVisible(true);
  };

  // Get data according to active modal tab
  const getModalListData = () => {
    if (!selectedRsvpLists) return [];
    if (activeRsvpTab === 'going') return selectedRsvpLists.going || [];
    if (activeRsvpTab === 'maybe') return selectedRsvpLists.maybe || [];
    if (activeRsvpTab === 'notGoing') return selectedRsvpLists.notGoing || [];
    return [];
  };

  return (
    <GradientScreen colors={['#6955A5']}>
      <View style={styles.pageBg}>
        {/* Top Bar */}
        <View style={styles.topBar}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              source={require('../../../assets/backIcon.png')}
              style={styles.backIcon}
            />
          </TouchableOpacity>

          <AppText style={styles.topBarTitle}>Events</AppText>

          <TouchableOpacity
            style={styles.calendarBtn}
            onPress={() => setCalendarVisible(true)}
            activeOpacity={0.75}
          >
            <FontAwesome name="calendar" size={20} color="#F3B11C" />
          </TouchableOpacity>
        </View>

        {/* Category Filter Bar */}
        <View style={styles.categoryContainer}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryRow}
          >
            {CATEGORIES.map(cat => {
              const isActive = selectedCategory === cat;
              return (
                <TouchableOpacity
                  key={cat}
                  style={[
                    styles.categoryPill,
                    isActive && styles.categoryPillActive,
                  ]}
                  onPress={() => handleCategorySelect(cat)}
                  activeOpacity={0.75}
                >
                  <AppText
                    style={[
                      styles.categoryPillText,
                      isActive && styles.categoryPillTextActive,
                    ]}
                  >
                    {cat}
                  </AppText>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        </View>

        {/* Loading / Error / List */}
        {loading && !refreshing ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#F3B11C" />
            <AppText style={styles.loadingText}>Fetching events...</AppText>
          </View>
        ) : error ? (
          <View style={styles.centerContainer}>
            <Icon name="warning-outline" size={40} color="#FF6B6B" />
            <AppText style={styles.errorText}>{error}</AppText>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() =>
                dispatch(
                  fetchEventList({
                    page: 1,
                    limit: LIMIT,
                    category: categoryParam,
                  }),
                )
              }
            >
              <AppText style={styles.retryButtonText}>Retry</AppText>
            </TouchableOpacity>
          </View>
        ) : (
          <FlatList
            data={events}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (
              <EventCard
                item={item}
                onPress={handleEventPress}
                onCountPress={handleCountPress} // Dynamic callback logic passed here
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="#F3B11C"
                colors={['#F3B11C']}
              />
            }
            onEndReached={onEndReached}
            onEndReachedThreshold={0.4}
            ListFooterComponent={
              events.length > 0 ? (
                <EventListFooter loadingMore={loadingMore} />
              ) : null
            }
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <Icon
                  name="calendar-clear-outline"
                  size={50}
                  color="#ffffff88"
                />
                <AppText style={styles.emptyText}>
                  {selectedCategory === 'All'
                    ? 'No events yet'
                    : `No "${selectedCategory}" events`}
                </AppText>
                <AppText style={styles.emptySubText}>
                  {selectedCategory === 'All'
                    ? 'Check back soon for upcoming events!'
                    : 'Try a different category or check back later.'}
                </AppText>
              </View>
            }
            contentContainerStyle={styles.listContent}
            showsVerticalScrollIndicator={false}
          />
        )}

        {/* Calendar Modal */}
        <CalendarModal
          visible={calendarVisible}
          onClose={() => setCalendarVisible(false)}
        />
        <Modal
          visible={rsvpModalVisible}
          transparent
          animationType="slide"
          onRequestClose={() => setRsvpModalVisible(false)}
        >
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Drag Indicator Bar */}
              <View style={styles.dragIndicator} />

              {/* Close Button Header */}
              <View style={styles.modalHeader}>
                <AppText style={styles.modalHeaderTitle}>Responses</AppText>
                <TouchableOpacity
                  onPress={() => setRsvpModalVisible(false)}
                  style={styles.modalCloseBtn}
                >
                  <Icon name="close" size={22} color="#222" />
                </TouchableOpacity>
              </View>

              {/* Internal Modal Tabs */}
              <View style={styles.modalTabsRow}>
                {[
                  {
                    key: 'going',
                    label: `Going (${selectedRsvpLists?.going?.length || 0})`,
                  },
                  {
                    key: 'maybe',
                    label: `Maybe (${selectedRsvpLists?.maybe?.length || 0})`,
                  },
                  {
                    key: 'notGoing',
                    label: `Not Going (${
                      selectedRsvpLists?.notGoing?.length || 0
                    })`,
                  },
                ].map(tab => {
                  const isTabActive = activeRsvpTab === tab.key;
                  return (
                    <TouchableOpacity
                      key={tab.key}
                      style={[
                        styles.modalTab,
                        isTabActive && styles.modalTabActive,
                      ]}
                      onPress={() => setActiveRsvpTab(tab.key)}
                    >
                      <AppText
                        style={[
                          styles.modalTabText,
                          isTabActive && styles.modalTabTextActive,
                        ]}
                      >
                        {tab.label}
                      </AppText>
                    </TouchableOpacity>
                  );
                })}
              </View>

              {/* Student RSVP Status List */}
              <FlatList
                data={getModalListData()}
                keyExtractor={(item, index) =>
                  item.studentId || index.toString()
                }
                renderItem={({ item }) => (
                  <View style={styles.studentItemRow}>
                    {item.profileImage ? (
                      <Image
                        source={{ uri: item.profileImage }}
                        style={styles.studentAvatar}
                      />
                    ) : (
                      <View
                        style={[
                          styles.studentAvatar,
                          styles.studentAvatarPlaceholder,
                        ]}
                      >
                        <AppText style={styles.placeholderLetter}>
                          {(item.name || '?')[0].toUpperCase()}
                        </AppText>
                      </View>
                    )}
                    <AppText style={styles.studentName} numberOfLines={1}>
                      {item.name || 'Anonymous Student'}
                    </AppText>
                  </View>
                )}
                ListEmptyComponent={
                  <View style={styles.modalEmptyContainer}>
                    <Icon name="people-outline" size={40} color="#bbb" />
                    <AppText style={styles.modalEmptyText}>
                      No students in this list
                    </AppText>
                  </View>
                }
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.modalListContent}
              />
            </View>
          </View>
        </Modal>
      </View>
    </GradientScreen>
  );
};

const styles = StyleSheet.create({
  pageBg: { paddingHorizontal: 16, flex: 1, paddingTop: 13 },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  backIcon: { width: 25, height: 25 },
  topBarTitle: {
    fontWeight: '800',
    fontSize: 24,
    color: '#F3B11C',
    textAlign: 'center',
  },
  calendarBtn: {
    width: 38,
    height: 38,
    borderRadius: 12,
    backgroundColor: '#F3B11C22',
    borderWidth: 1,
    borderColor: '#F3B11C55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryContainer: {
    marginBottom: 12,
  },
  categoryRow: {
    flexDirection: 'row',
    gap: 8,
    paddingRight: 8,
    paddingVertical: 4,
  },
  categoryPill: {
    paddingHorizontal: 14,
    borderRadius: 20,
    backgroundColor: '#ffffff14',
    borderWidth: 1,
    borderColor: '#ffffff25',
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoryPillActive: {
    backgroundColor: '#F3B11C',
    borderColor: '#F3B11C',
  },
  categoryPillText: {
    color: '#ffffffbb',
    fontSize: 12,
    fontWeight: '600',
  },
  categoryPillTextActive: {
    color: '#FFFFFF',
    fontWeight: '800',
  },
  centerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    gap: 10,
  },
  loadingText: { color: 'white', fontSize: 16, marginTop: 10 },
  errorText: {
    color: '#FF6B6B',
    fontSize: 15,
    textAlign: 'center',
    marginHorizontal: 30,
  },
  emptyContainer: {
    alignItems: 'center',
    gap: 8,
    marginTop: 40,
  },
  emptyText: {
    color: 'white',
    fontSize: 20,
    fontWeight: '800',
    textAlign: 'center',
  },
  emptySubText: {
    color: '#ffffff88',
    fontSize: 14,
    textAlign: 'center',
    marginHorizontal: 40,
  },
  retryButton: {
    backgroundColor: '#F3B11C',
    paddingHorizontal: 30,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 8,
  },
  retryButtonText: { color: '#6955A5', fontSize: 15, fontWeight: '700' },
  listContent: {
    paddingBottom: 30,
    paddingTop: 8,
  },

  // ── RSVP Modal Styles ──────────────────────────────────────────────────
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    maxHeight: '75%',
    minHeight: '45%',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  dragIndicator: {
    width: 40,
    height: 5,
    backgroundColor: '#E0E0E0',
    borderRadius: 3,
    alignSelf: 'center',
    marginTop: 10,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 20,
  },
  modalHeaderTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: '#222',
  },
  modalCloseBtn: {
    backgroundColor: '#F5F5F5',
    padding: 6,
    borderRadius: 20,
  },
  modalTabsRow: {
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    gap: 4,
    marginBottom: 16,
  },
  modalTab: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 8,
  },
  modalTabActive: {
    backgroundColor: '#6955A5',
  },
  modalTabText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#666',
  },
  modalTabTextActive: {
    color: '#FFFFFF',
  },
  studentItemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
    gap: 12,
  },
  studentAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  studentAvatarPlaceholder: {
    backgroundColor: '#A394D8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderLetter: {
    color: '#FFF',
    fontWeight: '800',
    fontSize: 16,
  },
  studentName: {
    fontSize: 15,
    fontWeight: '700',
    color: '#222',
    flex: 1,
  },
  modalListContent: {
    paddingBottom: 20,
  },
  modalEmptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
    gap: 8,
  },
  modalEmptyText: {
    color: '#999',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default EventList;
