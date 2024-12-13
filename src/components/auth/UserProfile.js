import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useGetUserInfoQuery, useUpdateUserProfileMutation } from '../../Redux/User/apiSlice';
import ProfileForm from './profileForm/ProfileForm';
import Notification from '../shared/Notification/Notification';

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = userInfo || {}; // Đảm bảo không lỗi khi userInfo là undefined
  const navigate = useNavigate();
  const { data: userData, isLoading, isError, error } = useGetUserInfoQuery(id, {
    skip: !id, // Bỏ qua query nếu không có id
  });
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');
  const [isEditing, setIsEditing] = useState(false);

  const [isModalVisible, setIsModalVisible] = useState(!userInfo); // Mở modal nếu không có userInfo

  const handleSave = async (e, updatedUserInfo) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile({ id, userData: updatedUserInfo }).unwrap();

      setNotificationMessage('Cập nhật thông tin thành công!');
      setNotificationSeverity('success');
      setIsEditing(false);
    } catch (error) {
      const errorMessage = error?.data?.msg || 'Cập nhật thất bại. Vui lòng thử lại.';
      setNotificationMessage(errorMessage);
      setNotificationSeverity('error');
    } finally {
      setNotificationOpen(true);
    }
  };

  const handleNotificationClose = () => {
    setNotificationOpen(false);
  };

  const handleModalOk = () => {
    setIsModalVisible(false);
    navigate('/login');
  };

  const handleModalCancel = () => {
    setIsModalVisible(false);
    navigate('/'); 
  };

  if (!userInfo) {
    return (
      <Modal
        title="Chưa đăng nhập"
        visible={isModalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel} 
        okText="Đăng Nhập"
        cancelText="Quay lại trang chủ"
      >
        <p>Bạn cần đăng nhập để tiếp tục. Bạn muốn chuyển hướng đến trang đăng nhập hay quay lại trang chủ?</p>
      </Modal>
    );
  }

  if (isLoading) return <div className="text-center py-10">Loading...</div>;
  if (isError)
    return (
      <div className="text-center py-10 text-red-500">
        Error loading user data: {error?.data?.message || 'Unknown error'}
      </div>
    );

  return (
    <div className="container mx-auto mt-10 p-4 sm:p-6 bg-white shadow-md rounded-lg">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="w-full md:w-3/4">
          <ProfileForm
            userData={userData}
            isEditing={isEditing}
            setIsEditing={setIsEditing}
            handleSave={handleSave}
          />
        </div>
      </div>
      <Notification
        open={notificationOpen}
        onClose={handleNotificationClose}
        severity={notificationSeverity}
        message={notificationMessage}
      />
    </div>
  );
};

export default UserProfile;
