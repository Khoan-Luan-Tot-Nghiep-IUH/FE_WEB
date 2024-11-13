import React, { useState } from 'react';
import { useGetAllVouchersQuery, useRedeemPointsForVoucherMutation } from '../../../Redux/User/apiSlice';
import { FaGift, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';

const OffersPage = () => {
  const { data: vouchers, error, isLoading, refetch } = useGetAllVouchersQuery();
  const [redeemPointsForVoucher] = useRedeemPointsForVoucherMutation();
  const [points, setPoints] = useState('');
  const [message, setMessage] = useState('');

  const handleRedeem = async () => {
    if (!points || points <= 0) {
      setMessage('Vui lòng nhập số điểm hợp lệ để đổi.');
      return;
    }
    try {
      const response = await redeemPointsForVoucher({ points: parseInt(points) }).unwrap();
      setMessage(`Đổi điểm thành công! Bạn đã nhận được voucher giảm ${response.voucher.discount}%`);
      setPoints(''); // Reset điểm sau khi đổi thành công
      refetch(); // Cập nhật danh sách voucher sau khi đổi điểm
    } catch (error) {
      setMessage(error?.data?.message || 'Lỗi khi đổi điểm lấy voucher.');
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-4 sm:p-8">
      <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-4 sm:mb-6">Ưu Đãi & Voucher</h2>
      
      {/* Phần hiển thị thông báo */}
      {message && (
        <div className="text-center text-green-600 font-semibold mb-4 sm:mb-6">{message}</div>
      )}
      
      {/* Form đổi điểm lấy voucher */}
      <div className="bg-purple-100 rounded-lg p-4 sm:p-6 shadow-lg mb-6 sm:mb-8">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
          <GiTwoCoins className="text-yellow-500 mr-2" /> Đổi Điểm Lấy Voucher
        </h3>
        <div className="flex flex-col sm:flex-row items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value)}
            placeholder="Nhập số điểm"
            className="w-full sm:w-auto flex-1 p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <button
            onClick={handleRedeem}
            className="w-full sm:w-auto bg-purple-600 text-white font-bold py-3 px-6 rounded-lg hover:bg-purple-700 transition duration-300"
          >
            Đổi Điểm
          </button>
        </div>
        <p className="text-gray-600 mt-3 text-center sm:text-left">100 điểm = voucher giảm 10%</p>
      </div>

      {/* Danh sách voucher */}
      <div className="bg-white rounded-lg p-4 sm:p-6 shadow-lg">
        <h3 className="text-lg sm:text-xl font-semibold text-gray-800 mb-3 sm:mb-4 flex items-center">
          <FaGift className="text-red-500 mr-2" /> Voucher Của Bạn
        </h3>

        {isLoading ? (
          <p className="text-center text-gray-500">Đang tải danh sách voucher...</p>
        ) : error ? (
          <p className="text-center text-red-500">Lỗi khi tải danh sách voucher</p>
        ) : vouchers && vouchers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {vouchers.map((voucher) => (
              <div
                key={voucher._id}
                className="border p-4 rounded-lg shadow-sm flex items-center space-x-4"
              >
                <FaGift className="text-2xl text-purple-600" />
                <div>
                  <h4 className="text-lg font-semibold text-gray-800">Mã: {voucher.code}</h4>
                  <p className="text-gray-600">Giảm giá: {voucher.discount}%</p>
                  <p className="text-gray-600">
                    Hạn sử dụng: {new Date(voucher.expiryDate).toLocaleDateString()}
                  </p>
                  <p className="flex items-center">
                    {voucher.isUsed ? (
                      <FaCheckCircle className="text-green-500 mr-1" />
                    ) : (
                      <FaTimesCircle className="text-red-500 mr-1" />
                    )}
                    {voucher.isUsed ? 'Đã sử dụng' : 'Chưa sử dụng'}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-500">Không có voucher nào.</p>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
