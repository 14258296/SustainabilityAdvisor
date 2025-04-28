import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Dimensions, Image, ScrollView, Platform } from 'react-native';
import * as ImagePicker from 'expo-image-picker';

const { width, height } = Dimensions.get('window');  // Using Dimensions to set the layout

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [insights, setInsights] = useState('');
  const [alternative, setAlternative] = useState('');
  const [disposalMethod, setdisposalMethod] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need media library permissions to make this work!');
        }
      }
    })();
  }, []);

  const handleImageUpload = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.Images,
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
      setInsights('Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \nLorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. \n Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. \n\nUt enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.');
      setAlternative('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
      setdisposalMethod('Lorem ipsum dolor sit amet, consectetur adipiscing elit');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>GenAI Sustainability Advisor</Text>

      <View style={styles.row}>
        <View style={styles.column60}>
          <Text style={styles.sectionHeader}>Input Material</Text>
          <View style={styles.row}>
            <View style={styles.inputBlock}>
              <View style={styles.imageCard}>
                <Image
                  source={
                    selectedImage
                      ? { uri: selectedImage }
                      : require('./assets/adaptive-icon.png')
                  }
                  style={styles.placeholderImage}
                />
              </View>
              <TouchableOpacity style={styles.uploadButton} onPress={handleImageUpload}>
                <Text style={styles.uploadText}>Upload Image</Text>
              </TouchableOpacity>
            </View>

            <TextInput
              style={styles.descriptionInput}
              placeholder="Description"
              multiline
              placeholderTextColor="#7f8c8d"
            />
          </View>

          <View style={styles.sustainabilitySection}>
            <Text style={styles.sectionHeader}>Sustainability Score</Text>
            <View style={styles.scoreRow}>
              <View style={styles.scoreCircle}>
                <Text style={styles.score}>3</Text>
              </View>

              <View style={styles.scoreCard1}>
                <Text style={styles.cardTitle}>Eco-friendly Alternative</Text>
                <Text style={styles.cardSubtitle}>{alternative}</Text>
              </View>

              <View style={styles.scoreCard2}>
                <Text style={styles.cardTitle}>Disposal Method</Text>
                <Text style={styles.cardSubtitle}>{disposalMethod}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.column40}>
          <Text style={styles.sectionHeader}>Detailed Sustainability Insights</Text>
          <ScrollView style={styles.insightsContainer}>
              <Text style={styles.insightsSubtitle}>{insights}</Text>
          </ScrollView>
          <TouchableOpacity style={styles.exportButton}>
            <Text style={styles.exportText}>Export Report</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    backgroundColor: '#f0f8ff',
  },
  title: {
    fontSize: width * 0.03,
    fontWeight: 'bold',
    marginBottom: 24,
    color: '#0077BE',
    textAlign: 'start',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column60: {
    flex: 3,
    padding: 12,
    marginRight: 8,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    width: '100%',
    maxWidth: '65%',
  },
  column40: {
    flex: 2,
    padding: 12,
    backgroundColor: '#ffffff',
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '35%',
  },
  sectionHeader: {
    fontSize: width * 0.02,
    fontWeight: 'bold',
    color: '#3A86FF',
    marginBottom: 12,
  },
  inputBlock: {
    marginRight: 10,
    maxWidth: '40%',
    width: '40%'
  },
  imageCard: {
    width: '100%',
    height: height * 0.3,
    borderRadius: 10,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#d1e7ff',
    backgroundColor: '#e6f7ff',
    marginBottom: 10,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  uploadButton: {
    backgroundColor: '#A8D5BA',
    paddingVertical: 12,
    borderRadius: 8,
    width: '100%',
    marginTop: 10,
  },
  uploadText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  descriptionInput: {
    flex: 1,
    height: height * 0.3,
    borderWidth: 1,
    borderColor: '#A8D5BA',
    borderRadius: 10,
    backgroundColor: '#e0f2f1',
    padding: 12,
    textAlignVertical: 'top',
    fontSize: 16,
    color: '#0077BE',
  },
  sustainabilitySection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: '#c8e6c9',
    paddingTop: 15,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 12,
  },
  scoreCircle: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: '#A8D5BA',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 20,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#0077BE',
  },
  scoreCard1: {
    flex: 1,
    backgroundColor: '#f1f8ff',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: '#d1e7ff',
    borderWidth: 1,
  },
  scoreCard2: {
    flex: 1,
    backgroundColor: '#f1f8ff',
    padding: 12,
    marginHorizontal: 5,
    borderRadius: 10,
    borderColor: '#d1e7ff',
    borderWidth: 1,
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#0077BE',
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#0077BE',
    marginTop: 6,
  },
  insightsContainer: {
    marginBottom: 16,
    flex: 1,
  },
  insightsSubtitle: {
    fontSize: 16,
    color: '#0077BE',
    marginTop: 6,
  },
  exportButton: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#A8D5BA',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  exportText: {
    color: '#ffffff',
    fontWeight: 'bold',
  },
});
