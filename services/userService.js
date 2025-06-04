import axios from 'axios';

const USER_SERVICE_URL = process.env.USER_SERVICE_URL || 'http://localhost:3001';

export const request = async (method, endpoint, data = null) => {
  try {
    const response = await axios({
      method,
      url: `${USER_SERVICE_URL}${endpoint}`,
      data,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(error.response.data.message || 'User service error');
    } else {
      throw new Error('Unable to connect to user service');
    }
  }
};