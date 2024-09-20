import React from 'react';
import "./index.css"
const CompanyForm = ({ 
  companyName, 
  setCompanyName, 
  address, 
  setAddress, 
  contactInfo, 
  setContactInfo, 
  phoneNumber, 
  setPhoneNumber, 
  email, 
  setEmail, 
  handleCreateOrUpdateCompany, 
  creating, 
  selectedCompanyId 
}) => {
  return (
    <form onSubmit={handleCreateOrUpdateCompany} className="create-company-form">
      <div className="form-group">
        <label className="form-label">Tên công ty:</label>
        <input type="text" value={companyName} onChange={(e) => setCompanyName(e.target.value)} required className="form-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Địa chỉ:</label>
        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} required className="form-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Thông tin liên hệ:</label>
        <input type="text" value={contactInfo} onChange={(e) => setContactInfo(e.target.value)} required className="form-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Số điện thoại:</label>
        <input type="text" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} required className="form-input" />
      </div>
      <div className="form-group">
        <label className="form-label">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="form-input" />
      </div>
      <button type="submit" className="submit-button" disabled={creating}>
        {creating ? 'Đang lưu...' : selectedCompanyId ? 'Cập nhật' : 'Lưu'}
      </button>
    </form>
  );
};

export default CompanyForm;
