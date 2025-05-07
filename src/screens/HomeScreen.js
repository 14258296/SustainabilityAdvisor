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
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';

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
    if (final_product === '') {
      Alert.alert(
        'Notice',
        'Before checking if the material is compatible, please use the prompt above to select a final product first. This will help us to provide a more accurate compatibility check.',
        [{ text: 'OK', style: 'cancel' }]
      );
      return;
    }
    setModalVisible(true);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
      <View style={styles.container}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <MaterialCommunityIcon name="recycle" size={24} color={COLORS.primary} style={styles.titleIcon} />
          <Text style={styles.title}>{STRINGS.appTitle}</Text>
        </View>

        <View style={{ flex: 1 }}>
          <View style={styles.InputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="flask" size={18} color={COLORS.primary} style={styles.headerIcon} />
              <Text style={styles.sectionHeader}>{STRINGS.inputMaterial}</Text>
              <Text style={styles.inputMaterialValue}>{inputMaterial}</Text>
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
          </View>

          <View style={styles.InsightsMainContainer}>
            <SustainabilityScore
              score={sustainabilityScore}
              alternative={alternative}
              disposal={disposalMethod}
            />

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
              <MaterialIcon name="insights" size={20} color={COLORS.primary} style={styles.headerIcon} />
              <Text style={styles.sectionHeader}>{STRINGS.detailedInsights}</Text>
              <View style={styles.exportButton}>
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

            <InsightsPanel insights={insights} />
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
