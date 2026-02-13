import React, { useEffect, useRef } from 'react';
import {
  Animated,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  View,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const { width } = Dimensions.get('window');

const InAppNotification = ({ visible, title, body, onHide, onPress }) => {
  const translateY = useRef(new Animated.Value(-150)).current;
  const opacity = useRef(new Animated.Value(0)).current;
  const insets = useSafeAreaInsets();

  useEffect(() => {
    if (visible) {
      Animated.parallel([
        Animated.spring(translateY, {
          toValue: 0,
          useNativeDriver: true,
          tension: 80,
          friction: 10,
        }),
        Animated.timing(opacity, {
          toValue: 1,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();

      const timer = setTimeout(() => {
        hideNotification();
      }, 4000);

      return () => clearTimeout(timer);
    }
  }, [visible]);

  const hideNotification = () => {
    Animated.parallel([
      Animated.timing(translateY, {
        toValue: -150,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.timing(opacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start(() => {
      onHide?.();
    });
  };

  if (!visible) return null;

  return (
    <Animated.View
      style={[
        styles.container,
        {
          top: Platform.OS === 'ios' ? insets.top + 5 : 35,
          transform: [{ translateY }],
          opacity,
        },
      ]}
    >
      <TouchableOpacity
        style={styles.content}
        activeOpacity={0.9}
        onPress={() => {
          hideNotification();
          onPress?.();
        }}
      >
        <View style={styles.header}>
          <View style={styles.appIconPlaceholder}>
            <Text style={styles.appIconText}>U</Text>
          </View>
          <Text style={styles.appName}>UGive</Text>
          <Text style={styles.time}>now</Text>
        </View>
        {title ? <Text style={styles.title} numberOfLines={1}>{title}</Text> : null}
        {body ? <Text style={styles.body} numberOfLines={2}>{body}</Text> : null}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 10,
    right: 10,
    zIndex: 99999,
  },
  content: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  appIconPlaceholder: {
    width: 20,
    height: 20,
    borderRadius: 5,
    backgroundColor: '#E5B865',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 6,
  },
  appIconText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  appName: {
    fontSize: 13,
    fontWeight: '600',
    color: '#8E8E93',
    flex: 1,
  },
  time: {
    fontSize: 12,
    color: '#8E8E93',
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  body: {
    fontSize: 14,
    color: '#3C3C43',
    lineHeight: 18,
  },
});

export default InAppNotification;
