import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';

const { width, height } = Dimensions.get('window');

const GradientScreen = ({
  children,
  colors,
  locations
}) => {

  const defaultColors = [
    '#E9B243',
    '#B5D1EB',
    '#B5D1EB',
    '#6D5B98'
  ];

  const defaultLocations = [0.03, 0.28, 0.50, 0.95];



  let finalColors = defaultColors;
  let finalLocations = defaultLocations;

  if (colors && colors.length === 1) {
    finalColors = [colors[0], colors[0]];
    finalLocations = [0, 1];
  }
  else if (colors && colors.length > 1) {
    finalColors = colors;
    finalLocations = locations || colors.map((_, i) => i / (colors.length - 1));
  }

  return (
    <LinearGradient
      colors={finalColors}
      locations={finalLocations}
      start={{ x: 0, y: 0 }}
      end={{ x: 0, y: 1 }}
      style={styles.gradient}
    >
      <SafeAreaView edges={['top']} style={{ flex: 1 }}>
        {children}
      </SafeAreaView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
    width,
    height,
  },
});

export default GradientScreen;
