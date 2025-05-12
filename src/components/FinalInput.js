import React, { useState, useEffect } from 'react';
import {
    TouchableOpacity,
    Text,
    View,
    TextInput,
    StyleSheet,
    ImageBackground,
    Dimensions
} from 'react-native';
import { styles } from '../styles/globalStyles';
import { STRINGS } from '../constants/strings';
import MaterialCommunityIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { COLORS } from '../constants/colors';
import Gauge from '../animations/Gauge';
import Icon from 'react-native-vector-icons/Ionicons';
import { Audio } from 'expo-av'; // Importing the audio API from Expo
import ImageLoader from '../animations/ImageLoader';

const FinalInput = ({ finalProductInput, submitClick, description, image, isImageLoading, materialName, score = 0, onTextChange, disposal, input_material }) => {
    const [recognizedText, setRecognizedText] = useState(finalProductInput); // Store recognized text
    const [isListening, setIsListening] = useState(false); // Track if listening is active
    const [recording, setRecording] = useState(); // Store the recording object

    // Request microphone permissions when the component mounts
    useEffect(() => {
        const requestPermissions = async () => {
            const { status } = await Audio.requestPermissionsAsync();
            if (status !== 'granted') {
                alert('Permission to access microphone is required!');
            }
        };
        requestPermissions();

        return () => {
            // Clean up any active recordings when the component unmounts
            if (recording) {
                recording.stopAndUnloadAsync();
            }
        };
    }, []);

    // Start recording audio
    const startListening = async () => {
        try {
            const { recording } = await Audio.Recording.createAsync(
                Audio.RecordingOptionsPresets.HIGH_QUALITY
            );
            setRecording(recording);
            setIsListening(true);
            await recording.startAsync(); // Start recording
        } catch (error) {
            console.error('Error starting recording:', error);
        }
    };

    // Stop recording and send the audio to the server for transcription
    const stopListening = async () => {
        if (!recording) return;

        try {
            await recording.stopAndUnloadAsync(); // Stop the recording
            const uri = recording.getURI(); // Get the URI of the recorded audio file
            setIsListening(false);
            await transcribeAudio(uri); // Transcribe the audio
        } catch (error) {
            console.error('Error stopping recording:', error);
        }
    };

    // Transcribe audio using Google Cloud Speech-to-Text API
    const transcribeAudio = async (uri) => {
        try {
            const audioData = await fetch(uri);
            const audioBlob = await audioData.blob();

            // Prepare the data to be sent to Google Cloud Speech API
            const formData = new FormData();
            formData.append('file', audioBlob);
            formData.append('config', JSON.stringify({
                encoding: 'LINEAR16',
                sampleRateHertz: 16000,
                languageCode: 'en-US',
            }));

            // Replace 'YOUR_GOOGLE_API_KEY' with your actual Google Cloud API key
            const response = await fetch('https://speech.googleapis.com/v1/speech:recognize?key=YOUR_GOOGLE_API_KEY', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();
            const transcript = result.results[0]?.alternatives[0]?.transcript || 'No transcript available';
            setRecognizedText(transcript); // Set the transcribed text
            onTextChange(transcript); // Update the text input with recognized speech
        } catch (error) {
            console.error('Error transcribing audio:', error);
        }
    };

    // Get dynamic score text color
    const getScoreTextStyle = (score) => {
        const numericScore = parseInt(score, 10); // Ensure score is a number
        if (numericScore <= 3) {
            return { color: 'red' };
        } else if (numericScore <= 6) {
            return { color: 'orange' };
        } else {
            return { color: 'green' };
        }
    };

    return (
        <View style={styles.inputBlock}>
            <View style={localStyles.twoEqualColumns}>
                <View style={localStyles.finalInputView}>
                    <TextInput
                        style={localStyles.finalProductInput}
                        placeholder={STRINGS.finalProductPlaceholder}
                        onChangeText={onTextChange}
                        value={finalProductInput}
                        multiline={true}
                    />

                    <View style={localStyles.buttonOverlay}>
                        <TouchableOpacity
                            onPress={isListening ? stopListening : startListening}
                            style={localStyles.iconButton}
                        >
                            <MaterialCommunityIcon
                                name="microphone"
                                size={24}
                                color="white"
                            />
                        </TouchableOpacity>
                        <TouchableOpacity onPress={submitClick} style={localStyles.iconButton}>
                            <MaterialCommunityIcon name="send" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </View>

                <View style={localStyles.descriptionDisplayView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                        <MaterialCommunityIcon name="text-box-outline" size={16} color={COLORS.primary} />
                        <Text style={styles.compatibilityLabel} marginLeft={4}>
                            {input_material ? `${STRINGS.description} (${input_material})` : STRINGS.description}
                        </Text>
                    </View>
                    <Text style={styles.descriptionDisplay}>
                        {description}
                    </Text>
                </View>
            </View>

            <View style={localStyles.twoEqualColumns}>
                <View style={localStyles.imageView}>
                    <ImageBackground
                        source={image && !isImageLoading ? { uri: image } : null}
                        style={localStyles.image}
                        imageStyle={{ borderRadius: 10 }}
                    >
                        {isImageLoading ? (
                        <ImageLoader />
                        ) : (
                        <Text style={styles.compatibilityLabel}>{materialName}</Text>
                        )}
                    </ImageBackground>
                </View>


                <View style={localStyles.gaugeDisposalView}>
                    <View style={{ flexDirection: 'row', alignItems: 'center', borderColor: COLORS.secondary, borderRadius: 10, borderWidth: 1, backgroundColor: '#f0faf7', height: height * 0.15, flex: 1.3, }}>
                        <View style={localStyles.gaugeView}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                <MaterialCommunityIcon name="scoreboard" size={16} color={COLORS.primary} />
                                <Text style={styles.compatibilityLabel} marginLeft={4}>
                                    Score:
                                </Text>
                            </View>
                            <Text style={[localStyles.scoreText, getScoreTextStyle(score)]}>
                                {score}
                            </Text>
                        </View>
                        <Gauge score={score} />
                    </View>

                    <View style={localStyles.disposalView}>
                        <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 6 }}>
                            <Icon name="trash" size={16} color={COLORS.primary} style={styles.sustainabilityIcon} />
                            <Text style={styles.cardTitle}>{STRINGS.disposalMethod}</Text>
                        </View>
                        <Text style={styles.cardSubtitle}>{disposal}</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default FinalInput;

const { width, height } = Dimensions.get('window');

const localStyles = StyleSheet.create({
    twoEqualColumns: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
    },
    finalProductInput: {
        flex: 1,
        paddingHorizontal: 12,
        paddingVertical: 8,
        fontSize: 14,
        color: COLORS.textDark,
        textAlignVertical: 'top',
    },
    finalInputView: {
        height: height * 0.107,
        flex: 1,
        paddingHorizontal: 8,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        backgroundColor: '#f0faf7',
        marginRight: 10,
        position: 'relative',
        justifyContent: 'flex-end',
    },
    descriptionDisplayView: {
        height: height * 0.107,
        fontSize: 16,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        backgroundColor: '#f0faf7',
        marginBottom: 10,
        flex: 1,
        paddingHorizontal: 8,
    },
    imageView: {
        height: height * 0.2,
        marginTop: 10,
        flex: 1,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        borderRadius: 10,
        backgroundColor: '#f0faf7',
        marginRight: 10,
    },
    image: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
    },
    gaugeView: {
        width: '100%',
        height: height * 0.11,
        borderRadius: 10,
        flex: 1.3,
        flexDirection: 'column',
        paddingHorizontal: 12,
        alignItems: 'start',
    },
    disposalView: {
        width: '100%',
        height: height * 0.05,
        marginTop: 10,
        borderRadius: 10,
        flex: 0.7,
        borderWidth: 1,
        borderColor: COLORS.secondary,
        backgroundColor: '#f0faf7',
        padding: 12,
    },
    buttonOverlay: {
        position: 'absolute',
        bottom: 8,
        right: 0,
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 8,
    },
    iconButton: {
        backgroundColor: COLORS.primary,
        marginLeft: 8,
        padding: 8,
        borderRadius: 50,
    },
    gaugeDisposalView: {
        width: '100%',
        height: height * 0.2,
        marginTop: 10,
        flex: 1,
    },
    scoreText: {
        padding: 6,
        fontSize: 50,
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
