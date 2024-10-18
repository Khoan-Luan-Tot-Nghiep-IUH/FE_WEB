import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout } from '../../../Redux/User/userSlice'; 

const ProfileForm = ({ userData, isEditing, setIsEditing, handleSave }) => {
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthDay, setBirthDay] = useState('');
  const [gender, setGender] = useState('');

  const dispatch = useDispatch();

  // Load thông tin người dùng từ userData
  useEffect(() => {
    if (userData && userData.data) {
      const user = userData.data;
      setFullName(user.fullName || '');
      setEmail(user.email || '');
      setPhoneNumber(user.phoneNumber || '');
      setBirthDay(user.birthDay ? user.birthDay.split('T')[0] : '');
      setGender(user.gender || '');
    }
  }, [userData]);

  // Kiểm tra lỗi 401 để xử lý token không hợp lệ
  useEffect(() => {
    if (userData?.error?.status === 401) {
      console.log('Token hết hạn hoặc không hợp lệ. Đăng xuất...');
      dispatch(logout());
      window.location.href = '/login'; // Điều hướng về trang đăng nhập
    }
  }, [userData, dispatch]);

  // Hàm xử lý khi người dùng lưu thông tin
  const handleFormSubmit = (e) => {
    e.preventDefault();
    handleSave(e, { fullName, email, phoneNumber, birthDay, gender });
  };

  return (
    <div className="w-full bg-white shadow-lg rounded-lg p-8">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Bổ sung đầy đủ thông tin để giúp hỗ trợ tốt hơn</h2>
      <form onSubmit={handleFormSubmit}>
        {/* Họ và tên */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium mb-2">Họ và tên</label>
          <input
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            disabled={!isEditing}
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing ? 'bg-gray-100' : ''
            }`}
          />
        </div>

        {/* Số điện thoại */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium mb-2">Số điện thoại</label>
          <input
            type="text"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            disabled={!isEditing}
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing ? 'bg-gray-100' : ''
            }`}
          />
        </div>

        {/* Email */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium mb-2">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={!isEditing}
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing ? 'bg-gray-100' : ''
            }`}
          />
        </div>

        {/* Ngày sinh */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium mb-2">Ngày sinh</label>
          <input
            type="date"
            value={birthDay}
            onChange={(e) => setBirthDay(e.target.value)}
            disabled={!isEditing}
            className={`w-full border border-gray-300 rounded-lg p-3 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
              !isEditing ? 'bg-gray-100' : ''
            }`}
          />
        </div>

        {/* Giới tính */}
        <div className="mb-6">
          <label className="block text-gray-700 text-base font-medium mb-2">Giới tính</label>
          <div className="flex space-x-4">
            <label className="flex items-center text-gray-700">
              <input
                type="radio"
                name="gender"
                value="Nam"
                checked={gender === 'Nam'}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className="mr-2"
              />
              Nam
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="radio"
                name="gender"
                value="Nữ"
                checked={gender === 'Nữ'}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className="mr-2"
              />
              Nữ
            </label>
            <label className="flex items-center text-gray-700">
              <input
                type="radio"
                name="gender"
                value="Khác"
                checked={gender === 'Khác'}
                onChange={(e) => setGender(e.target.value)}
                disabled={!isEditing}
                className="mr-2"
              />
              Khác
            </label>
          </div>
        </div>

        {/* Nút lưu */}
        <button
          type="submit"
          className={`w-full bg-blue-500 text-white py-2 rounded-lg font-bold transition duration-300 hover:bg-blue-600 ${
            !isEditing && 'opacity-50 cursor-not-allowed'
          }`}
          disabled={!isEditing}
        >
          Lưu
        </button>
      </form>
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="mt-4 w-full bg-gray-200 text-gray-800 py-2 rounded-lg font-bold transition duration-300 hover:bg-gray-300"
        >
          Chỉnh sửa
        </button>
      )}
    </div>
  );
};

export default ProfileForm;
