import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';
import Gauge from '../animations/Gauge';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';
import AlternativeModal from './AlternativeModal'; // Adjust path if needed

const SustainabilityScore = ({ score, alternative, disposal }) => {
  const [modalVisible, setModalVisible] = useState(false);

  // Example data for alternatives (can be passed via props or loaded from API)
  const alternativeSlides = [
    {
      title: 'Item 1',
      image: require('../../assets/adaptive-icon.png'),
      description: 'Use bamboo toothbrushes instead of plastic ones.',
    },
    {
      title: 'Item 2',
      image: require('../../assets/adaptive-icon.png'),
      description: 'Carry reusable bags to reduce plastic waste.',
    },
    {
      title: 'Item 3',
      image: require('../../assets/adaptive-icon.png'),
      description: 'Carry reusable bags to reduce plastic waste 2.',
    },
  ];

  return (
    <View style={styles.sustainabilitySection}>
      {/* Section Header with Leaf Icon */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="leaf" size={20} color={COLORS.primary} style={styles.headerIcon} />
        <Text style={styles.sectionHeader}>{STRINGS.sustainabilityScore}</Text>
        {score !== '' && <Text style={styles.inputMaterialValue}> ({score})</Text>}
      </View>

      <View style={styles.scoreRow}>
        <Gauge score={score} />

        <View style={styles.cardRow}>
          {/* Eco-friendly Alternative - Clickable */}
          <TouchableOpacity style={styles.scoreCard} onPress={() => setModalVisible(true)}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Icon name="recycle" size={16} color={COLORS.primary} style={styles.sustainabilityIcon} />
              <Text style={styles.cardTitle}>{STRINGS.ecoFriendlyAlternative}</Text>
            </View>
            <Text style={styles.cardSubtitle}>{alternative}</Text>
          </TouchableOpacity>

          {/* Disposal Method */}
          <View style={styles.scoreCard}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Icon name="trash" size={16} color={COLORS.primary} style={styles.sustainabilityIcon} />
              <Text style={styles.cardTitle}>{STRINGS.disposalMethod}</Text>
            </View>
            <Text style={styles.cardSubtitle}>{disposal}</Text>
          </View>
        </View>
      </View>

      {/* Modal with Carousel */}
      <AlternativeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        alternatives={alternativeSlides}
      />
    </View>
  );
};

export default SustainabilityScore;
