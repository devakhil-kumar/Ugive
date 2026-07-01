import React, { useEffect, useCallback, useState } from 'react';
import {
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
} from 'react-native';
import AppText from '../../../components/AppText';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaderboard } from '../../../fetures/leaderBoardSlice';
import GradientScreen from '../../common/GradientScreen';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const FILTER_PERIODS = [
  { key: 'week', label: 'This Week' },
  { key: 'semester', label: 'Semester' },
  { key: 'all', label: 'All Time' },
];

// Helper to format dates beautifully (e.g., "Jul 1, 2026")
const formatDate = dateString => {
  if (!dateString) return '';
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });
};

const getDisplayName = (fullName = '') => {
  const parts = fullName.trim().split(' ').filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0];
  const first = parts[0][0];
  const last = parts[parts.length - 1][0];
  return (first + last).toUpperCase();
};

const Avatar = ({ name, image, size = 44, fontSize = 18 }) => {
  const letter = (name || '?')[0].toUpperCase();
  const COLORS = [
    '#E57373',
    '#F06292',
    '#BA68C8',
    '#9575CD',
    '#7986CB',
    '#64B5F6',
    '#4DD0E1',
    '#4DB6AC',
    '#81C784',
    '#FFD54F',
    '#FF8A65',
    '#A1887F',
  ];
  const color = COLORS[letter.charCodeAt(0) % COLORS.length];

  return image ? (
    <Image
      source={{ uri: image }}
      style={{ width: size, height: size, borderRadius: size / 2 }}
    />
  ) : (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: color,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <AppText style={{ color: '#fff', fontWeight: '800', fontSize }}>
        {letter}
      </AppText>
    </View>
  );
};

const BADGE = {
  1: {
    emoji: '🥇',
    label: '1st',
    color: '#F5C842',
    bg: '#FFF8DC',
    size: 72,
    textSize: 18,
  },
  2: {
    emoji: '🥈',
    label: '2nd',
    color: '#A8A8A8',
    bg: '#F5F5F5',
    size: 60,
    textSize: 16,
  },
  3: {
    emoji: '🥉',
    label: '3rd',
    color: '#CD7F32',
    bg: '#FFF0E6',
    size: 56,
    textSize: 15,
  },
};

const TopThreeCard = ({ item, rank }) => {
  const badge = BADGE[rank];
  return (
    <View
      style={[
        styles.podiumCard,
        rank === 1 && styles.podiumCardFirst,
        { borderColor: badge.color },
      ]}
    >
      <AppText style={styles.badgeEmoji}>{badge.emoji}</AppText>
      <Avatar
        name={item.name}
        image={item.profileImage}
        size={badge.size}
        fontSize={badge.size / 3}
      />
      <AppText
        style={[styles.podiumName, { fontSize: badge.textSize }]}
        numberOfLines={1}
      >
        {getDisplayName(item.name)}
      </AppText>
      <View style={[styles.podiumChip, { backgroundColor: badge.bg }]}>
        <AppText style={[styles.podiumCards, { color: badge.color }]}>
          {item.cardsSent} cards
        </AppText>
      </View>
    </View>
  );
};

const RankRow = ({ item }) => (
  <View style={[styles.rankRow, item.isCurrentUser && styles.rankRowSelf]}>
    <View style={styles.rankNumBox}>
      <AppText style={styles.rankNum}>#{item.rank}</AppText>
    </View>
    <Avatar
      name={item.name}
      image={item.profileImage}
      size={40}
      fontSize={16}
    />
    <AppText style={styles.rankName} numberOfLines={1}>
      {getDisplayName(item.name)}
      {item.isCurrentUser && <AppText style={styles.youBadge}> (You)</AppText>}
    </AppText>
    <View style={styles.rankCardsBadge}>
      <AppText style={styles.rankCardsText}>{item.cardsSent}</AppText>
      <AppText style={styles.rankCardsLabel}> Cards</AppText>
    </View>
  </View>
);

const MyResultCard = ({ myResult }) => {
  if (!myResult) return null;
  return (
    <View style={styles.myResultCard}>
      <View style={styles.myResultRankBox}>
        <AppText style={styles.myResultRankLabel}>Your Rank</AppText>
        <AppText style={styles.myResultRank}>#{myResult.rank}</AppText>
      </View>
      <View style={styles.myResultDivider} />
      <Avatar
        name={myResult.name}
        image={myResult.profileImage}
        size={46}
        fontSize={18}
      />
      <View style={{ marginLeft: 10, flex: 1 }}>
        <AppText style={styles.myResultName} numberOfLines={1}>
          {getDisplayName(myResult.name)}
        </AppText>
        <AppText style={styles.myResultSub}>
          {myResult.cardsSent} card{myResult.cardsSent !== 1 ? 's' : ''} sent
        </AppText>
      </View>
      <AppText style={styles.myResultTrophy}>🏆</AppText>
    </View>
  );
};

const Leaderboard = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const insets = useSafeAreaInsets();

  const [selectedPeriod, setSelectedPeriod] = useState('all');

  const leaderboardState = useSelector(state => state.leaderboard) ?? {};
  const {
    data = [],
    myResult,
    college,
    university,
    totalEntries,
    totalPages,
    currentPage,
    loading,
    loadingMore,
    error,
    startDate,
    endDate,
  } = leaderboardState;

  console.log(startDate, endDate, 'start and end date in leaderboard');

  useEffect(() => {
    dispatch(fetchLeaderboard({ page: 1, period: selectedPeriod }));
  }, [dispatch, selectedPeriod]);

  const top3 = data.filter(s => s.rank <= 3).sort((a, b) => a.rank - b.rank);
  const rest = data.filter(s => s.rank > 3);

  const handleLoadMore = useCallback(() => {
    if (loadingMore || currentPage >= totalPages) return;
    dispatch(
      fetchLeaderboard({ page: currentPage + 1, period: selectedPeriod }),
    );
  }, [loadingMore, currentPage, totalPages, selectedPeriod, dispatch]);

  const handleRefresh = useCallback(() => {
    dispatch(fetchLeaderboard({ page: 1, period: selectedPeriod }));
  }, [selectedPeriod, dispatch]);

  const ListHeader = () => (
    <View style={{ backgroundColor: '#fff' }}>
      {college && (
        <View style={styles.collegeBox}>
          <AppText style={styles.collegeName}>{college.name}</AppText>
          {university && (
            <AppText style={styles.universityName}>{university.name}</AppText>
          )}
          <AppText style={styles.totalEntries}>
            {totalEntries} participants
          </AppText>
        </View>
      )}

      {top3.length > 0 && (
        <View style={styles.podiumRow}>
          {top3[1] && <TopThreeCard item={top3[1]} rank={2} />}
          {top3[0] && <TopThreeCard item={top3[0]} rank={1} />}
          {top3[2] && <TopThreeCard item={top3[2]} rank={3} />}
        </View>
      )}

      {rest.length > 0 && (
        <AppText style={styles.restLabel}>All Rankings</AppText>
      )}
    </View>
  );

  const ListFooter = () => {
    if (loadingMore) {
      return (
        <ActivityIndicator
          color="#6D56A5"
          size="small"
          style={{ marginVertical: 16 }}
        />
      );
    }
    if (currentPage >= totalPages && data.length > 0) {
      return (
        <AppText style={styles.endText}>
          You've seen all {totalEntries} participants
        </AppText>
      );
    }
    return null;
  };

  return (
    <GradientScreen colors={['#E9B243', '#B5D1EB']}>
      <View style={[styles.container, { paddingBottom: insets.bottom }]}>
        {/* REVERTED HEADER BACK TO ORIGINAL CLEAN LOOK */}
        <View style={styles.headerRow}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backBtn}
          >
            <Image
              source={require('../../../assets/backIcon.png')}
              style={styles.backIconStyle}
            />
          </TouchableOpacity>
          <AppText style={styles.pageTitle}>Leaderboard 🏆</AppText>
        </View>

        {/* TIMEFRAME FILTER TABS */}
        <View style={styles.tabBarWrapper}>
          {FILTER_PERIODS.map(period => {
            const isTabActive = selectedPeriod === period.key;
            return (
              <TouchableOpacity
                key={period.key}
                style={[
                  styles.filterTabButton,
                  isTabActive && styles.filterTabButtonActive,
                ]}
                onPress={() => setSelectedPeriod(period.key)}
                activeOpacity={0.8}
              >
                <AppText
                  style={[
                    styles.filterTabText,
                    isTabActive && styles.filterTabTextActive,
                  ]}
                >
                  {period.label}
                </AppText>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* PROPER DESIGNED DATE CHIP ROW BELOW TABS */}
        {!loading &&
          (selectedPeriod === 'week' || selectedPeriod === 'semester') &&
          startDate &&
          endDate && (
            <View style={styles.dateContainer}>
              <Image
                source={require('../../../assets/backIcon.png')} // Agar koi calendar/clock icon ho toh badal lena
                style={styles.calendarIcon}
                tintColor="#FFF"
              />
              <AppText style={styles.dateText}>
                {formatDate(startDate)} – {formatDate(endDate)}
              </AppText>
            </View>
          )}

        {/* MAIN LIST CARD CONTAINER */}
        <View style={styles.contentCard}>
          {loading && data.length === 0 ? (
            <View style={styles.centered}>
              <ActivityIndicator size="large" color="#6D56A5" />
              <AppText style={styles.loadingText}>Loading rankings...</AppText>
            </View>
          ) : error ? (
            <View style={styles.centered}>
              <AppText style={styles.errorText}>{error}</AppText>
              <TouchableOpacity style={styles.retryBtn} onPress={handleRefresh}>
                <AppText style={styles.retryText}>Retry</AppText>
              </TouchableOpacity>
            </View>
          ) : (
            <FlatList
              data={rest}
              keyExtractor={item => item.studentId || item._id}
              renderItem={({ item }) => <RankRow item={item} />}
              ListHeaderComponent={<ListHeader />}
              ListFooterComponent={<ListFooter />}
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.4}
              onRefresh={handleRefresh}
              refreshing={loading}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={{ paddingBottom: 20 }}
            />
          )}
        </View>

        <MyResultCard myResult={myResult} />
      </View>
    </GradientScreen>
  );
};

export default Leaderboard;

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16, paddingTop: 10 },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 28,
    width: '85%',
  },
  backIconStyle: { width: 30, height: 30 },
  backBtn: { marginBottom: 6 },
  pageTitle: {
    color: '#fff',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 14,
    letterSpacing: 0.3,
  },

  tabBarWrapper: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 14,
    padding: 4,
    marginBottom: 14,
    gap: 4,
  },
  filterTabButton: {
    flex: 1,
    paddingVertical: 10,
    alignItems: 'center',
    borderRadius: 10,
  },
  filterTabButtonActive: {
    backgroundColor: '#FFFFFF',
  },
  filterTabText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFFBA',
  },
  filterTabTextActive: {
    color: '#6D56A5',
    fontWeight: '800',
  },

  // New Styled Date Container
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    alignSelf: 'center',
    paddingHorizontal: 16,
    paddingVertical: 6,
    borderRadius: 20,
    marginBottom: 12,
    gap: 6,
    borderWidth: 0.5,
    borderColor: 'rgba(255, 255, 255, 0.25)',
  },
  calendarIcon: {
    width: 14,
    height: 14,
    opacity: 0.9,
    transform: [{ rotate: '180deg' }], // Sirf example ke liye back icon ko twist kiya hai agar koi specific calendar icon na ho toh
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 0.2,
  },

  contentCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 20,
    padding: 14,
    marginBottom: 8,
  },
  centered: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  loadingText: { marginTop: 12, color: '#999', fontSize: 14 },
  errorText: { color: 'red', textAlign: 'center', marginBottom: 14 },
  retryBtn: {
    backgroundColor: '#6D56A5',
    paddingHorizontal: 24,
    paddingVertical: 10,
    borderRadius: 10,
  },
  retryText: { color: '#fff', fontWeight: '700' },
  collegeBox: {
    alignItems: 'center',
    marginBottom: 18,
    paddingBottom: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  collegeName: { fontSize: 18, fontWeight: '800', color: '#222' },
  universityName: {
    fontSize: 13,
    color: '#6D56A5',
    marginTop: 3,
    fontWeight: '600',
  },
  totalEntries: { fontSize: 11, color: '#999', marginTop: 4 },
  podiumRow: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    gap: 10,
    marginBottom: 10,
    paddingBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  podiumCard: {
    alignItems: 'center',
    backgroundColor: '#FAFAFA',
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderWidth: 2,
    width: (width - 80) / 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.07,
    shadowRadius: 6,
    elevation: 3,
  },
  podiumCardFirst: {
    paddingVertical: 20,
    shadowOpacity: 0.14,
    elevation: 6,
    transform: [{ translateY: -12 }],
  },
  badgeEmoji: { fontSize: 26, marginBottom: 8 },
  podiumName: {
    fontWeight: '800',
    color: '#222',
    marginTop: 8,
    textAlign: 'center',
  },
  podiumChip: {
    marginTop: 6,
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  podiumCards: { fontSize: 11, fontWeight: '700' },
  restLabel: {
    fontSize: 13,
    fontWeight: '700',
    color: '#999',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 10,
  },
  rankRow: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F8F8F8',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 8,
    gap: 10,
    borderWidth: 1.5,
    borderColor: '#EFEFEF',
  },
  rankRowSelf: { backgroundColor: '#F2EDFF', borderColor: '#6D56A5' },
  rankNumBox: { width: 36, alignItems: 'center' },
  rankNum: { fontSize: 13, fontWeight: '800', color: '#6D56A5' },
  rankName: { flex: 1, fontSize: 14, fontWeight: '700', color: '#222' },
  youBadge: { fontSize: 12, color: '#6D56A5', fontWeight: '600' },
  rankCardsBadge: {
    flexDirection: 'row',
    alignItems: 'baseline',
    backgroundColor: '#EEE9FF',
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 20,
  },
  rankCardsText: { fontSize: 12, fontWeight: '800', color: '#6D56A5' },
  rankCardsLabel: { fontSize: 10, color: '#6D56A5', fontWeight: '600' },
  endText: {
    textAlign: 'center',
    color: '#BBB',
    fontSize: 12,
    marginVertical: 16,
  },
  myResultCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6D56A5',
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 14,
    marginBottom: 12,
    shadowColor: '#6D56A5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 10,
    elevation: 8,
    gap: 10,
  },
  myResultRankBox: { alignItems: 'center', minWidth: 48 },
  myResultRankLabel: {
    fontSize: 10,
    color: 'rgba(255,255,255,0.7)',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  myResultRank: { fontSize: 22, fontWeight: '900', color: '#F5C842' },
  myResultDivider: {
    width: 1,
    height: 40,
    backgroundColor: 'rgba(255,255,255,0.25)',
  },
  myResultName: { color: '#fff', fontSize: 15, fontWeight: '800' },
  myResultSub: { color: 'rgba(255,255,255,0.7)', fontSize: 12, marginTop: 2 },
  myResultTrophy: { fontSize: 28 },
});
