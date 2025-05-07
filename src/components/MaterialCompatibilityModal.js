import React, { useRef, useState } from 'react';
import {
  View,
  Text,
  Modal,
  Pressable,
  Dimensions,
  TouchableOpacity,
  StyleSheet
} from 'react-native';
import * as Speech from 'expo-speech';
import { styles } from '../styles/globalStyles';
import { Ionicons } from '@expo/vector-icons';
import PagerView from 'react-native-pager-view';
import Gauge from '../animations/Gauge';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const MaterialCompatibilityModal = ({
  visible,
  isCompatible,
  sustainableUsagePractices,
  onClose
}) => {
  const pagerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  const { manufacturing_guidance } = sustainableUsagePractices || {};

  const carouselData = [
    {
      key: 'energy_efficient_methods',
      title: 'Energy-efficient Methods',
      content: manufacturing_guidance?.energy_efficient_methods
    },
    {
      key: 'design_for_recyclability_or_reuse',
      title: 'Design for Recyclability or Reuse',
      content: manufacturing_guidance?.design_for_recyclability_or_reuse
    },
    {
      key: 'waste_minimization',
      title: 'Waste Minimization',
      content: manufacturing_guidance?.waste_minimization
    },
    {
      key: 'end_of_life_considerations',
      title: 'End of Life Considerations',
      content: manufacturing_guidance?.end_of_life_considerations
    }
  ].filter(item => item.content);

  const speakText = () => {
    if (isCompatible && carouselData[currentIndex]) {
      const currentContent = carouselData[currentIndex].content;
      const currentTitle = carouselData[currentIndex].title;
      const speechText = `${currentTitle}: ${currentContent}`;
      Speech.speak(speechText);
    } else {
      Speech.speak('This material is not suitable for the final product.');
    }
  };

  const handleScroll = (index) => {
    pagerRef.current?.setPage(index);
    setCurrentIndex(index);
  };

  const getScoreColor = (score) => {
    if (score >= 8) return '#66BB6A'; // Green
    if (score >= 4) return '#FFB300'; // Amber
    return '#E53935'; // Red
  };

  const scoreValue = 8; // Replace with dynamic value if needed

  return (
    <View>
      <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
        <View style={styles.modalOverlay}>
          <View style={[styles.modalContent, localStyles.modalContentCustom]}>
            <TouchableOpacity onPress={speakText} style={styles.speakerIcon}>
              <Ionicons name="volume-high" size={24} color="#2E7D32" />
            </TouchableOpacity>

            {isCompatible ? (
              <>
                <Text style={[styles.modalTitle, localStyles.modalTitleCustom]}>
                  {carouselData[currentIndex]?.title}
                </Text>

                <View style={localStyles.carouselContainer}>
                  <TouchableOpacity
                    disabled={currentIndex === 0}
                    onPress={() => handleScroll(currentIndex - 1)}
                    style={[
                      localStyles.navArrow,
                      currentIndex === 0 && localStyles.navArrowDisabled
                    ]}
                  >
                    <Ionicons name="chevron-back-circle" size={32} color="#2E7D32" />
                  </TouchableOpacity>

                  <PagerView
                    ref={pagerRef}
                    style={localStyles.pagerView}
                    initialPage={currentIndex}
                    onPageSelected={(e) => setCurrentIndex(e.nativeEvent.position)}
                  >
                    {carouselData.map((item) => (
                      <View key={item.key} style={localStyles.carouselItem}>
                        <View style={localStyles.scoreAndGauge}>
                          <View style={localStyles.scoreContainer}>
                            <Text style={localStyles.scoreLabel}>Score:</Text>
                            <Text style={[
                              localStyles.scoreText,
                              { color: getScoreColor(2) }
                            ]}>
                              {2}
                            </Text>
                          </View>
                          <Gauge score={2} />
                        </View>
                        <Text style={localStyles.carouselText}>{item.content}</Text>
                      </View>
                    ))}
                  </PagerView>

                  <TouchableOpacity
                    disabled={currentIndex === carouselData.length - 1}
                    onPress={() => handleScroll(currentIndex + 1)}
                    style={[
                      localStyles.navArrow,
                      currentIndex === carouselData.length - 1 && localStyles.navArrowDisabled
                    ]}
                  >
                    <Ionicons name="chevron-forward-circle" size={32} color="#2E7D32" />
                  </TouchableOpacity>
                </View>
              </>
            ) : (
              <View style={localStyles.invalidContainer}>
                <Text style={styles.modalTitle}>Invalid Material for Final Product</Text>
                <Text style={styles.modalMessage}>
                  This material is not suitable for the final product.
                </Text>
              </View>
            )}

            <Pressable
              onPress={() => {
                Speech.stop();
                onClose();
                setCurrentIndex(0);
              }}
              style={localStyles.closeButton}
            >
              <Text style={styles.modalCancel}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default MaterialCompatibilityModal;

const localStyles = StyleSheet.create({
  modalContentCustom: {
    height: SCREEN_HEIGHT * 0.37, // 60% of screen height
    justifyContent: 'space-between',
    paddingVertical: 20,
  },
  modalTitleCustom: {
    textAlign: 'center',
    marginBottom: 10,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  navArrow: {
    padding: 10,
  },
  navArrowDisabled: {
    opacity: 0.3,
  },
  pagerView: {
    flex: 1,
    width: SCREEN_WIDTH - 80,
    height: SCREEN_HEIGHT * 0.27,
  },
  carouselItem: {
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 10,
    height: SCREEN_HEIGHT * 0.26, // 40% of screen height
  },
  carouselText: {
    textAlign: 'start',
    fontSize: 16,
    lineHeight: 24,
    flexWrap: 'wrap',
    maxWidth: SCREEN_WIDTH - 80,
    paddingHorizontal: 10,
  },
  scoreAndGauge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 25,
  },
  scoreContainer: {
    alignItems: 'center',
    marginRight: 10,
  },
  scoreLabel: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#66BB6A', // default green
  },
  scoreText: {
    fontSize: 40,
    fontWeight: 'bold',
  },
  invalidContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  closeButton: {
    alignSelf: 'center',
    marginTop: 15,
  },
});
