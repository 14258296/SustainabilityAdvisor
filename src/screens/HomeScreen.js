import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';
import ImageUploader from '../components/ImageUploader';
import SustainabilityScore from '../components/SustainabilityScore';
import InsightsPanel from '../components/InsightsPanel';
import ExportButton from '../components/ExportButton';
import MaterialCompatibilityModal from '../components/MaterialCompatibilityModal';
import { requestMediaLibraryPermission, launchImageLibrary, launchCamera } from '../utils/imagePickerHelper';
import { handleUploadData, resetAnalysisState } from '../utils/homeScreenUtils';

const HomeScreen = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [description, setDescription] = useState('');
  const [compatibilityInput, setCompatibilityInput] = useState('');
  const [insights, setInsights] = useState('');
  const [alternative, setAlternative] = useState('');
  const [disposalMethod, setDisposalMethod] = useState('');
  const [sustainabilityScore, setsustainabilityScore] = useState('');
  const [loading, setLoading] = useState(false);
  const [materialCompatibility, setMaterialCompatibility] = useState(null);
  const [sustainableUsagePractices, setSustainableUsagePractices] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [isCompatible, setIsCompatible] = useState(false);
  const [inputMaterial, setInputMaterial] = useState('');
  const [final_product, setFinalProduct] = useState('');

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const handleImageSelect = async (source) => {
    const uri = source === 'camera' ? await launchCamera() : await launchImageLibrary();
    if (uri) {
      setSelectedImage(uri);
      resetAnalysisState({
        setDescription,
        setInsights,
        setsustainabilityScore,
        setAlternative,
        setInputMaterial,
        setDisposalMethod,
        setIsCompatible,
        setMaterialCompatibility,
        setSustainableUsagePractices,
        setFinalProduct,
        setCompatibilityInput,
      });
    }
  };

  const handleUpload = async () => {
    if (!selectedImage) {
      Alert.alert('No image selected', STRINGS.alertNoImage);
      return;
    }

    if (!compatibilityInput.trim()) {
      Alert.alert('No compatibility input', STRINGS.alertNoInput);
      return;
    }

    setLoading(true);
    await handleUploadData(
      selectedImage,
      compatibilityInput,
      {
        setDescription,
        setInsights,
        setsustainabilityScore,
        setAlternative,
        setInputMaterial,
        setDisposalMethod,
        setMaterialCompatibility,
        setSustainableUsagePractices,
        setIsCompatible,
        setFinalProduct,
      },
      setLoading
    );
  };

  const handleOnSubmitEditing = async () => {
    console.log('Submitted:', 'text');
    setLoading(true);
    await handleUploadData(
      selectedImage,
      compatibilityInput,
      {
        setDescription,
        setInsights,
        setsustainabilityScore,
        setAlternative,
        setInputMaterial,
        setDisposalMethod,
        setMaterialCompatibility,
        setSustainableUsagePractices,
        setIsCompatible,
        setFinalProduct,
      },
      setLoading
    );
  };

  const checkMaterialCompatibilityPress = async () => {
    if (!compatibilityInput.trim()) {
      Alert.alert('No compatibility input', STRINGS.alertNoInput);
      return;
    }

    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{STRINGS.appTitle}</Text>

      <View style={styles.row}>
        <View style={styles.column60}>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
            <Text style={styles.sectionHeader}>{STRINGS.inputMaterial}</Text>
            <Text style={styles.inputMaterialValue}> {inputMaterial}</Text>
          </View>

          <View style={styles.inputRow}>
            <ImageUploader
              style={styles.imageBlock}
              selectedImage={selectedImage}
              onImageSelect={handleImageSelect}
              onUpload={handleUpload}
              loading={loading}
            />

            <View style={styles.compatibilityBlock}>
              <Text style={styles.compatibilityLabel}>{STRINGS.description}</Text>
              <ScrollView style={styles.descriptionDisplayView}>
                <Text style={styles.descriptionDisplay}>
                  {description || STRINGS.placeholderDescription}
                </Text>
              </ScrollView>

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

          <SustainabilityScore
            score={sustainabilityScore}
            alternative={alternative}
            disposal={disposalMethod}
          />
        </View>

        <View style={styles.column40}>
          <Text style={styles.sectionHeader}>{STRINGS.detailedInsights}</Text>
          <InsightsPanel insights={insights} />
          <ExportButton />
        </View>
      </View>

      <MaterialCompatibilityModal
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        isCompatible={isCompatible}
        sustainableUsagePractices={sustainableUsagePractices}
      />
    </ScrollView>
  );
};

export default HomeScreen;
