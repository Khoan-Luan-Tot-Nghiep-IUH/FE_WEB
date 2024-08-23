import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:5000/api';

// Lấy danh sách tất cả các chuyến đi
export const getTrips = async (params) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trips`, { params });
        return response.data.data;
    } catch (error) {
        console.error('Failed to fetch trips:', error);
        throw error;
    }
};

// Lấy chi tiết một chuyến đi cụ thể theo ID
export const getTripById = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trips/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to fetch trip with ID ${id}:`, error);
        throw error;
    }
};

// Tạo mới một chuyến đi
export const createTrip = async (tripData) => {
    try {
        const response = await axios.post(`${API_BASE_URL}/trips`, tripData);
        return response.data.data;
    } catch (error) {
        console.error('Failed to create trip:', error);
        throw error;
    }
};

// Cập nhật thông tin chuyến đi theo ID
export const updateTrip = async (id, updatedData) => {
    try {
        const response = await axios.put(`${API_BASE_URL}/trips/${id}`, updatedData);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to update trip with ID ${id}:`, error);
        throw error;
    }
};

// Xóa một chuyến đi theo ID
export const deleteTrip = async (id) => {
    try {
        const response = await axios.delete(`${API_BASE_URL}/trips/${id}`);
        return response.data.data;
    } catch (error) {
        console.error(`Failed to delete trip with ID ${id}:`, error);
        throw error;
    }
};

export const searchTrips = async (searchParams) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/trips/search`, { params: searchParams });
        return response.data.data;
    } catch (error) {
        console.error('Failed to search trips:', error);
        throw error;
    }
};
