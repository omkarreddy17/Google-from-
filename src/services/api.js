/**
 * API Service Layer for Student Registration Form
 * 
 * This service handles HTTP requests related to students.
 * Currently, it is a placeholder that logs the submission and resolves successfully.
 * Once the backend is implemented with Express and MongoDB, update the base URL
 * and uncomment the fetch request to connect to the database.
 */

// Base URL for the backend API
// For local development, this could be 'http://localhost:5000' or handled via a proxy
const API_BASE_URL = '';

/**
 * Submits student registration data to the backend database.
 * 
 * Future compatibility:
 * - Make sure the backend endpoint is configured to accept POST requests at '/api/students'.
 * - Ensure body-parser middleware (or express.json()) is active in Express to parse JSON data.
 * - The MongoDB document will be saved via Mongoose.
 * 
 * @param {Object} data - The student form data object
 * @returns {Promise<Object>} The response from the server or mock success response
 */
export async function submitStudentData(data) {
  console.log('API Service: Submitting student registration data:', data);

  // In production, uncomment the fetch logic below to communicate with the Node/Express backend:
  /*
  const response = await fetch(`${API_BASE_URL}/api/students`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(errorText || 'Failed to submit student registration data.');
  }

  return await response.json();
  */

  // Mocking database integration delay and a successful response for the frontend code
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('API Service: Mock registration stored successfully.');
      resolve({ success: true, message: 'Student registered successfully' });
    }, 500);
  });
}
