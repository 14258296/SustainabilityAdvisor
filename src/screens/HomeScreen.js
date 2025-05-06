import React, { useEffect, useState } from 'react';
import { View, Text, Alert, SafeAreaView } from 'react-native';
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
  const [rawProductInput, setRawProductInput] = useState('');

  useEffect(() => {
    requestMediaLibraryPermission();
  }, []);

  const handleImageSelect = async (source) => {
    const uri = source === 'camera' ? await launchCamera() : await launchImageLibrary();
    if (uri) {
      setSelectedImage(uri);
    }
  };

  const handleDeleteImage = () => {
    setSelectedImage(null);
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
    if (final_product === '') {
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

  const checkMaterialCompatibilityPress = async () => {
    if (!compatibilityInput.trim()) {
      Alert.alert('No compatibility input', STRINGS.alertNoInput);
      return;
    }

    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
      <View style={styles.container}>
        <Text style={styles.title}>{STRINGS.appTitle}</Text>

        <View style={{ flex: 1 }}>
          <View style={styles.InputContainer}>
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
                rawProductInput={rawProductInput}
                setRawProductInput={setRawProductInput}
                compatibilityInput={compatibilityInput}
                setCompatibilityInput={setCompatibilityInput}
                handleOnSubmitEditing={handleOnSubmitEditing}
                description={description}
                checkMaterialCompatibilityPress={checkMaterialCompatibilityPress}
                handleDeleteImage={handleDeleteImage}
              />
            </View>

            <SustainabilityScore
              score={sustainabilityScore}
              alternative={alternative}
              disposal={disposalMethod}
            />
          </View>

          <View style={styles.InsightsMainContainer}>
            <Text style={styles.sectionHeader}>{STRINGS.detailedInsights}</Text>
            <InsightsPanel insights={insights} />
            <ExportButton
              selectedImage={selectedImage}
              description={description}
              score={sustainabilityScore}
              alternative={alternative}
              disposal={disposalMethod}
              insights={insights}
              compatibilityInput={compatibilityInput}
              inputMaterial={inputMaterial}
              finalProduct={final_product}
              sustainableUsagePractices={sustainableUsagePractices}
            />
          </View>
        </View>

        <MaterialCompatibilityModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          isCompatible={isCompatible}
          sustainableUsagePractices={sustainableUsagePractices}
        />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
