import { View, Text, StyleSheet, ActivityIndicator } from 'react-native';
import AppText from '../../../../components/AppText';
import AppTextInput from '../../../../components/AppTextInput';

const EventListFooter = ({ loadingMore }) => {
  if (!loadingMore) return null;

  return (
    <View style={styles.footerLoader}>
      <ActivityIndicator size="small" color="#F3B11C" />
      <AppText style={styles.footerText}>Loading more…</AppText>
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
