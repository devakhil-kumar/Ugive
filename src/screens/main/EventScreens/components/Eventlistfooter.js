import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';

const EventListFooter = ({ loadingMore }) => {
  if (!loadingMore) return null;

  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color="#F3B11C" />
      <Text style={styles.footerText}>Loading more…</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerLoader: {
    paddingVertical: 8,
    alignItems: 'center',
    gap: 8,
  },
  footerText: {
    color: '#ffffff88',
    fontSize: 13,
    fontWeight: '500',
  },
});

export default EventListFooter;
