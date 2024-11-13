import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useGetUserInfoQuery, useUpdateUserProfileMutation } from '../../Redux/User/apiSlice';
import ProfileForm from './profileForm/ProfileForm';
import Notification from '../shared/Notification/Notification';
import { setCredentials } from '../../Redux/User/userSlice';

const UserProfile = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const { id } = userInfo;
  const dispatch = useDispatch();
  const { data: userData, isLoading, isError, error } = useGetUserInfoQuery(id);
  const [updateUserProfile] = useUpdateUserProfileMutation();

  const [notificationOpen, setNotificationOpen] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [notificationSeverity, setNotificationSeverity] = useState('success');
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async (e, updatedUserInfo) => {
    e.preventDefault();
    try {
      const response = await updateUserProfile({ id, userData: updatedUserInfo }).unwrap();

      dispatch(
        setCredentials({
          fullName: response.data.fullName,
          email: response.data.email,
          phoneNumber: response.data.phoneNumber,
          birthDay: response.data.birthDay,
        })
      );

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
