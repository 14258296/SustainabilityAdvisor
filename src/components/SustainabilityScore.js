import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';

const SustainabilityScore = ({ score, alternative, disposal }) => (
  <View style={styles.sustainabilitySection}>
    <Text style={styles.sectionHeader}>{STRINGS.sustainabilityScore}</Text>
    <View style={styles.scoreRow}>
      <View style={styles.scoreCircle}>
        <Text style={styles.score}>{score}</Text>
      </View>
      <View style={styles.cardRow}>
        <View style={styles.scoreCard}>
          <Text style={styles.cardTitle}>{STRINGS.ecoFriendlyAlternative}</Text>
          <Text style={styles.cardSubtitle}>{alternative}</Text>
        </View>
        <View style={styles.scoreCard}>
          <Text style={styles.cardTitle}>{STRINGS.disposalMethod}</Text>
          <Text style={styles.cardSubtitle}>{disposal}</Text>
        </View>
      </View>
    </View>
  </View>
);

export default SustainabilityScore;
