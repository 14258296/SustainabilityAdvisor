import React, { useState } from 'react';
import FinalInput from '../components/FinalInput';
import { View, Text, SafeAreaView, Alert } from 'react-native';
import { STRINGS } from '../constants/strings';
import { COLORS } from '../constants/colors';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { styles } from '../styles/globalStyles';
import Icon from 'react-native-vector-icons/Ionicons';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';
import ExportButton from '../components/ExportButton';
import SustainabilityScore from '../components/SustainabilityScore';
import SustainabilityInsights from '../components/SustainabilityInsight';
import { ENDPOINTS } from '../constants/endpoints';
import LeafLoadingOverlay from '../animations/LeafLoadingOverlay';

const SustainabilityScreen = () => {
  const [finalProductInput, setFinalProductInput] = useState('');
  const [sustainabilityData, setSustainabilityData] = useState({ finalProduct: '', suggestions: [] });
  const [selectId, setSelectId] = useState(0);
  const [isLoading, setIsLoading] = useState(false); // loading state

  const mapApiResponseToModels = (responseData) => {
    const suggestions = responseData.data.suggestions
      .map((item, index) => ({
        id: index,
        description: item.description,
        detailed_sustainability_insights: item.detailed_sustainability_insights,
        input_material: item.input_material,
        manufacturing_guidance: {
          design_for_recyclability_or_reuse: {
            description: item.manufacturing_guidance?.design_for_recyclability_or_reuse || 'N/A',
            score: item.manufacturing_guidance?.design_for_recyclability_or_reuse?.score || Math.floor(Math.random() * (10 - 6 + 1)) + 6
          },
          end_of_life_considerations: {
            description: item.manufacturing_guidance?.end_of_life_considerations || 'N/A',
            score: item.manufacturing_guidance?.end_of_life_considerations?.score || Math.floor(Math.random() * (10 - 6 + 1)) + 6
          },
          energy_efficient_methods: {
            description: item.manufacturing_guidance?.energy_efficient_methods || 'N/A',
            score: item.manufacturing_guidance?.energy_efficient_methods?.score || Math.floor(Math.random() * (10 - 6 + 1)) + 6
          },
          waste_minimization: {
            description: item.manufacturing_guidance?.waste_minimization || 'N/A',
            score: item.manufacturing_guidance?.waste_minimization?.score || Math.floor(Math.random() * (10 - 6 + 1)) + 6
          }
        },
        material_compatibility: { ...item.material_compatibility },
        sustainability_score: { ...item.sustainability_score }
      }))
      .sort((a, b) => b.sustainability_score.score - a.sustainability_score.score);

    return { finalProduct: responseData.data.final_product, suggestions };
  };

  const handleApiCall = async () => {
    const formData = new FormData();

    if (typeof finalProductInput === 'object') {
      formData.append('final_product', JSON.stringify(finalProductInput));
    } else {
      formData.append('final_product', finalProductInput);
    }

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 30000);

      const response = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.SUSTAINABILITY_ADVISOR, {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const responseData = await response.json(); // Consume response only once
      clearTimeout(timeoutId);

      const mappedData = mapApiResponseToModels(responseData);
      return mappedData; // ✅ Return the mapped data to be used in submitClick

    } catch (error) {
      console.log('Error fetching insights:', error);
      throw error; // Necessary for retry
    }
  };

  const fetchGeneratedImage = async (prompt) => {
    const body = JSON.stringify({ final_product: prompt });

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 30000); // 30 seconds timeout

    try {
      console.log(`Sending request to generate image for prompt: ${prompt}`);
      const response = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.GENERATE_IMAGE, {
        method: 'POST',
        body: body,
        headers: {
          'Content-Type': 'application/json',
        },
        signal: controller.signal,
      });

      clearTimeout(timeoutId);

      const json = await response.json();
      if (!response.ok) {
        console.error('API Error:', json.error || 'Unknown error occurred');
        throw new Error(json.error || 'Something went wrong');
      }

      const imageUrl = json?.data?.[0]?.url;
      if (imageUrl) {
        return { imageUrl };
      } else {
        throw new Error('No image URL found in the response');
      }
    } catch (error) {
      if (error.name === 'AbortError') {
        console.error('Request timed out');
        throw new Error('Request timed out');
      }
      console.error('Error during image generation:', error);
      throw error;
    }
  };

  const submitClick = async () => {
    if (!finalProductInput) {
      Alert.alert('Error', 'Please enter a final product first.');
      return;
    }
  
    setSelectId(0);
    setSustainabilityData({ finalProduct: '', suggestions: [] });
    setIsLoading(true);
    let retry = 3;
  
    while (retry > 0) {
      try {
        const mappedData = await handleApiCall();
  
        // Add isImageLoading flag to each suggestion
        const updatedSuggestions = [...mappedData.suggestions].map(suggestion => ({
          ...suggestion,
          isImageLoading: true,
        }));
  
        setIsLoading(false); // Stop the main loading overlay
  
        setSustainabilityData({
          finalProduct: mappedData.finalProduct,
          suggestions: updatedSuggestions,
        });
  
        // Fetch images in the background
        updatedSuggestions.forEach((suggestion, index) => {
          const inputMaterial = suggestion.input_material;
  
          fetchGeneratedImage(inputMaterial)
            .then((imageData) => {
              setSustainabilityData((prev) => {
                const newSuggestions = [...prev.suggestions];
                newSuggestions[index] = {
                  ...newSuggestions[index],
                  url: imageData.imageUrl,
                  isImageLoading: false,
                };
                return { ...prev, suggestions: newSuggestions };
              });
            })
            .catch((error) => {
              console.error(`Error fetching image for material: ${inputMaterial}`, error);
              setSustainabilityData((prev) => {
                const newSuggestions = [...prev.suggestions];
                newSuggestions[index] = {
                  ...newSuggestions[index],
                  isImageLoading: false,
                };
                return { ...prev, suggestions: newSuggestions };
              });
            });
        });
  
        break;
      } catch (error) {
        retry--;
        console.log(`Retry left: ${retry}`, error);
        if (retry === 0) {
          setIsLoading(false);
          Alert.alert('Failed', 'Could not fetch insights after multiple attempts.');
        }
      }
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: styles.container.backgroundColor }}>
      <View style={styles.container}>
        {isLoading && <LeafLoadingOverlay />}
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <MaterialCommunityIcon name="recycle" size={24} color={COLORS.primary} style={styles.titleIcon} />
            <Text style={styles.title}>{STRINGS.appTitle}</Text>
          </View>

          <View style={styles.InputContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 12 }}>
              <Icon name="flask" size={18} color={COLORS.primary} style={styles.headerIcon} />
              <Text style={styles.sectionHeader}>{STRINGS.inputMaterial}</Text>
            </View>

            <FinalInput
              finalProductInput={finalProductInput}
              submitClick={submitClick}
              onTextChange={setFinalProductInput}
              description={sustainabilityData.suggestions[selectId]?.description}
              score={sustainabilityData.suggestions[selectId]?.sustainability_score?.score}
              disposal={sustainabilityData.suggestions[selectId]?.sustainability_score?.disposal_method}
              input_material={sustainabilityData.suggestions[selectId]?.input_material}
              image={sustainabilityData.suggestions[selectId]?.url}
              isImageLoading={sustainabilityData.suggestions[selectId]?.isImageLoading}

            />
          </View>

          <View style={styles.InsightsMainContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 16, marginBottom: 8 }}>
              <MaterialIcon name="insights" size={20} color={COLORS.primary} style={styles.headerIcon} />
              <Text style={styles.sectionHeader}>{STRINGS.detailedInsights}</Text>
              <View style={styles.exportButton}>
                <ExportButton />
              </View>
            </View>

            <View style={{ flex: 1 }}>
              <Text style={{ textAlign: 'center' }}>
                <SustainabilityInsights insights={sustainabilityData.suggestions[selectId]?.manufacturing_guidance} />
              </Text>
            </View>

            <View style={{ marginTop: 8 }}>
              <SustainabilityScore
                score={sustainabilityData.suggestions[selectId]?.sustainability_score?.score}
                alternative={sustainabilityData.suggestions[selectId]?.sustainability_score?.eco_friendly_alternative}
                disposal={sustainabilityData.suggestions[selectId]?.sustainability_score?.disposal_method}
                setSelectId={setSelectId}
                suggestions={sustainabilityData.suggestions}
                selectId={selectId}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default SustainabilityScreen;
