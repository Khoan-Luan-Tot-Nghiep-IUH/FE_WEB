import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { createCompany, getAllCompanies, toggleCompanyStatus, getCompanyById, updateCompany } from '../../../api/company';
import Notification from '../../shared/Notification/Notification'; 
import '../SuperAdminDashboard.css';
import './style.css';

const ManageCompanies = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [companies, setCompanies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);

  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const token = useSelector((state) => state.user.userInfo.token);

  useEffect(() => {
    loadCompanies();
  }, [token]);

  const loadCompanies = async () => {
    setLoading(true);
    try {
      const data = await getAllCompanies(token);
      setCompanies(data.companies);
    } catch (error) {
      showSnackbar('error', 'Không thể tải danh sách công ty. Vui lòng thử lại.');
    } finally {
      setLoading(false);
    }
  };

  const handleEditCompany = async (companyId) => {
    try {
      const companyData = await getCompanyById(companyId, token);
      fillCompanyForm(companyData.company);
      setSelectedCompanyId(companyData.company._id);
    } catch (error) {
      showSnackbar('error', 'Không thể tải thông tin công ty. Vui lòng thử lại.');
    }
  };

  const fillCompanyForm = (company) => {
    setCompanyName(company.name);
    setAddress(company.address);
    setContactInfo(company.contactInfo);
  };

  const saveCompany = async (companyId, companyData) => {
    return companyId
      ? updateCompany(companyId, companyData, token)
      : createCompany(companyData, token);
  };

  const handleCreateOrUpdateCompany = async (e) => {
    e.preventDefault();
    setCreating(true);

    try {
      const companyData = { name: companyName, address, contactInfo };
      const savedCompany = await saveCompany(selectedCompanyId, companyData);

      showSnackbar('success', `${selectedCompanyId ? 'Cập nhật' : 'Tạo'} nhà xe thành công!`);
      setCompanies((prevCompanies) =>
        selectedCompanyId
          ? prevCompanies.map((company) =>
              company._id === savedCompany.company._id ? savedCompany.company : company
            )
          : [...prevCompanies, savedCompany.company]
      );
      resetForm();
    } catch (error) {
      showSnackbar('error', 'Không thể thực hiện tác vụ. Vui lòng kiểm tra thông tin và thử lại.');
    } finally {
      setCreating(false);
    }
  };

  const handleToggleStatus = async (companyId) => {
    try {
      const updatedCompany = await toggleCompanyStatus(companyId, token);
      showSnackbar('success', `Trạng thái công ty đã được ${updatedCompany.company.isActive ? 'kích hoạt' : 'vô hiệu hóa'}!`);
      setCompanies(companies.map((company) =>
        company._id === updatedCompany.company._id ? updatedCompany.company : company
      ));
    } catch (error) {
      showSnackbar('error', 'Không thể thay đổi trạng thái công ty. Vui lòng thử lại.');
    }
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const resetForm = () => {
    setCompanyName('');
    setAddress('');
    setContactInfo('');
    setSelectedCompanyId(null);
  };

  return (
    <div className="manage-companies">
      <h2 className="section-title">{selectedCompanyId ? 'Cập nhật Nhà Xe' : 'Tạo Nhà Xe'}</h2>
      <form onSubmit={handleCreateOrUpdateCompany} className="create-company-form">
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
          {creating ? 'Đang lưu...' : selectedCompanyId ? 'Cập nhật' : 'Lưu'}
        </button>
      </form>

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
                  <button className="edit-button" onClick={() => handleEditCompany(company._id)}>
                    Sửa
                  </button>
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

      <Notification
        open={snackbarOpen}
        onClose={handleSnackbarClose}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ManageCompanies;
