import React from 'react';
import { View, Text } from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';
import Gauge from '../animations/Gauge';

const SustainabilityScore = ({ score, alternative, disposal }) => (
  <View style={styles.sustainabilitySection}>
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={styles.sectionHeader}>{STRINGS.sustainabilityScore}</Text>
      {score !== '' && <Text style={styles.inputMaterialValue}> ({score})</Text>}
    </View>
    <View style={styles.scoreRow}>
      <Gauge score={score} />
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
