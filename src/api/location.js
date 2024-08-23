import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000';

export const getLocations = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/locations`);
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch locations:', error);
        throw error;
    }
};

// Lấy chi tiết một địa điểm cụ thể theo ID
export const getLocationById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/locations/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch location with ID ${id}:`, error);
        throw error;
    }
};

// Tạo mới một địa điểm
export const createLocation = async (locationData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/locations`, locationData);
        return response.data.data;
    } catch (error) {
        console.error('Failed to create location:', error);
        throw error;
    }
};

// Cập nhật thông tin địa điểm theo ID
export const updateLocation = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/locations/${id}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to update location with ID ${id}:`, error);
        throw error;
    }
};

// Xóa một địa điểm theo ID
export const deleteLocation = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/locations/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to delete location with ID ${id}:`, error);
        throw error;
    }
};
