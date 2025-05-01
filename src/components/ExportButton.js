import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';

const ExportButton = () => {
  const handleExport = () => {
    alert('Export feature not implemented yet.');
  };

  return (
    <TouchableOpacity style={styles.exportButton} onPress={handleExport}>
      <Text style={styles.exportText}>{STRINGS.exportReport}</Text>
    </TouchableOpacity>
  );
};

export default ExportButton;
