import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Svg, { Path, Text as SvgText } from 'react-native-svg';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
} from 'react-native-reanimated';

const Gauge = ({ score }) => {
  const angle = useSharedValue(mapScoreToAngle(score));

  useEffect(() => {
    angle.value = withTiming(mapScoreToAngle(score), { duration: 800 });
  }, [score]);

  const animatedArrowStyle = useAnimatedStyle(() => ({
    transform: [
      { rotate: `${angle.value}deg` },
    ],
  }));

  return (
    <View style={styles.container}>
      <View style={styles.arrowWrapper}>
        <Animated.View style={[styles.arrow, animatedArrowStyle]}>
          <View style={styles.arrowHead} />
        </Animated.View>
      </View>

      <Svg height="140" width="200" viewBox="0 0 200 140">
        {/* Gauge Arcs */}
        <Path d="M20 100 A80 80 0 0 1 60 40" stroke="#e76f51" strokeWidth="15" fill="none" />
        <Path d="M60 40 A80 80 0 0 1 140 40" stroke="#f4a261" strokeWidth="15" fill="none" />
        <Path d="M140 40 A80 80 0 0 1 180 100" stroke="#2a9d8f" strokeWidth="15" fill="none" />

        {/* Score */}
        {/* <SvgText
          x="100"
          y="115"
          textAnchor="middle"
          fontSize="24"
          fontWeight="bold"
          fill="#333"
          color={score > 7 ? '#2a9d8f' : score > 3 ? '#f4a261' : '#e76f51'}
        >
          {score}
        </SvgText> */}

        {/* Labels */}
        <SvgText x="20" y="130" fontSize="12" fill="#555" textAnchor="middle">0</SvgText>
        <SvgText x="180" y="130" fontSize="12" fill="#555" textAnchor="middle">10</SvgText>
      </Svg>

      {/* Arrow */}
      
    </View>
  );
};

function mapScoreToAngle(score) {
  const clamped = Math.max(0, Math.min(10, score));

  if (clamped <= 3) {
    // Red zone: 0–3 → -90° to -36°
    return -90 + ((clamped / 3) * 54);
  } else if (clamped <= 7) {
    // Yellow zone: 4–7 → -36° to 36°
    return -36 + (((clamped - 3) / 4) * 72);
  } else {
    // Green zone: 8–10 → 36° to 90°
    return 36 + (((clamped - 7) / 3) * 54);
  }
}


const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowWrapper: {
    position: 'absolute',
    width: 0,
    height: 0,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  arrow: {
    width: 2,
    height: 40,
    backgroundColor: 'black',
    transformOrigin: 'bottom center',
  },
  arrowHead: {
    width: 0,
    height: 0,
    borderLeftWidth: 6,
    borderRightWidth: 6,
    borderBottomWidth: 10,
    borderStyle: 'solid',
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'black',
    position: 'absolute',
    top: -10,
    left: -6,
  },
});

export default Gauge;
