import React from 'react';
import { View, ActivityIndicator, StyleSheet, Text } from 'react-native';
import { COLORS } from '../constants/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';

const ImageLoader = () => {
  return (
    <View style={styles.loaderContainer}>
      {/* <MaterialCommunityIcon name="leaf" size={22} color={COLORS.primary} /> */}
      <ActivityIndicator size="small" color={COLORS.primary} style={{ marginLeft: 8 }} />
      <Text style={styles.loaderText}>Generating Image...</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  loaderContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(255,255,255,0.8)',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 6,
  },
  loaderText: {
    marginLeft: 8,
    fontSize: 12,
    color: COLORS.primary,
  },
});

export default ImageLoader;
