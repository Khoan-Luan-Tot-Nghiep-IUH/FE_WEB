import React, { useState, useEffect } from 'react';
import { useGetBookingHistoryQuery, useCancelBookingMutation } from '../../Redux/Booking/bookingApiSlice';
import { useCreateCompanyFeedbackMutation } from '../../Redux/User/apiSlice';
import { MdLocationOn, MdDateRange, MdChair, MdConfirmationNumber } from 'react-icons/md';
import Notification from '../shared/Notification/Notification';
import { useLocation } from 'react-router-dom';
import { Modal, Button } from 'antd';
import { FaCalendarAlt, FaMoneyBillAlt } from 'react-icons/fa';
import './loading-overlay.css';
const ITEMS_PER_PAGE = 5;

const TicketBookingPage = () => {
  const [groupedBookings, setGroupedBookings] = useState([]);
  const [bookingCounts, setBookingCounts] = useState({ current: 0, completed: 0, canceled: 0 });
  const [activeTab, setActiveTab] = useState('current');
  const [currentPage, setCurrentPage] = useState(1);
  const { data, isLoading, isError, refetch } = useGetBookingHistoryQuery();
  const [cancelBooking] = useCancelBookingMutation();
  const location = useLocation();
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalData, setModalData] = useState(null);


  const [reviewModalVisible, setReviewModalVisible] = useState(false);
  const [reviewBooking, setReviewBooking] = useState(null);
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState('');
  const [submitReview] = useCreateCompanyFeedbackMutation();

  const handleReview = (booking) => {
    setReviewBooking(booking);
    setReviewModalVisible(true);
  };
  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setReviewBooking((prev) => ({
      ...prev,
      images: files,
    }));
  };
  
  const handleReviewSubmit = async () => {
    if (!reviewBooking || !reviewBooking.trip?.companyId) {
      showNotification('error', 'Không thể đánh giá. Vui lòng thử lại!');
      return;
    }
    setLoading(true);
    try {

      const formData = new FormData();
      formData.append('companyId', reviewBooking.trip.companyId._id || reviewBooking.trip.companyId);
      formData.append('rating', rating);
      formData.append('comment', comment);

      if (reviewBooking.images && reviewBooking.images.length > 0) {
        reviewBooking.images.forEach((file) => {
          formData.append('images', file);
        });
      }
  
      // Gửi FormData qua mutation
      await submitReview(formData).unwrap();
      setReviewModalVisible(false);
      setRating(5);
      setComment('');
      showNotification('success', 'Đánh giá thành công!');
      refetch();
    } catch (error) {
      showNotification('error', `Lỗi khi đánh giá: ${error.message}`);
    }
    finally {
      setLoading(false); 
    }
  };
  

  const handleReviewCancel = () => {
    setReviewModalVisible(false);
    setRating(5);
    setComment('');
  };


  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const success = params.get('success');
    const message = params.get('message');
    if (success === 'true' && message) {
      setNotification({
        open: true,
        severity: 'success',
        message,
      });
    }
  }, [location]);


  useEffect(() => {
    if (location.state) {
        const { orderCode, trip, seatNumbers, totalPrice, paymentMethod } = location.state;
        setModalData({
            orderCode,
            trip,
            seatNumbers,
            totalPrice,
            paymentMethod,
        });
        setModalVisible(true);
    }
}, [location]);

const handleModalClose = () => {
  setModalVisible(false);
};


  const [notification, setNotification] = useState({
    open: false,
    severity: 'info',
    message: '',
  });

  const showNotification = (severity, message) => {
    setNotification({ open: true, severity, message });
  };

  const handleNotificationClose = () => {
    setNotification((prev) => ({ ...prev, open: false }));
  };

  useEffect(() => {
    if (data?.success) {
      const bookingsByStatus = data.data.reduce((acc, booking) => {
        const date = new Date(booking.bookingDate).toLocaleDateString();
  
        let statusGroup;
        if (booking.trip?.status === 'Scheduled' && booking.status === 'Confirmed') {
          statusGroup = 'current';
        } else if (booking.trip?.status === 'Completed' && booking.status === 'Confirmed') {
          statusGroup = 'completed';
        } else if (booking.status === 'Cancelled') {
          statusGroup = 'canceled';
        }

        if (statusGroup) {
          if (!acc[statusGroup]) acc[statusGroup] = {};
          if (!acc[statusGroup][date]) acc[statusGroup][date] = [];
          acc[statusGroup][date].push(booking);
        }

        return acc;
      }, {});

      setGroupedBookings(bookingsByStatus);

      setBookingCounts({
        current: bookingsByStatus.current ? Object.values(bookingsByStatus.current).flat().length : 0,
        completed: bookingsByStatus.completed ? Object.values(bookingsByStatus.completed).flat().length : 0,
        canceled: bookingsByStatus.canceled ? Object.values(bookingsByStatus.canceled).flat().length : 0,
      });
    }
  }, [data]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleCancelBooking = async (bookingId) => {
    try {
      await cancelBooking(bookingId).unwrap();
      showNotification('success', 'Hủy vé thành công!');
      refetch();
    } catch (error) {
      showNotification('error', `Lỗi khi hủy vé: ${error.message}`);
    }
  };

  if (isLoading) return <p>Loading...</p>;
  if (isError || !data?.success)
    return (
      <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
        <p>
          Bạn chưa có lịch sử đặt vé nào. <a href="/" className="text-blue-600">Đặt vé ngay!</a>
        </p>
      </div>
    );

  const renderBookings = (tab) => {
    const bookingsList = groupedBookings[tab];
    if (!bookingsList || Object.keys(bookingsList).length === 0) {
      return (
        <p className="text-gray-600">
          {tab === 'current'
            ? "Bạn chưa có chuyến sắp đi nào. "
            : tab === 'completed'
            ? "Bạn chưa có chuyến nào đã hoàn thành."
            : "Bạn chưa có vé nào đã hủy."}
          {tab === 'current' && <a href="/book" className="text-blue-600">Đặt chuyến đi ngay!</a>}
        </p>
        
      );
    }

    const groupedBookingsArray = Object.entries(bookingsList);
    const totalPages = Math.ceil(groupedBookingsArray.length / ITEMS_PER_PAGE);
    const paginatedGroupedBookings = groupedBookingsArray.slice(
      (currentPage - 1) * ITEMS_PER_PAGE,
      currentPage * ITEMS_PER_PAGE
    );

    return (
      <>
        {paginatedGroupedBookings.map(([date, bookings]) => (
          <div key={date} className="mb-8">
            <h3 className="text-lg font-semibold text-gray-700 mb-4">{date}</h3>
            {bookings.map((booking) => (
              <BookingCard key={booking._id} booking={booking}  activeTab={activeTab} onCancel={handleCancelBooking}  onReview={handleReview} />
            ))}
            
          </div>
        ))}
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          onNextPage={handleNextPage}
          onPrevPage={handlePrevPage}
        />
      </>
    );
  };

  return (
    <div className="container mx-auto mt-10 bg-white shadow-md rounded-lg p-8">
      <div className="border-b border-gray-300 mb-6">
        <nav className="flex justify-center space-x-8">
          {['current', 'completed', 'canceled'].map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setCurrentPage(1);
              }}
              className={`py-3 px-4 text-lg font-semibold ${
                activeTab === tab ? 'text-blue-600 border-b-2 border-blue-500' : 'text-gray-600'
              }`}
            >
              {tab === 'current'
                ? `Hiện tại (${bookingCounts.current})`
                : tab === 'completed'
                ? `Đã đi (${bookingCounts.completed})`
                : `Đã hủy (${bookingCounts.canceled})`}
            </button>
          ))}
        </nav>
      </div>
      <div>{renderBookings(activeTab)}</div>
      <Modal
                title="Thông Tin Đơn Hàng"
                visible={modalVisible}
                onOk={handleModalClose}
                onCancel={handleModalClose}
                okText="Xác nhận"
                cancelText="Đóng"
            >
                {modalData && (
                <div className="space-y-8 text-gray-700">
                  <div className="flex items-center">
                    <p className="font-medium text-gray-500 mr-2">Mã đơn hàng:</p>
                    <p className="text-lg font-semibold">{modalData.orderCode}</p>
                  </div>
                  <div className="flex items-center">
                    <MdChair className="text-blue-500 mr-2" />
                    <p className="font-medium text-gray-500 mr-2">Ghế:</p>
                    <p className="text-lg font-semibold">{modalData.seatNumbers.join(', ')}</p>
                  </div>

                  <div className="flex items-center">
                    <FaMoneyBillAlt className="text-green-500 mr-2" />
                    <p className="font-medium text-gray-500 mr-2">Tổng tiền:</p>
                    <p className="text-lg font-bold text-green-600">{modalData.totalPrice.toLocaleString()} VND</p>
                  </div>

                  <div className="flex items-center">
                    <FaCalendarAlt className="text-gray-500 mr-2" />
                    <p className="font-medium text-gray-500 mr-2">Phương thức thanh toán:</p>
                    <p className="text-lg font-semibold">
                      {modalData.paymentMethod === 'OnBoard' ? 'Thanh toán khi lên xe' : 'Thanh toán online'}
                    </p>
                  </div>
                </div>
              )}
            </Modal>


            <Modal
  title={
    <div className="modal-header">
      <h2 className="text-xl font-bold text-blue-600">Đánh giá chuyến đi</h2>
    </div>
  }
  visible={reviewModalVisible}
  onOk={handleReviewSubmit}
  onCancel={handleReviewCancel}
  okText="Gửi"
  cancelText="Hủy"
  okButtonProps={{ disabled: loading }}
  confirmLoading={loading}
>
  <div className="space-y-6">
    {/* Đánh giá sao */}
    <div>
      <p className="text-lg font-medium text-gray-700">Đánh giá:</p>
      <input
        type="number"
        value={rating}
        onChange={(e) => setRating(e.target.value)}
        min={1}
        max={5}
        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
        placeholder="Nhập từ 1 đến 5 sao"
      />
    </div>

    {/* Nhận xét */}
    <div>
      <p className="text-lg font-medium text-gray-700">Nhận xét:</p>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
        placeholder="Hãy viết cảm nhận của bạn..."
      />
    </div>

    {/* Khu vực tải ảnh */}
    <div>
      <p className="text-lg font-medium text-gray-700">Hình ảnh:</p>
      <input
        type="file"
        multiple
        onChange={handleImageChange}
        className="w-full border border-gray-300 rounded-lg p-2 mt-2"
      />
      <div className="image-preview mt-4 grid grid-cols-3 gap-4">
        {reviewBooking?.images &&
          reviewBooking.images.map((file, index) => (
            <img
              key={index}
              src={URL.createObjectURL(file)}
              alt={`Preview ${index}`}
              className="w-full h-20 object-cover rounded-lg shadow-sm"
            />
          ))}
      </div>
    </div>
  </div>
</Modal>
      <Notification
        open={notification.open}
        onClose={handleNotificationClose}
        severity={notification.severity}
        message={notification.message}
      />
    </div>
  );
  };

const BookingCard = ({ booking, onCancel , onReview , activeTab }) => {
  const departureLocation = booking.trip?.departureLocation?.name || 'N/A';
  const arrivalLocation = booking.trip?.arrivalLocation?.name || 'N/A';
  const departureTime = booking.trip?.departureTime ? new Date(booking.trip.departureTime) : null;

  return (
    <div className="bg-gray-50 shadow-lg rounded-lg p-6 mb-4 transition-transform transform hover:scale-105">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-xl font-semibold text-gray-800 flex items-center">
            <MdLocationOn className="text-blue-500 mr-2" />
            {departureLocation} → {arrivalLocation}
          </h3>
          <p className="text-sm text-gray-600 flex items-center mt-1">
            <MdDateRange className="text-blue-500 mr-2" />
            {departureTime ? `${departureTime.toLocaleDateString()} - ${departureTime.toLocaleTimeString()}` : 'Thời gian không có sẵn'}
          </p>
        </div>
        <span className={`px-3 py-1 text-xs rounded-full font-semibold ${
          booking.status === 'Confirmed' ? 'bg-green-100 text-green-600' :
          booking.status === 'Completed' ? 'bg-blue-100 text-blue-600' : 'bg-red-100 text-red-600'
        }`}>
          {booking.status}
        </span>
      </div>
      <div className="mt-4 flex justify-between items-center">
        <div>
          <div className="flex items-center text-gray-700 mb-2">
            <MdChair className="text-blue-500 mr-2" />
            <span className="font-semibold">Ghế:</span> {booking.seatNumbers.join(', ')}
          </div>
          <div className="flex items-center text-gray-700 mb-2">
            <span className="text-blue-500 mr-2">💲</span>
            <span className="font-semibold">Giá vé:</span> {booking.totalPrice.toLocaleString()} VND
          </div>
          <div className="flex items-center text-gray-700">
            <MdConfirmationNumber className="text-blue-500 mr-2" />
            <span className="font-semibold">Mã đặt vé:</span> {booking.orderCode}
          </div>
        </div>
        {booking.status === 'Confirmed' && activeTab !== 'completed' && (
          <button
            onClick={() => onCancel(booking._id)}
            className="bg-red-500 text-white px-4 py-2 rounded-lg"
          >
            Hủy vé
          </button>
        )}
        {activeTab === 'completed' && (
          <button
            onClick={() => onReview(booking)}
            className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
          >
            Đánh giá
          </button>
        )}
      </div>
    </div>
  );
};

const Pagination = ({ totalPages, currentPage, onPageChange, onNextPage, onPrevPage }) => {
  return (
    <div className="flex justify-center mt-6 space-x-2">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className={`px-3 py-1 rounded-lg ${currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Quay lại
      </button>
      {[...Array(totalPages).keys()].map((page) => (
        <button
          key={page + 1}
          onClick={() => onPageChange(page + 1)}
          className={`px-3 py-1 rounded-lg ${
            page + 1 === currentPage ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-700'
          }`}
        >
          {page + 1}
        </button>
      ))}
      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className={`px-3 py-1 rounded-lg ${currentPage === totalPages ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 text-white'}`}
      >
        Trang tiếp
      </button>
    </div>
  );
};

export default TicketBookingPage;
