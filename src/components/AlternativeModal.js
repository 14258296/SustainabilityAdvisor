import React, { useRef, useState, useEffect } from 'react';
import {
  View,
  Text,
  Modal,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
  Image,
  Pressable,
} from 'react-native';
import PagerView from 'react-native-pager-view';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants/colors';

const SCREEN_WIDTH = Dimensions.get('window').width;
const SCREEN_HEIGHT = Dimensions.get('window').height;

const AlternativeModal = ({ visible, onClose, alternatives, setSelectId, selectId }) => {
  const pagerRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (visible) {
      setCurrentIndex(selectId);
      pagerRef.current?.setPage(selectId);
    }
  }, [visible, selectId]);

  const handleScroll = (index) => {
    setSelectId(index);
    pagerRef.current?.setPage(index);
    setCurrentIndex(index);
  };

  return (
    <Modal visible={visible} transparent animationType="slide" onRequestClose={onClose}>
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>
            {alternatives[currentIndex]?.input_material || 'Eco Alternative'}
          </Text>

          <View style={styles.carouselContainer}>
            {/* Back Arrow */}
            <TouchableOpacity
              disabled={currentIndex === 0}
              onPress={() => handleScroll(currentIndex - 1)}
              style={[styles.navArrow, currentIndex === 0 && styles.navArrowDisabled]}
            >
              <Ionicons name="chevron-back-circle" size={32} color={COLORS.primary} />
            </TouchableOpacity>

            {/* PagerView */}
            <PagerView
              ref={pagerRef}
              style={styles.pagerView}
              initialPage={currentIndex}
              onPageSelected={(e) => {
                const newIdx = e.nativeEvent.position;
                setCurrentIndex(newIdx);
                setSelectId(newIdx);
              }}
            >
              {alternatives.map((item, index) => (
                <View key={index} style={styles.carouselItem}>
                  {item.image ? (
                    <Image source={item.image} style={styles.image} resizeMode="contain" />
                  ) : (
                    <Image
                      source={item.url ? { uri: item.url } : require('../../assets/adaptive-icon.png')}
                      style={styles.image}
                      resizeMode="contain"
                    />
                  )}
                  <Text style={styles.carouselText}>
                    {item.detailed_sustainability_insights || item.description}
                  </Text>
                </View>
              ))}
            </PagerView>

            {/* Forward Arrow */}
            <TouchableOpacity
              disabled={currentIndex === alternatives.length - 1}
              onPress={() => handleScroll(currentIndex + 1)}
              style={[
                styles.navArrow,
                currentIndex === alternatives.length - 1 && styles.navArrowDisabled,
              ]}
            >
              <Ionicons name="chevron-forward-circle" size={32} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          {/* Close */}
          <Pressable
            onPress={() => onClose()}
            style={styles.closeButton}
          >
            <Text style={styles.modalCancel}>Close</Text>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};

export default AlternativeModal;

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
  },
  modalContent: {
    height: SCREEN_HEIGHT * 0.55,
    width: SCREEN_WIDTH * 0.7,
    backgroundColor: 'white',
    borderRadius: 12,
    alignSelf: 'center',
    paddingVertical: 20,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.primary,
  },
  carouselContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  pagerView: {
    flex: 1,
    width: SCREEN_WIDTH * 0.7,
    height: SCREEN_HEIGHT * 0.4,
  },
  carouselItem: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 10,
  },
  image: {
    width: SCREEN_WIDTH * 0.6,
    height: SCREEN_HEIGHT * 0.25,
    marginBottom: 15,
  },
  carouselText: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 22,
    color: '#333',
  },
  navArrow: {
    padding: 10,
  },
  navArrowDisabled: {
    opacity: 0.3,
  },
  closeButton: {
    marginTop: 10,
    padding: 10,
  },
  modalCancel: {
    color: COLORS.primary,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

