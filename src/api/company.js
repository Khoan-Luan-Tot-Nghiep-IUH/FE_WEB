import axios from 'axios';

// Tạo công ty
export const createCompany = async (companyData, token) => {
  try {
    const response = await axios.post('/api/companies', companyData, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};

// Lấy danh sách tất cả công ty
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

// Lấy thông tin công ty theo ID
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

export const toggleCompanyStatus = async (companyId, token) => {
  try {
    const response = await axios.patch(`/api/companies/${companyId}/status`, {}, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};


export const addCompanyAdmin = async (companyId, adminData, token) => {
  try {
    const response = await axios.post(`/api/companies/add-admin`, { companyId, ...adminData }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error.response ? error.response.data : error;
  }
};
