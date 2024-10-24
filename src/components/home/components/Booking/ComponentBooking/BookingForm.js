import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Check } from 'lucide-react';

const BookingForm = ({ selectedSeats, totalPrice, trip, onSubmit }) => {
  const userInfo = useSelector((state) => state.user.userInfo);

  const [contactInfo, setContactInfo] = useState({
    name: '',
    phone: '',
    email: '',
    countryCode: '+84',
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (userInfo) {
      setContactInfo({
        name: userInfo.fullName || '',
        phone: userInfo.phoneNumber || '',
        email: userInfo.email || '',
        countryCode: '+84',
      });
    }
  }, [userInfo]);

  const validate = () => {
    const newErrors = {};
    const phoneRegex = /^[0-9]{9,10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!contactInfo.name.trim()) {
      newErrors.name = 'Tên không được để trống';
    }

    if (!phoneRegex.test(contactInfo.phone)) {
      newErrors.phone = 'Số điện thoại không hợp lệ';
    }

    if (!emailRegex.test(contactInfo.email)) {
      newErrors.email = 'Email không hợp lệ';
    }

    return newErrors;
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const newErrors = validate();
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
    } else {
      setErrors({});
      if (onSubmit) {
        onSubmit(contactInfo);
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h3 className="text-lg font-medium mb-4">Thông tin liên hệ</h3>

      <form onSubmit={handleFormSubmit} className="space-y-4">
        {/* Tên người đi */}
        <div>
          <label className="block text-sm mb-2">
            Tên người đi <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            value={contactInfo.name}
            onChange={(e) => setContactInfo({ ...contactInfo, name: e.target.value })}
            className={`w-full px-3 py-2.5 border rounded-lg ${
              errors.name ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-sm mb-2">
            Số điện thoại <span className="text-red-500">*</span>
          </label>
          <div className="flex gap-2">
            <button
              type="button"
              className="w-[110px] px-3 py-2.5 border border-gray-200 rounded-lg bg-white flex items-center justify-between"
            >
              <span>VN +84</span>
              <span className="text-gray-400">▼</span>
            </button>
            <input
              type="tel"
              value={contactInfo.phone}
              onChange={(e) => setContactInfo({ ...contactInfo, phone: e.target.value })}
              className={`flex-1 px-3 py-2.5 border rounded-lg ${
                errors.phone ? 'border-red-500' : 'border-gray-200'
              }`}
            />
          </div>
          {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm mb-2">
            Email để nhận thông tin đặt chỗ <span className="text-red-500">*</span>
          </label>
          <input
            type="email"
            value={contactInfo.email}
            onChange={(e) => setContactInfo({ ...contactInfo, email: e.target.value })}
            className={`w-full px-3 py-2.5 border rounded-lg ${
              errors.email ? 'border-red-500' : 'border-gray-200'
            }`}
          />
          {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
        </div>

        {/* Thông báo */}
        <div className="p-4 bg-green-50 border border-green-100 rounded-lg text-sm text-gray-600 flex items-start gap-2">
          <Check className="w-5 h-5 text-green-500 mt-0.5" />
          <span>
            Số điện thoại và email được sử dụng để gửi thông tin đơn hàng và liên hệ khi cần thiết.
          </span>
        </div>
      </form>
    </div>
  );
};

export default BookingForm;