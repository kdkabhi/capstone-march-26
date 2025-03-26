import axios from 'axios';

const API_URL = "http://localhost:8080/api/packages"; // Ensure this is correct

export const getPackages = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createPackage = async (packageData) => {
  const response = await axios.post(`${API_URL}/create`, packageData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
};

export const updatePackage = async (id, packageData) => {
  const response = await axios.put(`${API_URL}/update/${id}`, packageData);
  return response.data;
};

export const deletePackage = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};