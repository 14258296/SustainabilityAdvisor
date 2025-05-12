import React, { useState, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import * as Speech from 'expo-speech';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { COLORS } from '../constants/colors';
import Gauge from '../animations/Gauge';

const { width } = Dimensions.get('window');

const InsightCard = ({ title, insightText, score }) => {

  const getScoreColor = (score) => {
    if (score >= 1 && score <= 3) return '#e53935'; // red
    if (score >= 4 && score <= 6) return '#ffb300'; // amber
    if (score >= 7 && score <= 10) return '#43a047'; // green
    return COLORS.textDark;
  };

  const speakInsight = () => {
    if (insightText) {
      Speech.speak(insightText, { language: 'en' });
    } else {
      Speech.speak('No detailed insight available.', { language: 'en' });
    }
  };

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.cardTitle}>{title}</Text>
        <TouchableOpacity onPress={speakInsight}>
          <Icon name="volume-high" size={22} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
      <Gauge score={score} />
      <Text style={styles.scoreLabel}>
        Score: <Text style={[styles.score, { color: getScoreColor(score) }]}>{score}</Text>
      </Text>
      {insightText && (
        <Text style={styles.insightText}>{insightText}</Text>
      )}
    </View>
  );
};

const SustainabilityInsights = ({ insights }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const slideAnim = useRef(new Animated.Value(0)).current;

  if (!insights) {
    return <Text style={styles.placeholder}>No insights available.</Text>;
  }

  const insightData = [
    {
      title: 'Design for Recyclability or Reuse',
      score: insights.design_for_recyclability_or_reuse.score,
      scoreKey: 'recyclability_or_reuse_score',
      insightText: insights.design_for_recyclability_or_reuse.description,
    },
    {
      title: 'End of Life Considerations',
      score: insights.end_of_life_considerations.score,
      scoreKey: 'end_of_life_score',
      insightText: insights.end_of_life_considerations.description,
    },
    {
      title: 'Energy Efficient Method',
      score: insights.energy_efficient_methods.score,
      scoreKey: 'energy_efficiency_score',
      insightText: insights.energy_efficient_methods.description,
    },
    {
      title: 'Waste Minimization',
      score: insights.waste_minimization.score,
      scoreKey: 'waste_minimization_score',
      insightText: insights.waste_minimization.description,
    },
  ];

  const cardsPerPage = 2;
  const totalPages = Math.ceil(insightData.length / cardsPerPage);

  const handleScroll = (nextIndex) => {
    const direction = nextIndex > currentIndex ? 1 : -1;
    Animated.timing(slideAnim, {
      toValue: direction * 100,
      duration: 200,
      easing: Easing.out(Easing.ease),
      useNativeDriver: true,
    }).start(() => {
      setCurrentIndex(nextIndex);
      slideAnim.setValue(-direction * 100);
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 200,
        easing: Easing.out(Easing.ease),
        useNativeDriver: true,
      }).start();
    });
  };

  const visibleCards = insightData.slice(
    currentIndex * cardsPerPage,
    currentIndex * cardsPerPage + cardsPerPage
  );

  return (
    <View style={styles.wrapper}>
      <View style={styles.navigationRow}>
        <TouchableOpacity
          disabled={currentIndex === 0}
          onPress={() => handleScroll(currentIndex - 1)}
          style={[
            styles.navArrow,
            currentIndex === 0 && styles.navArrowDisabled,
          ]}
        >
          <Ionicons name="chevron-back-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>

        <Animated.View
          style={[
            styles.container,
            {
              transform: [
                {
                  translateX: slideAnim.interpolate({
                    inputRange: [-100, 0, 100],
                    outputRange: [-200, 0, 200],
                  }),
                },
              ],
            },
          ]}
        >
          {visibleCards.map((data, index) => (
            <InsightCard
              key={index}
              title={data.title}
              score={data.score}
              scoreKey={data.scoreKey}
              insightText={data.insightText}
            />
          ))}
        </Animated.View>

        <TouchableOpacity
          disabled={currentIndex >= totalPages - 1}
          onPress={() => handleScroll(currentIndex + 1)}
          style={[
            styles.navArrow,
            currentIndex >= totalPages - 1 && styles.navArrowDisabled,
          ]}
        >
          <Ionicons name="chevron-forward-circle" size={32} color={COLORS.primary} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    paddingBottom: 16,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 1,
  },
  card: {
    padding: 10,
    width: width * 0.4,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.secondary,
    borderRadius: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0faf7',
  },
  header: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.primary,
    flex: 1,
    flexWrap: 'wrap',
  },
  scoreLabel: {
    textAlign: 'center',
    fontSize: 20,
    marginTop: 8,
    color: COLORS.textDark,
  },
  score: {
    fontWeight: 'bold',
  },
  insightText: {
    fontSize: 14,
    color: COLORS.textDark,
    marginTop: 8,
    textAlign: 'center',
    marginHorizontal: 4,
    lineHeight: 16,
  },
  placeholder: {
    textAlign: 'center',
    color: COLORS.gray,
    fontStyle: 'italic',
    paddingVertical: 20,
  },
  navigationRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  navArrow: {
    padding: 4,
  },
  navArrowDisabled: {
    opacity: 0.3,
  },
});

export default SustainabilityInsights;

