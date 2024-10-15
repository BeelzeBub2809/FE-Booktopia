import { API } from '../constants/api.js';
const get = async (path) => {
  try {
    const response = await fetch(`${API.URL}${path}`, {
      method: 'GET',
      credentials: 'include',
    });
    if (!response.ok) {
      const errorMessage = await response.text();
      throw new Error(`Error: ${response.status} ${response.statusText} - ${errorMessage}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

const post = async (path, data) => {
  try {
    const response = await fetch(`${API.URL}${path}`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};

const put = async (path, data) => {
  try {
    const response = await fetch(`${API.URL}${path}`, {
      method: 'PUT',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    return await response.json();
  } catch (error) {
    console.error('Error updating data:', error);
    throw error;
  }
};

const del = async (path) => {
  try {
    const response = await fetch(`${API.URL}${path}`, {
      method: 'DELETE',
      credentials: 'include'
    });
    return await response.json();
  } catch (error) {
    console.error('Error deleting data:', error);
    throw error;
  }
};

export const Hooks = {
  get,
  post,
  put,
  del
}