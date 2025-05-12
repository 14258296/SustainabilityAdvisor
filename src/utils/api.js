import { ENDPOINTS } from '../constants/endpoints';

export const fetchSustainabilityInsights = async (finalProduct) => {
  const formData = new FormData();
  formData.append('final_product', finalProduct);

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 30000); // 30 seconds timeout

  try {
    console.log(
      `Sending request to ${ENDPOINTS.BASE_URL + ENDPOINTS.SUSTAINABILITY_ADVISOR}`
    );
    for (let pair of formData.entries()) {
      console.log(`${pair[0]}: ${pair[1]}`);
    }

    const response = await fetch(
      ENDPOINTS.BASE_URL + ENDPOINTS.SUSTAINABILITY_ADVISOR,
      {
        method: 'POST',
        body: formData,
        signal: controller.signal,
      }
    );

    clearTimeout(timeoutId);

    const json = await response.json();
    console.log('fetchSustainabilityInsights response:', json);

    if (!response.ok) {
      console.error('API Error:', json.error || 'Unknown error occurred');
      throw new Error(json.error || 'Something went wrong');
    }

    const suggestions = (json?.data?.suggestions || []).map(item => ({
      inputMaterial: item.input_material,
      description: item.description,
      detailedInsights: item.detailed_sustainability_insights,
      manufacturingGuidance: item.manufacturing_guidance,
      materialCompatibility: item.material_compatibility,
      sustainabilityScore: item.sustainability_score,
    }));

    console.log('Returning:', {
      finalProduct: json.data.final_product,
      suggestions,
    });
    
    return {
      finalProduct: json.data.final_product,
      suggestions,
    };
  } catch (error) {
    if (error.name === 'AbortError') {
      console.error('Request timed out');
      throw new Error('Request timed out');
    }
    console.error('Error during API call:', error);
    throw error;
  }
};

export const fetchGeneratedImage = async (prompt) => {
  if (!prompt || prompt.trim() === '') {
    throw new Error("The 'prompt' is required and cannot be empty.");
  }

  const body = JSON.stringify({ prompt });

  const controller = new AbortController();
  const timeoutId = setTimeout(() => {
    controller.abort();
  }, 30000); // 30 seconds timeout

  try {
    console.log(`Sending request to ${ENDPOINTS.BASE_URL + ENDPOINTS.GENERATE_IMAGE} with prompt: ${prompt}`);

    const response = await fetch(ENDPOINTS.BASE_URL + ENDPOINTS.GENERATE_IMAGE, {
      method: 'POST',
      body,
      headers: {
        'Content-Type': 'application/json',
      },
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    const json = await response.json();
    console.log('fetchGeneratedImage response:', json);

    if (!response.ok) {
      console.error('API Error:', json.error || 'Unknown error occurred');
      throw new Error(json.error || 'Something went wrong');
    }

    // Extract the URL from the response and return it
    const imageUrl = json?.data?.[0]?.url;
    if (imageUrl) {
      return {
        imageUrl,
        width: 124,
        height: 124,
      };
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

