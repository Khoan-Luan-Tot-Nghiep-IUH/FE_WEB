import { useState, useEffect } from 'react';
import { getAllCompanies, getCompanyById, addCompanyAdmin } from '../../../../api/company';

const useManageCompanies = (token) => {
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [companyDetails, setCompanyDetails] = useState(null);

  // Lấy danh sách tất cả công ty
  useEffect(() => {
    const loadCompanies = async () => {
      try {
        setLoading(true);
        const data = await getAllCompanies(token);
        setCompanies(data.companies);
      } catch (error) {
        setError('Không thể tải danh sách công ty. Vui lòng thử lại.');
      } finally {
        setLoading(false);
      }
    };

    loadCompanies();
  }, [token]);

  // Lấy chi tiết công ty theo ID
  const fetchCompanyDetails = async (companyId) => {
    try {
      const data = await getCompanyById(companyId, token);
      setCompanyDetails(data);
    } catch (error) {
      setError('Không thể lấy chi tiết công ty. Vui lòng thử lại.');
    }
  };

  // Thêm admin cho công ty
  const addAdmin = async (companyId, adminEmail) => {
    try {
      await addCompanyAdmin(companyId, { email: adminEmail }, token);
      const updatedDetails = await getCompanyById(companyId, token); // Cập nhật lại chi tiết công ty
      setCompanyDetails(updatedDetails);
      setError(''); // Reset lỗi nếu thành công
    } catch (error) {
      setError('Không thể thêm admin. Vui lòng thử lại.');
    }
  };

  return { companies, loading, error, setCompanies, fetchCompanyDetails, addAdmin, companyDetails };
};

export default useManageCompanies;
