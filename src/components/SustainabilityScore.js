import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';
import Icon from 'react-native-vector-icons/FontAwesome';
import { COLORS } from '../constants/colors';
import AlternativeModal from './AlternativeModal';

const SustainabilityScore = ({ score, alternative, disposal, setSelectId, suggestions, selectId }) => {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.sustainabilitySection}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Icon name="recycle" size={20} color={COLORS.primary} style={styles.headerIcon} />
        <Text style={styles.sectionHeader}>{STRINGS.ecoFriendlyAlternative}</Text>
      </View>

      <View style={styles.scoreRow}>
        <View style={styles.cardRow}>
          <TouchableOpacity style={styles.scoreCard} onPress={() => setModalVisible(true)}>
            {/* <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
              <Icon name="recycle" size={16} color={COLORS.primary} style={styles.sustainabilityIcon} />
              <Text style={styles.cardTitle}>{STRINGS.ecoFriendlyAlternative}</Text>
            </View> */}
            <Text style={styles.cardSubtitle}>{alternative}</Text>
          </TouchableOpacity>
        </View>
      </View>

      <AlternativeModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        alternatives={suggestions}
        setSelectId={setSelectId}
        selectId={selectId}
      />
    </View>
  );
};

export default SustainabilityScore;
