// components/ExportButton.js
import React from 'react';
import { TouchableOpacity, Text, Alert } from 'react-native';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';
import * as FileSystem from 'expo-file-system';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';

const ExportButton = ({
  selectedImage,
  description,
  score,
  alternative,
  disposal,
  insights,
  compatibilityInput,
  sustainableUsagePractices
}) => {
  const generatePDF = async () => {
    try {
      let imageTag = '';
      if (selectedImage) {
        const base64 = await FileSystem.readAsStringAsync(selectedImage, {
          encoding: FileSystem.EncodingType.Base64,
        });
        imageTag = `<img src="data:image/jpeg;base64,${base64}" style="max-width: 100%; height: auto; margin-bottom: 20px;" />`;
      }

      const renderManufacturingGuidance = (guidance) => {
        if (!guidance) return '<p>N/A</p>';
        return `
          <ul>
            <li><strong>Energy-efficient methods:</strong> ${guidance.energy_efficient_methods || 'N/A'}</li>
            <li><strong>Design for recyclability or reuse:</strong> ${guidance.design_for_recyclability_or_reuse || 'N/A'}</li>
            <li><strong>Waste minimization:</strong> ${guidance.waste_minimization || 'N/A'}</li>
            <li><strong>End-of-life considerations:</strong> ${guidance.end_of_life_considerations || 'N/A'}</li>
          </ul>
        `;
      };

      const manufacturingGuidance = sustainableUsagePractices?.manufacturing_guidance;

      const htmlContent = `
        <html>
          <head>
            <style>
              body { font-family: Arial, sans-serif; padding: 24px; }
              h1 { color: #2E7D32; }
              h2 { color: #388E3C; }
              p { margin-bottom: 12px; }
              ul { margin-bottom: 12px; }
              li { margin-bottom: 6px; }
            </style>
          </head>
          <body>
            <h1>${STRINGS.appTitle} Report</h1>
            ${imageTag}
            <h2>Description</h2>
            <p>${description || 'N/A'}</p>

            <h2>Final Product</h2>
            <p>${compatibilityInput || 'N/A'}</p>

            <h2>${STRINGS.sustainabilityScore}</h2>
            <p>Score: ${score || 'N/A'}</p>
            <p>${STRINGS.ecoFriendlyAlternative}: ${alternative || 'N/A'}</p>
            <p>${STRINGS.disposalMethod}: ${disposal || 'N/A'}</p>

            <h2>${STRINGS.detailedInsights}</h2>
            <p>${insights || 'N/A'}</p>

            <h2>Sustainable Usage Practices - Manufacturing Guidance</h2>
            ${renderManufacturingGuidance(manufacturingGuidance)}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error('PDF export error:', error);
      Alert.alert('Export Failed', 'There was an error generating the report.');
    }
  };

  return (
    <TouchableOpacity style={styles.exportButton} onPress={generatePDF}>
      <Text style={styles.exportText}>{STRINGS.exportReport}</Text>
    </TouchableOpacity>
  );
};

export default ExportButton;
