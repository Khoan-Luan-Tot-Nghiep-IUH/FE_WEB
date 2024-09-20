import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import { createCompany, updateCompany } from '../../../api/company';
import useManageCompanies from './Company/useManageCompanies';
import CompanyForm from './Company/CompanyForm';
import SnackbarNotification from './Company/SnackbarNotification';
import './style.css';

const CompanyCard = ({ company, onClick }) => {
  return (
    <div className="company-card" onClick={onClick}>
      <h3>{company.name}</h3>
      <p>{company.address}</p>
      <p>{company.isActive ? 'Kích hoạt' : 'Vô hiệu hóa'}</p>
    </div>
  );
};

const ManageCompanies = () => {
  const [companyName, setCompanyName] = useState('');
  const [address, setAddress] = useState('');
  const [contactInfo, setContactInfo] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [modalVisible, setModalVisible] = useState(false);
  const [adminEmail, setAdminEmail] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [showAddAdmin, setShowAddAdmin] = useState(false);
  const token = useSelector((state) => state.user.userInfo.token);
  
  const { companies, loading, error, setCompanies, fetchCompanyDetails, addAdmin } = useManageCompanies(token);
  const [creating, setCreating] = useState(false);
  const modalRef = useRef(null);

  const resetForm = () => {
    setCompanyName('');
    setAddress('');
    setContactInfo('');
    setPhoneNumber('');
    setEmail('');
    setSelectedCompanyId(null);
    setAdminEmail('');
    setAdminPassword('');
    setShowAddAdmin(false);
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleCreateOrUpdateCompany = async (e) => {
    e.preventDefault();
    setCreating(true);
    try {
      const companyData = { name: companyName, address, contactInfo, phoneNumber, email };
      const savedCompany = selectedCompanyId
        ? await updateCompany(selectedCompanyId, companyData, token)
        : await createCompany(companyData, token);

      showSnackbar('success', `${selectedCompanyId ? 'Cập nhật' : 'Tạo'} công ty thành công!`);
      setCompanies((prev) =>
        selectedCompanyId
          ? prev.map((company) => (company._id === savedCompany.company._id ? savedCompany.company : company))
          : [...prev, savedCompany.company]
      );

      resetForm();
      setModalVisible(false);
    } catch (error) {
      showSnackbar('error', 'Không thể thực hiện tác vụ. Vui lòng kiểm tra thông tin và thử lại.');
    } finally {
      setCreating(false);
    }
  };

  const handleCardClick = async (company) => {
    setSelectedCompanyId(company._id);
    setCompanyName(company.name);
    setAddress(company.address);
    setContactInfo(company.contactInfo);
    setPhoneNumber(company.phoneNumber);
    setEmail(company.email);
    setModalVisible(true);
    setShowAddAdmin(true); // Hiển thị form thêm admin
    await fetchCompanyDetails(company._id);
  };

  const handleAddAdmin = async () => {
    if (adminEmail && adminPassword) {
      try {
        const response = await addAdmin(selectedCompanyId, adminEmail, adminPassword);
        showSnackbar('success', 'Thêm admin thành công!');
        resetForm(); // Hàm reset form admin
      } catch (error) {
        showSnackbar('error', error.response?.data?.message || 'Không thể thêm admin. Vui lòng kiểm tra thông tin và thử lại.');
      }
    } else {
      showSnackbar('warning', 'Vui lòng nhập email và mật khẩu.');
    }
  };
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="manage-companies">
      <h2 className="section-title">{selectedCompanyId ? 'Cập nhật Công Ty' : 'Tạo Công Ty'}</h2>
      <button className="add-company-button" onClick={() => {
        resetForm();
        setModalVisible(true);
        setShowAddAdmin(false); // Đóng form thêm admin khi tạo công ty mới
      }}>
        <i className="fas fa-plus"></i> Thêm công ty
      </button>

      {modalVisible && (
        <div className={`modal active`}>
          <div className="modal-content" ref={modalRef}>
            <span className="close" onClick={() => setModalVisible(false)}>&times;</span>
            <h3>{selectedCompanyId ? 'Cập nhật Công Ty' : 'Tạo Công Ty'}</h3>
            <CompanyForm
              companyName={companyName}
              setCompanyName={setCompanyName}
              address={address}
              setAddress={setAddress}
              contactInfo={contactInfo}
              setContactInfo={setContactInfo}
              phoneNumber={phoneNumber}
              setPhoneNumber={setPhoneNumber}
              email={email}
              setEmail={setEmail}
              handleCreateOrUpdateCompany={handleCreateOrUpdateCompany}
              creating={creating}
              selectedCompanyId={selectedCompanyId}
            />
            <button className="save-button" onClick={handleCreateOrUpdateCompany}>
              {creating ? 'Đang lưu...' : 'Lưu'}
            </button>

            {showAddAdmin && (
              <div className="add-admin-section">
                <h4>Thêm Admin cho Công Ty</h4>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Email của admin"
                />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Mật khẩu của admin"
                />
                <button onClick={handleAddAdmin}>Thêm Admin</button>
              </div>
            )}
          </div>
        </div>
      )}
      <h3 className="section-title">Danh sách các công ty</h3>
      <div className="company-cards">
        {loading ? (
          <p>Đang tải...</p>
        ) : (
          companies.map((company) => (
            <CompanyCard key={company._id} company={company} onClick={() => handleCardClick(company)} />
          ))
        )}
      </div>

      {error && <p className="error-message">{error}</p>}
      <SnackbarNotification open={snackbarOpen} onClose={() => setSnackbarOpen(false)} severity={snackbarSeverity} message={snackbarMessage} />
    </div>
  );
};

export default ManageCompanies;
