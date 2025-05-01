import React, { useState } from 'react';
import {
  View,
  Image,
  TouchableOpacity,
  Text,
  Modal,
  Pressable,
  ActivityIndicator,
} from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';

const ImageUploader = ({ selectedImage, onImageSelect, onUpload, loading }) => {
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  return (
    <View style={styles.inputBlock}>
      <TouchableOpacity style={styles.imageCard} onPress={openModal}>
        <View style={styles.imageContainer}>
          <Image
            source={
              selectedImage ? { uri: selectedImage } : require('../../assets/adaptive-icon.png')
            }
            style={styles.placeholderImage}
            resizeMode="contain" // Ensuring the image fits without cropping or filling
          />

          {loading && (
            <View style={styles.loadingOverlay}>
              <ActivityIndicator size="large" color="#ffffff" />
            </View>
          )}
        </View>
      </TouchableOpacity>

      <TouchableOpacity style={styles.uploadButton} onPress={onUpload}>
        <Text style={styles.uploadText}>{STRINGS.uploadImage}</Text>
      </TouchableOpacity>

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
