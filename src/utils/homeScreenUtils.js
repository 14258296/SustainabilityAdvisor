import { Alert } from 'react-native';
import { fetchSustainabilityInsights } from './api';
import { STRINGS } from '../constants/strings';

export const resetAnalysisState = ({
  setDescription,
  setInsights,
  setsustainabilityScore,
  setAlternative,
  setInputMaterial,
  setDisposalMethod,
  setIsCompatible,
  setMaterialCompatibility,
  setSustainableUsagePractices,
  setCompatibilityInput,
  setFinalProduct,
}) => {
  setDescription('');
  setInsights('');
  setsustainabilityScore('');
  setAlternative('');
  setInputMaterial('');
  setDisposalMethod('');
  setIsCompatible(false);
  setMaterialCompatibility(null);
  setSustainableUsagePractices(null);
  setCompatibilityInput('');
  setFinalProduct('');
};

export const handleUploadData = async (
  image,
  compatibilityInput,
  setters,
  setLoading
) => {
  try {
    const data = await fetchSustainabilityInsights(image, compatibilityInput);
    console.log(data);
    const { analysis, material_compatibility } = data.data;

    setters.setDescription(analysis.description);
    setters.setInputMaterial(`(${analysis.Input_material})`);
    setters.setIsCompatible(material_compatibility.is_compatible);
    setters.setInsights(analysis.detailed_sustainability_insights);
    setters.setsustainabilityScore(analysis.sustainability_score.score);
    setters.setDisposalMethod(analysis.sustainability_score.disposal_method);
    setters.setAlternative(analysis.sustainability_score.eco_friendly_alternative);
    setters.setMaterialCompatibility(material_compatibility);
    setters.setSustainableUsagePractices(analysis.sustainable_usage_practices);
    setters.setFinalProduct(data.final_product);
  } catch (error) {
    Alert.alert('Error', error.message || STRINGS.genericError);
  } finally {
    setLoading(false);
  }
};
