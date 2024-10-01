import React, { useState } from 'react';

const Settings = () => {
  const [darkMode, setDarkMode] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);

  return (
    <div className="p-8">
      <h2 className="text-2xl font-bold mb-6">Cài đặt</h2>

      <div className="space-y-6">
        {/* Dark Mode Setting */}
        <div className="flex items-center justify-between">
          <span>Chế độ tối</span>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={() => setDarkMode(!darkMode)}
            className="form-checkbox h-6 w-6 text-blue-600"
          />
        </div>

        {/* Email Notifications */}
        <div className="flex items-center justify-between">
          <span>Thông báo qua email</span>
          <input
            type="checkbox"
            checked={emailNotifications}
            onChange={() => setEmailNotifications(!emailNotifications)}
            className="form-checkbox h-6 w-6 text-blue-600"
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
