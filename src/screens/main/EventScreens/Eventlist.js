// ─── screens/events/EventList.js ─────────────────────────────────────────────
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import AppText from '../../../components/AppText';
import AppTextInput from '../../../components/AppTextInput';
import { useEffect, useCallback, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import Icon from '@react-native-vector-icons/ionicons';
import GradientScreen from '../../common/GradientScreen';
import { fetchEventList, resetEvents } from '../../../fetures/eventListSlice';
import EventCard from './components/Eventcard';
import EventListFooter from './components/Eventlistfooter';
import CalendarModal from './components/Calendarmodal';
import { seedRsvpStatuses } from '../../../fetures/rsvpslice';

const LIMIT = 10;

const EventList = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();

  const [refreshing, setRefreshing] = useState(false);
  const [calendarVisible, setCalendarVisible] = useState(false);

  const eventState = useSelector(state => state.eventList) ?? {};
  const events = eventState.events ?? [];
  const loading = eventState.loading ?? false;
  const loadingMore = eventState.loadingMore ?? false;
  const error = eventState.error ?? null;
  const hasMore = eventState.hasMore ?? false;
  const page = eventState.page ?? 1;

  const { user } = useSelector(state => state.profile);

  useEffect(() => {
    dispatch(fetchEventList({ page: 1, limit: LIMIT }));
  }, [dispatch]);

  useEffect(() => {
    if (events.length > 0) {
      dispatch(seedRsvpStatuses(events));
    }
  }, [events, dispatch]);

  const onRefresh = useCallback(async () => {
    setRefreshing(true);
    dispatch(resetEvents());
    await dispatch(fetchEventList({ page: 1, limit: LIMIT }));
    setRefreshing(false);
  }, [dispatch]);

  const onEndReached = useCallback(() => {
    if (!loadingMore && hasMore && !loading) {
      dispatch(fetchEventList({ page: page + 1, limit: LIMIT }));
    }
  }, [dispatch, loadingMore, hasMore, loading, page]);

  const handleEventPress = item => {
    // navigation.navigate('EventDetail', { eventId: item._id });
    console.log('Event pressed:', item._id);
  };

  return (
    <GradientScreen colors={['#6955A5']}>
      {/* Top Bar */}
      <View style={styles.pageBg}>
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
            <Icon name="calendar-outline" size={20} color="#F3B11C" />
          </TouchableOpacity>
        </View>

        {/* Loading */}
        {loading && !refreshing ? (
          <View style={styles.centerContainer}>
            <ActivityIndicator size="large" color="#F3B11C" />
            <AppText style={styles.loadingText}>Fetching events...</AppText>
          </View>
        ) : error ? (
          /* Error */
          <View style={styles.centerContainer}>
            <Icon name="warning-outline" size={40} color="#FF6B6B" />
            <AppText style={styles.errorText}>{error}</AppText>
            <TouchableOpacity
              style={styles.retryButton}
              onPress={() =>
                dispatch(fetchEventList({ page: 1, limit: LIMIT }))
              }
            >
              <AppText style={styles.retryButtonText}>Retry</AppText>
            </TouchableOpacity>
          </View>
        ) : events.length === 0 ? (
          /* Empty */
          <View style={styles.centerContainer}>
            <Icon name="calendar-clear-outline" size={50} color="#ffffff88" />
            <AppText style={styles.emptyText}>No events yet</AppText>
            <AppText style={styles.emptySubText}>
              Check back soon for upcoming events!
            </AppText>
          </View>
        ) : (
          /* List */
          <FlatList
            data={events}
            keyExtractor={item => item._id}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
            renderItem={({ item }) => (
              <EventCard item={item} onPress={handleEventPress} />
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
            ListFooterComponent={<EventListFooter loadingMore={loadingMore} />}
          />
        )}
        <CalendarModal
          visible={calendarVisible}
          onClose={() => setCalendarVisible(false)}
        />
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
    marginBottom: 24,
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
  emptyText: { color: 'white', fontSize: 20, fontWeight: '800' },
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
  listContent: { paddingBottom: 30 },
});

export default EventList;
