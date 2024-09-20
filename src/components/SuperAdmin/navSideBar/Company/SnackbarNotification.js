import React from 'react';
import Notification from '../../../shared/Notification/Notification';

const SnackbarNotification = ({ open, onClose, severity, message }) => {
  return (
    <Notification
      open={open}
      onClose={onClose}
      severity={severity}
      message={message}
    />
  );
};

export default SnackbarNotification;
