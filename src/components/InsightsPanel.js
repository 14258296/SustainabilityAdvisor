import React from 'react';
import { ScrollView, Text } from 'react-native';
import { styles } from '../styles/globalStyles';

const InsightsPanel = ({ insights }) => (
  <ScrollView style={styles.insightsContainer}>
    <Text style={styles.insightsSubtitle}>{insights}</Text>
  </ScrollView>
);

export default InsightsPanel;
