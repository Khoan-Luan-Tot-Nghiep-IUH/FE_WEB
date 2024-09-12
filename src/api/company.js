import axios from 'axios';

// Tạo công ty mới
export const createCompany = async (companyData, token) => {
  try {
    const response = await axios.post('/api/companies/create', companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Lấy danh sách công ty
export const getAllCompanies = async (token) => {
  try {
    const response = await axios.get('/api/companies', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Lấy chi tiết một công ty
export const getCompanyById = async (companyId, token) => {
  try {
    const response = await axios.get(`/api/companies/${companyId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Cập nhật công ty
export const updateCompany = async (companyId, companyData, token) => {
  try {
    const response = await axios.put(`/api/companies/${companyId}`, companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Vô hiệu hóa công ty
export const toggleCompanyStatus = async (companyId, token) => {
  try {
    const response = await axios.patch(`/api/companies/${companyId}/toggle-status`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
