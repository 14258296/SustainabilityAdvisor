import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  TextInput,
  Alert,
  Animated,
} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';

const ImageUploader = ({
  selectedImage,
  onImageSelect,
  onUpload,
  loading,
  rawProductInput,
  setRawProductInput,
  compatibilityInput,
  setCompatibilityInput,
  handleOnSubmitEditing,
  description,
  checkMaterialCompatibilityPress,
  handleDeleteImage
}) => {
  const [modalVisible, setModalVisible] = useState(false);
  const inputRef = useRef(null);

  const leafAnimationValues = new Array(6).fill(null).map(() => useRef(new Animated.Value(0)).current);

  useEffect(() => {
    if (loading) {
      const animations = leafAnimationValues.map((leaf, index) => {
        return Animated.loop(
          Animated.sequence([
            Animated.timing(leaf, {
              toValue: -15,
              duration: 500,
              useNativeDriver: true,
            }),
            Animated.timing(leaf, {
              toValue: 0,
              duration: 500,
              useNativeDriver: true,
            }),
          ])
        );
      });

      Animated.stagger(100, animations).start();
    }
    return () => {
      leafAnimationValues.forEach(leaf => leaf.stopAnimation());
    };
  }, [loading]);

  const openModal = () => {
    if (rawProductInput.trim() !== '') {
      Alert.alert('Notice', 'The Raw Material input is still filled. Kindly clear it before selecting a new image material.');
      return;
    }
    setModalVisible(true);
  };

  const closeModal = () => setModalVisible(false);

  const setRawMaterial = () => {
    if (selectedImage) {
      Alert.alert(
        'Notice',
        'There is still an image, please remove it first before setting a new raw material.',
        [
          {
            text: 'OK',
            onPress: () => {
              inputRef.current?.blur();
            }
          }
        ]
      );
      return;
    }
  };

  return (
    <View style={styles.inputBlock}>
      <View style={styles.inputRow}>
        <View style={styles.column}>
          <View style={styles.imageCard}>
            <TouchableOpacity onPress={openModal}>
              <View style={styles.imageContainer}>
                <Image
                  source={
                    selectedImage
                      ? { uri: selectedImage }
                      : require('../../assets/adaptive-icon.png')
                  }
                  style={styles.placeholderImage}
                  resizeMode="contain"
                />
                {loading && (
                  <View style={styles.loadingOverlay}>
                    <View style={styles.leafAnimationContainer}>
                      {leafAnimationValues.map((leaf, index) => (
                        <Animated.View
                          key={index}
                          style={{
                            ...styles.animatedLeaf,
                            transform: [{ translateY: leaf }],
                          }}
                        >
                          <Icon name="leaf" size={20} color="#4CAF50" />
                        </Animated.View>
                      ))}
                    </View>
                  </View>
                )}
              </View>
            </TouchableOpacity>

            {selectedImage && (
              <TouchableOpacity
                style={styles.deleteIcon}
                onPress={handleDeleteImage}
              >
                <Icon name="trash" size={28} color="#ff3b30" />
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.compatibilityLabel}>{STRINGS.rawMaterial}</Text>
          <TextInput
            ref={inputRef}
            style={styles.compatibilityInput}
            placeholder={STRINGS.inputPlaceholder}
            value={rawProductInput}
            onChangeText={setRawProductInput}
            onFocus={setRawMaterial}
          />

          <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
            <Text style={styles.uploadText}>{STRINGS.uploadImage}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.column}>
          <View style={styles.descriptionDisplayView}>
            <Text style={styles.compatibilityLabel}>{STRINGS.description}</Text>
            <Text style={styles.descriptionDisplay}>
              {description}
            </Text>
          </View>

          <Text style={styles.compatibilityLabel}>{STRINGS.finalProductCompatibility}</Text>
          <TextInput
            style={styles.compatibilityInput}
            placeholder={STRINGS.finalProductPlaceholder}
            value={compatibilityInput}
            onChangeText={setCompatibilityInput}
            onSubmitEditing={handleOnSubmitEditing}
          />

          <TouchableOpacity style={styles.compatibilityButton} onPress={checkMaterialCompatibilityPress}>
            <Text style={styles.uploadText}>{STRINGS.finalProductButton}</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Modal for Image Selection */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Select Image Source</Text>
            <Pressable onPress={() => { closeModal(); onImageSelect('camera'); }}>
              <Text style={styles.modalOption}>📷 Take Photo</Text>
            </Pressable>
            <Pressable onPress={() => { closeModal(); onImageSelect('gallery'); }}>
              <Text style={styles.modalOption}>🖼️ Choose from Gallery</Text>
            </Pressable>
            <Pressable onPress={closeModal}>
              <Text style={styles.modalCancel}>Cancel</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default ImageUploader;
