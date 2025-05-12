import React, { useEffect, useRef } from 'react';
import { View, Animated, Dimensions, StyleSheet } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const LeafLoadingOverlay = () => {
  const leafCount = 6;
  const animations = useRef([...Array(leafCount)].map(() => new Animated.Value(0))).current;

  useEffect(() => {
    const animateLeaf = (index) => {
      Animated.loop(
        Animated.sequence([
          Animated.timing(animations[index], {
            toValue: -20,
            duration: 400,
            useNativeDriver: true,
          }),
          Animated.timing(animations[index], {
            toValue: 0,
            duration: 400,
            useNativeDriver: true,
          }),
        ])
      ).start();
    };

    animations.forEach((_, index) => {
      setTimeout(() => animateLeaf(index), index * 150); // Staggered start
    });
  }, []);

  return (
    <View style={styles.overlay}>
      <View style={styles.container}>
        {animations.map((anim, index) => (
          <Animated.View key={index} style={{ transform: [{ translateY: anim }], marginHorizontal: 6 }}>
            <MaterialCommunityIcons name="leaf" size={32} color="#4CAF50" />
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    overlay: {
        position: 'absolute',
        width,
        height,
        backgroundColor: 'rgba(0, 0, 0, 0.6)', // Darker background
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 9999,
    },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default LeafLoadingOverlay;
