import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  useGetAllVouchersQuery, 
  useRedeemPointsForVoucherMutation, 
  useGetUserLoyaltyPointsQuery 
} from '../../../Redux/User/apiSlice';
import { FaGift } from 'react-icons/fa';
import { GiTwoCoins } from 'react-icons/gi';
import { Modal, Spin, message } from 'antd';
import { useNavigate } from 'react-router-dom';

const OffersPage = () => {
  const userInfo = useSelector((state) => state.user.userInfo);
  const navigate = useNavigate();

  // Lấy điểm thưởng của người dùng
  const { data: loyaltyPointsData, isLoading: isPointsLoading, error: pointsError ,  refetch: refetchPoints } = useGetUserLoyaltyPointsQuery(undefined, {
    skip: !userInfo,
  });

  // Lấy danh sách voucher
  const { data: vouchers, error, isLoading, refetch } = useGetAllVouchersQuery(undefined, {
    skip: !userInfo,
  });

  const [redeemPointsForVoucher, { isLoading: isRedeeming }] = useRedeemPointsForVoucherMutation();
  const [points, setPoints] = useState('');
  const [modalVisible, setModalVisible] = useState(!userInfo);

  const handleRedeem = async () => {
    if (!points || points <= 0 || isNaN(points)) {
      message.error('Vui lòng nhập số điểm hợp lệ để đổi.');
      return;
    }
    try {
      const response = await redeemPointsForVoucher({ points: parseInt(points) }).unwrap();
      message.success(`Đổi điểm thành công! Bạn đã nhận được voucher giảm ${response.voucher.discount}%`);
      setPoints('');
      refetch(); // Refetch danh sách voucher
      refetchPoints(); 
    } catch (error) {
      message.error(error?.data?.message || 'Lỗi khi đổi điểm lấy voucher.');
    }
  };
  

  const handleModalOk = () => {
    setModalVisible(false);
    navigate('/login');
  };

  const handleModalCancel = () => {
    setModalVisible(false);
    navigate('/');
  };

  const handleUseVoucher = () => {
    navigate('/'); // Điều hướng về trang "/"
  };

  if (!userInfo) {
    return (
      <Modal
        title="Chưa đăng nhập"
        visible={modalVisible}
        onOk={handleModalOk}
        onCancel={handleModalCancel}
        okText="Đăng nhập"
        cancelText="Quay lại trang chủ"
      >
        <p>Bạn cần đăng nhập để sử dụng các ưu đãi. Hãy đăng nhập hoặc quay lại trang chủ.</p>
      </Modal>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">Ưu Đãi & Voucher</h2>

      {/* Hiển thị điểm thưởng */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center font-semibold rounded-lg p-6 mb-8 shadow-lg">
        {isPointsLoading ? (
          <Spin size="large" />
        ) : pointsError ? (
          <p className="text-red-500">Lỗi khi tải điểm thưởng</p>
        ) : (
          <>
            <h3 className="text-lg">Bạn có</h3>
            <h1 className="text-4xl font-extrabold underline">{loyaltyPointsData?.loyaltyPoints || 0}</h1>
            <p>điểm thưởng</p>
          </>
        )}
      </div>

      {/* Form đổi điểm lấy voucher */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center">
          <GiTwoCoins className="text-yellow-500 mr-2" /> Đổi Điểm Lấy Voucher
        </h3>
        <div className="flex items-center gap-4">
          <input
            type="number"
            value={points}
            onChange={(e) => setPoints(e.target.value.trim())}
            placeholder="Nhập điểm"
            className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleRedeem}
            disabled={isRedeeming}
            className={`bg-blue-600 text-white px-6 py-3 rounded-lg font-bold shadow-md ${
              isRedeeming ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-700'
            }`}
          >
            {isRedeeming ? 'Đang đổi...' : 'Đổi'}
          </button>
        </div>
        <p className="text-gray-500 text-sm mt-2">100 điểm = voucher giảm 10%</p>
      </div>

      {/* Danh sách voucher */}
      <div>
        <h3 className="text-xl font-semibold text-gray-800 mb-4">Voucher Của Bạn</h3>

        {isLoading ? (
          <div className="flex justify-center">
            <Spin size="large" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Lỗi khi tải danh sách voucher</p>
        ) : vouchers && vouchers.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {vouchers.map((voucher) => (
              <div
                key={voucher._id}
                className={`relative p-4 rounded-lg shadow-md border ${
                  voucher.isUsed ? 'bg-gray-100 border-gray-400' : 'bg-white border-blue-300'
                }`}
              >
                <FaGift className="absolute top-4 right-4 text-2xl text-yellow-400" />
                <h4 className="text-lg font-bold text-gray-800 mb-2">Mã: {voucher.code}</h4>
                <p className="text-sm text-gray-600">Giảm giá: {voucher.discount}%</p>
                <p className="text-sm text-gray-600">Số lượng: {voucher.quantity}</p>
                <p className="text-sm text-gray-600 mb-4">
                  Hạn: {new Date(voucher.expiryDate).toLocaleDateString()}
                </p>
                <button
                  onClick={handleUseVoucher} 
                  className={`w-full text-center py-2 rounded font-semibold ${
                    voucher.isUsed
                      ? 'bg-gray-400 text-white cursor-not-allowed'
                      : 'bg-blue-600 text-white hover:bg-blue-700'
                  }`}
                  disabled={voucher.isUsed}
                >
                  {voucher.isUsed ? 'Đã sử dụng' : 'Sử dụng ngay'}
                </button>
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
