import React, { useState, useEffect, useRef } from 'react';
import {
  useAddCompanyAdminMutation,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useGetCompaniesQuery,
  useToggleCompanyStatusMutation,
} from '../../../Redux/Company/companyApiSlice';
import CompanyForm from './Company/CompanyForm';
import SnackbarNotification from './Company/SnackbarNotification';
import CompanyCard from './Company/CompanyCard';

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
  const [adminUserName, setAdminUserName] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [adminPhoneNumber, setAdminPhoneNumber] = useState('');
  const [adminEmail, setAdminEmail] = useState('');
  const [showAddAdmin, setShowAddAdmin] = useState(false);

  const { data: companiesData, isLoading: isCompaniesLoading, error: companiesError } = useGetCompaniesQuery();
  const [createCompany, { isLoading: isCreating }] = useCreateCompanyMutation();
  const [updateCompany] = useUpdateCompanyMutation();
  const [toggleCompanyStatus] = useToggleCompanyStatusMutation();
  const [addCompanyAdmin, { isLoading: isAddingAdmin }] = useAddCompanyAdminMutation();

  const [companies, setCompanies] = useState([]);

  useEffect(() => {
    if (companiesData) {
      setCompanies(companiesData.companies);
    }
  }, [companiesData]);

  const modalRef = useRef(null);

  const resetForm = () => {
    setCompanyName('');
    setAddress('');
    setContactInfo('');
    setPhoneNumber('');
    setEmail('');
    setSelectedCompanyId(null);
    setAdminUserName('');
    setAdminPassword('');
    setAdminEmail('');
    setAdminPhoneNumber('');
    setShowAddAdmin(false);
  };

  const showSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

  const handleToggleStatus = async (companyId) => {
    try {
        const updatedCompany = await toggleCompanyStatus(companyId).unwrap();
        setCompanies((prevCompanies) =>
            prevCompanies.map((company) =>
                company._id === updatedCompany.company._id ? updatedCompany.company : company
            )
        );
        
        // Hiển thị thông báo khi thay đổi trạng thái công ty thành công
        showSnackbar(
            'success',
            `Công ty ${updatedCompany.company.isActive ? 'đã được kích hoạt' : 'đã bị vô hiệu hóa'} và tất cả các tài khoản liên quan cũng được cập nhật trạng thái.`
        );
    } catch (error) {
        showSnackbar('error', 'Không thể thay đổi trạng thái công ty.');
    }
};

  const handleCreateOrUpdateCompany = async (e) => {
    e.preventDefault();
    try {
      const companyData = { name: companyName, address, contactInfo, phoneNumber, email };

      if (selectedCompanyId) {
        const updatedCompany = await updateCompany({ companyId: selectedCompanyId, updatedData: companyData }).unwrap();
        setCompanies((prevCompanies) =>
          prevCompanies.map((company) =>
            company._id === updatedCompany.company._id ? updatedCompany.company : company
          )
        );
        showSnackbar('success', 'Cập nhật công ty thành công!');
      } else {
        const newCompany = await createCompany(companyData).unwrap();
        setCompanies((prevCompanies) => [...prevCompanies, newCompany.company]);
        showSnackbar('success', 'Tạo công ty thành công!');
      }

      resetForm();
      setModalVisible(false);
      document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
    } catch (error) {
      showSnackbar('error', 'Không thể thực hiện tác vụ. Vui lòng kiểm tra thông tin và thử lại.');
    }
  };

  const handleCardClick = (company) => {
    setSelectedCompanyId(company._id);
    setCompanyName(company.name);
    setAddress(company.address);
    setContactInfo(company.contactInfo);
    setPhoneNumber(company.phoneNumber);
    setEmail(company.email);
    setModalVisible(true);
    setShowAddAdmin(true);
    document.body.style.overflow = 'hidden';
  };

  const handleAddAdmin = async () => {
    if (adminUserName && adminPassword) {
      try {
        await addCompanyAdmin({
          companyId: selectedCompanyId,
          userName: adminUserName,
          password: adminPassword,
          email: adminEmail,         
          phoneNumber: adminPhoneNumber
        }).unwrap();
        showSnackbar('success', 'Thêm admin thành công!');
        resetForm();
      } catch (error) {
        showSnackbar('error', error?.data?.message || 'Không thể thêm admin. Vui lòng kiểm tra thông tin và thử lại.');
      }
    } else {
      showSnackbar('warning', 'Vui lòng nhập tên đăng nhập và mật khẩu.');
    }
  };

  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      setModalVisible(false);
      document.body.style.overflow = 'hidden'; // Re-enable scrolling when modal is closed
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="manage-companies bg-gradient-to-r from-blue-50 to-blue-100 min-h-screen p-8">
      <h2 className="text-3xl font-bold mb-4">{selectedCompanyId ? 'Cập nhật Công Ty' : 'Tạo Công Ty'}</h2>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-6"
        onClick={() => {
          resetForm();
          setModalVisible(true);
          setShowAddAdmin(false);
          document.body.style.overflow = 'hidden'; 
        }}
      >
        <i className="fas fa-plus"></i> Thêm công ty
      </button>

      {/* Modal for creating/updating company */}
      {modalVisible && (
        <div className="fixed inset-y-0 right-0 bg-white shadow-lg z-50 w-1/4 overflow-y-auto" ref={modalRef}>
          <div className="p-6 relative">
            <span
              className="absolute top-2 right-4 text-gray-500 cursor-pointer hover:text-gray-700 transition"
              onClick={() => {
                setModalVisible(false);
                document.body.style.overflow = 'auto'; // Re-enable scrolling when modal is closed
              }}
            >
              &times;
            </span>
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
              creating={isCreating}
              selectedCompanyId={selectedCompanyId}
            />
            {showAddAdmin && (
              <div className="mt-8">
                <h4 className="text-lg font-semibold mb-4">Thêm Admin cho Công Ty</h4>
                <input
                  type="text"
                  value={adminUserName}
                  onChange={(e) => setAdminUserName(e.target.value)}
                  placeholder="Tên Đăng Nhập của admin"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Mật khẩu của admin"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                 <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  placeholder="Email của admin"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />

                  <input
                  type="text"
                  value={adminPhoneNumber}
                  onChange={(e) => setAdminPhoneNumber(e.target.value)}  
                  placeholder="Số điện thoại của admin"
                  className="w-full p-2 border border-gray-300 rounded-md mb-4"
                />
                <button
                  onClick={handleAddAdmin}
                  disabled={isAddingAdmin}
                  className="bg-green-500 text-white w-full py-2 rounded-lg hover:bg-green-600 transition duration-300"
                >
                  {isAddingAdmin ? 'Đang thêm...' : 'Thêm Admin'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      <h3 className="text-xl font-semibold mt-8 mb-4">Danh sách các công ty</h3>
      <div className="company-cards grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {isCompaniesLoading ? (
          <p>Đang tải...</p>
        ) : (
          companies.map((company) => (
            <CompanyCard
              key={company._id}
              company={company}
              onClick={() => handleCardClick(company)}
              onToggleStatus={handleToggleStatus}
            />
          ))
        )}
      </div>

      {companiesError && <p className="text-red-500 mt-4">{companiesError}</p>}
      <SnackbarNotification
        open={snackbarOpen}
        onClose={() => setSnackbarOpen(false)}
        severity={snackbarSeverity}
        message={snackbarMessage}
      />
    </div>
  );
};

export default ManageCompanies;
