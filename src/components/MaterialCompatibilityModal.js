import React from 'react';
import { View, Text, Modal, Pressable, TouchableOpacity } from 'react-native';
import * as Speech from 'expo-speech';
import { styles } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons'; // Expo icon set

const MaterialCompatibilityModal = ({
  visible,
  isCompatible,
  sustainableUsagePractices,
  onClose
}) => {
  const speakText = () => {
    if (isCompatible && sustainableUsagePractices) {
      const { manufacturing_guidance } = sustainableUsagePractices || {};
      let speechText = 'Sustainable Usage Practices. ';

      if (manufacturing_guidance?.energy_efficient_methods) {
        speechText += `Energy-efficient methods: ${manufacturing_guidance.energy_efficient_methods}. `;
      }
      if (manufacturing_guidance?.design_for_recyclability_or_reuse) {
        speechText += `Design for recyclability or reuse: ${manufacturing_guidance.design_for_recyclability_or_reuse}. `;
      }
      if (manufacturing_guidance?.waste_minimization) {
        speechText += `Waste minimization: ${manufacturing_guidance.waste_minimization}. `;
      }
      if (manufacturing_guidance?.end_of_life_considerations) {
        speechText += `End of life considerations: ${manufacturing_guidance.end_of_life_considerations}. `;
      }

      Speech.speak(speechText);
    } else {
      Speech.speak('This material is not suitable for the final product.');
    }
  };

  const renderSustainableUsagePractices = () => {
    const { manufacturing_guidance } = sustainableUsagePractices || {};

    return (
      <View style={{ alignItems: 'center', padding: 10 }}>
        {manufacturing_guidance?.energy_efficient_methods && (
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            Energy-efficient methods: {manufacturing_guidance.energy_efficient_methods}
          </Text>
        )}
        {manufacturing_guidance?.design_for_recyclability_or_reuse && (
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            Design for recyclability or reuse: {manufacturing_guidance.design_for_recyclability_or_reuse}
          </Text>
        )}
        {manufacturing_guidance?.waste_minimization && (
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            Waste minimization: {manufacturing_guidance.waste_minimization}
          </Text>
        )}
        {manufacturing_guidance?.end_of_life_considerations && (
          <Text style={{ textAlign: 'center', marginBottom: 10 }}>
            End of life considerations: {manufacturing_guidance.end_of_life_considerations}
          </Text>
        )}
      </View>
    );
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>

          <TouchableOpacity onPress={speakText} style={styles.speakerIcon}>
            <Ionicons name="volume-high" size={24} color="#6A1B9A" />
          </TouchableOpacity>

          {isCompatible ? (
            <>
              <Text style={styles.modalTitle}>Sustainable Usage Practices</Text>
              {renderSustainableUsagePractices()}
            </>
          ) : (
            <>
              <Text style={styles.modalTitle}>Invalid Material for Final Product</Text>
              <Text style={styles.modalMessage}>
                This material is not suitable for the final product.
              </Text>
            </>
          )}

          <Pressable onPress={() => {
              Speech.stop();
              onClose();
            }}>
            <Text style={styles.modalCancel}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default MaterialCompatibilityModal;
