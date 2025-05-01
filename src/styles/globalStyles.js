import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../constants/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    marginTop: 30,
    marginBottom: 30,
    backgroundColor: COLORS.background, // Soft background
  },
  title: {
    fontSize: width * 0.035,
    fontWeight: 'bold',
    marginBottom: 24,
    color: COLORS.primary, // Accenture purple for title
    textAlign: 'start',
  },
  row: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  inputRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  column60: {
    flex: 3,
    padding: 16,
    marginRight: 8,
    backgroundColor: COLORS.cardBackground, // White card background
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border, // Light purple border
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    width: '100%',
    maxWidth: '65%',
  },
  column40: {
    flex: 2,
    padding: 16,
    backgroundColor: COLORS.cardBackground, // White card background
    borderRadius: 16,
    borderWidth: 1,
    borderColor: COLORS.border, // Light purple border
    shadowColor: COLORS.primary,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 6,
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: '35%',
  },
  sectionHeader: {
    fontSize: width * 0.022,
    fontWeight: 'bold',
    color: COLORS.primary, // Accenture purple for headers
    marginBottom: 12,
  },
  compatibilityBlock: {
    flex: 1,
    marginLeft: 10,
  },
  inputBlock: {
    width: '50%',
  },
  imageCard: {
    width: '100%',
    height: height * 0.33,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: COLORS.border, // Light purple border
    backgroundColor: COLORS.cardBackground, // White card background
    marginBottom: 10,
  },
  placeholderImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover', // Ensure the image scales correctly
  },
  uploadButton: {
    backgroundColor: COLORS.button, // Bright purple button color
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 12,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
  },
  compatibilityButton: {
    backgroundColor: COLORS.button, // Bright purple button color
    paddingVertical: 14,
    borderRadius: 10,
    width: '100%',
    marginTop: 12,
    shadowColor: COLORS.primary,
    shadowOpacity: 0.15,
    shadowRadius: 5,
    elevation: 4,
    bottom: 0
  },
  uploadText: {
    color: COLORS.buttonText, // White text on purple button
    fontWeight: '600',
    textAlign: 'center',
    letterSpacing: 0.5,
  },
  compatibilityLabel: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 6,
    marginLeft: 6,
    marginTop: 6,
    color: COLORS.textDark, // Dark text for readability
  },
  compatibilityInput: {
    borderWidth: 1,
    borderColor: COLORS.secondary, // Lighter purple for input borders
    borderRadius: 10,
    backgroundColor: '#f0faf7',
    padding: 12,
    marginBottom: 16,
    fontSize: 14,
    color: COLORS.textDark, // Dark text inside input
  },
  descriptionLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 6,
    marginLeft: 6,
    color: COLORS.textDark, // Dark text for labels
  },
  descriptionDisplay: {
    height: height * 0.3,
    padding: 6,
    textAlignVertical: 'top',
    fontSize: 14,
    color: COLORS.textDark, // Dark text for description
  },
  descriptionDisplayView: {
    height: height * 0.18,
    fontSize: 16,
    borderWidth: 1,
    borderColor: COLORS.secondary, // Lighter purple for borders
    borderRadius: 10,
    backgroundColor: '#e0f2f1',
  },
  sustainabilitySection: {
    marginTop: 10,
    borderTopWidth: 1,
    borderColor: COLORS.border, // Light purple for section borders
    paddingTop: 15,
  },
  scoreRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    flexWrap: 'wrap',
  },
  scoreCircle: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: COLORS.accent, // Bright purple for score circles
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    borderColor: COLORS.primary, // Darker purple border
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
    marginRight: 20,
  },
  score: {
    fontSize: 32,
    fontWeight: 'bold',
    color: COLORS.buttonText, // White text for score
  },
  cardRow: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 12,
  },
  scoreCard: {
    flex: 1,
    minHeight: 100, // Ensure all score cards are the same height
    borderWidth: 1,
    borderColor: COLORS.accent, // Bright purple borders for cards
    borderRadius: 10,
    padding: 12,
    backgroundColor: COLORS.cardBackground, // White background for cards
  },
  cardTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    color: COLORS.textDark, // Dark text for card titles
  },
  cardSubtitle: {
    fontSize: 14,
    color: COLORS.textDark, // Dark text for card subtitles
    marginTop: 6,
  },
  insightsContainer: {
    marginBottom: 16,
    flex: 1,
  },
  insightsSubtitle: {
    fontSize: 16,
    color: COLORS.textDark, // Dark text for subtitles
    marginTop: 6,
  },
  exportButton: {
    alignSelf: 'flex-start',
    paddingVertical: 12,
    paddingHorizontal: 22,
    borderRadius: 10,
    backgroundColor: COLORS.button, // Purple export button
    shadowColor: COLORS.primary,
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 5,
  },
  exportText: {
    color: COLORS.buttonText, // White text on button
    fontWeight: '600',
    fontSize: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent modal overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground, // White modal background
    padding: 24,
    borderRadius: 16,
    width: '50%', // Adjust modal width
    borderColor: COLORS.accent, // Purple border for modal
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center',
    color: COLORS.primary, // Purple modal title
  },
  modalOption: {
    fontSize: 16,
    paddingVertical: 12,
    textAlign: 'center',
    color: COLORS.textDark, // Dark text for modal options
  },
  modalCancel: {
    fontSize: 14,
    paddingTop: 10,
    textAlign: 'center',
    color: COLORS.error, // Red for cancel option
  },
  checkButton: {
    backgroundColor: COLORS.button, // Purple button for check action
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  checkButtonText: {
    color: COLORS.buttonText, // White text on button
    fontWeight: 'bold',
    textAlign: 'center',
  },
  loadingOverlay: {
    position: 'absolute', // Ensures the overlay is positioned over the image
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Semi-transparent dark background
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12, // Match image container border radius
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)', // Semi-transparent overlay
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: COLORS.cardBackground, // White background for modal content
    padding: 24,
    borderRadius: 16,
    width: '70%', // Adjust modal width as needed
    borderColor: COLORS.accent, // Accent color border for the modal
    borderWidth: 1,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
    color: COLORS.primary, // Purple title color
    marginBottom: 16,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.textDark, // Dark text for the message
    marginBottom: 24,
  },
  modalCancel: {
    fontSize: 16,
    color: COLORS.primary,
    textAlign: 'center',
    padding: 12,
    fontWeight: 'bold',
  },
  inputMaterialValue: {
    fontSize: width * 0.013,
    color: COLORS.primary,
    marginBottom: 12,
    textAlignVertical: 'bottom',
  },
  speakerIcon: {
    position: 'absolute',
    top: 16,
    right: 16,
    zIndex: 10,
  },
});
