import { ENDPOINTS } from '../constants/endpoints';

export const fetchSustainabilityInsights = async (uri, finalProduct) => {
  const formData = new FormData();
  formData.append('image', {
    uri: uri,
    type: 'image/jpeg',
    name: 'image.jpg',
  });
  formData.append('final_product', finalProduct);
  
  try {
    const response = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.SUSTAINABILITY_ADVISOR, {
      method: 'POST',
      body: formData,
    });

    const data = await response.json();
    if (response.ok) {
      return data;
    } else {
      throw new Error(data.error || 'Something went wrong');
    }
  } catch (error) {
    console.error('Error during API call:', error);
    throw error; // Re-throw the error to be caught in the calling component
  }
};
