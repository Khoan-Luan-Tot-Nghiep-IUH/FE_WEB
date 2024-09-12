import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux'; // Import useSelector từ react-redux
import { createCompany, getAllCompanies, toggleCompanyStatus } from '../../../api/company'; // Import các API call
import '../SuperAdminDashboard.css'
import './style.css'
const ManageCompanies = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false); 
  const [errorMessage, setErrorMessage] = useState(''); 

  const token = useSelector((state) => state.user.userInfo.token);

  useEffect(() => {
    loadCompanies();
  }, [token]);

  const loadCompanies = async () => {
    setLoading(true); 
    setErrorMessage(''); 
    try {
      const data = await getAllCompanies(token);
      setCompanies(data.companies);
    } catch (error) {
      console.error('Lỗi khi tải danh sách công ty:', error);
      setErrorMessage('Không thể tải danh sách công ty. Vui lòng thử lại.');
    } finally {
      setLoading(false); 
    }
  };

  const handleCreateCompany = async (e) => {
    e.preventDefault();
    setCreating(true); 
    setErrorMessage(''); 
    try {
      const newCompany = await createCompany(
        {
          name: companyName,
          address,
          contactInfo,
        },
        token
      );
      alert('Nhà xe đã được tạo thành công!');
      setCompanies([...companies, newCompany.company]);
      setCompanyName('');
      setAddress('');
      setContactInfo('');
    } catch (error) {
      console.error('Lỗi khi tạo nhà xe:', error);
      setErrorMessage('Không thể tạo nhà xe. Vui lòng kiểm tra thông tin và thử lại.');
    } finally {
      setCreating(false); 
    }
  };

  const handleToggleStatus = async (companyId) => {
    setErrorMessage(''); 
    try {
      const updatedCompany = await toggleCompanyStatus(companyId, token);
      setCompanies(companies.map((company) =>
        company._id === updatedCompany.company._id ? updatedCompany.company : company
      ));
    } catch (error) {
      console.error('Lỗi khi thay đổi trạng thái công ty:', error);
      setErrorMessage('Không thể thay đổi trạng thái công ty. Vui lòng thử lại.');
    }
  };

  return (
    <div className="manage-companies">
      <h2 className="section-title">Quản lý Nhà Xe</h2>
      <form onSubmit={handleCreateCompany} className="create-company-form">
        <div className="form-group">
          <label className="form-label">Tên nhà xe:</label>
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Địa chỉ:</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <div className="form-group">
          <label className="form-label">Thông tin liên hệ:</label>
          <input
            type="text"
            value={contactInfo}
            onChange={(e) => setContactInfo(e.target.value)}
            required
            className="form-input"
          />
        </div>
        <button type="submit" className="submit-button" disabled={creating}>
          {creating ? 'Đang lưu...' : 'Lưu'}
        </button>
      </form>
      
      {errorMessage && <p className="error-message">{errorMessage}</p>}

      <h3 className="section-title">Danh sách các nhà xe</h3>
      {loading ? (
        <p>Đang tải...</p>
      ) : (
        <table className="company-table">
          <thead>
            <tr>
              <th>Tên nhà xe</th>
              <th>Địa chỉ</th>
              <th>Thông tin liên hệ</th>
              <th>Trạng thái</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            {companies.map((company) => (
              <tr key={company._id}>
                <td>{company.name}</td>
                <td>{company.address}</td>
                <td>{company.contactInfo}</td>
                <td>{company.isActive ? 'Hoạt động' : 'Đã vô hiệu hóa'}</td>
                <td>
                  <button
                    className={`status-button ${company.isActive ? 'deactivate' : 'activate'}`}
                    onClick={() => handleToggleStatus(company._id)}
                  >
                    {company.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ManageCompanies;
