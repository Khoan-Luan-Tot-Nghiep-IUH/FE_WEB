import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BookingForm from './ComponentBooking/BookingForm';
import BookingSummary from './ComponentBooking/BookingSummary';
import BookingConfirmation from './ComponentBooking/BookingConfirmation';
import Navbar from 'components/shared/navbar/Navbar';
import { IoIosArrowBack } from "react-icons/io";
const BookingPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { selectedSeats, totalPrice, trip } = location.state || {};

  const handleBack = () => {
    const storedParams = localStorage.getItem('searchParams');
    if (storedParams) {
      const { departureLocation, arrivalLocation, departureDate, ticketCount } = JSON.parse(storedParams);
      navigate(`/search-page?departureLocation=${encodeURIComponent(departureLocation)}&arrivalLocation=${encodeURIComponent(arrivalLocation)}&departureDate=${encodeURIComponent(departureDate)}&ticketCount=${encodeURIComponent(ticketCount)}`);
    } else {
      navigate('/search-page');
    }
  };
  const handleContinueBooking = () => {
    if (selectedSeats && totalPrice && trip) {
      navigate('/payment-methods', { state: { selectedSeats, totalPrice, trip } });
    } else {
      console.error('Dữ liệu không đầy đủ!');
    }
  };
  
  
  return (
    <div className="min-h-screen pb-0">
    <Navbar />
      <div className="container mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Back Button */}
        <div className="lg:col-span-3 mb-4">
          <button onClick={handleBack} className="text-blue-500 flex items-center mb-4">
          <IoIosArrowBack />
            Quay lại
          </button>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-2">
          <BookingForm selectedSeats={selectedSeats} totalPrice={totalPrice} trip={trip} />

          {/* Tiện ích bổ sung */}
          <div className="bg-white p-6 rounded-lg shadow-md mt-6">
            <h3 className="text-xl font-semibold mb-4">Tiện ích</h3>
            <div className="mb-4">
              <label className="flex items-center">
                <input type="checkbox" className="mr-2" />
                Bảo hiểm chuyến đi (+20.000đ/ghế)
              </label>
              <p className="text-sm text-gray-500 mt-1">
                Quyền lợi bảo hiểm lên đến 400 triệu đồng khi xảy ra tai nạn.
              </p>
            </div>

            {/* Bike Rental Section */}
            <div className="mt-4">
              <h4 className="text-lg font-semibold">Thuê xe máy</h4>
              <p className="text-sm text-gray-500 mb-4">Vexere sẽ liên hệ để xác nhận dịch vụ</p>
              <div className="flex space-x-4">
                <div className="flex-1 text-center">
                  <img src="https://229a2c9fe669f7b.cmccloud.com.vn/images/thuexe/Xe_so_110cc_-_Yamaha_Sirius.jpg" alt="Xe số 110cc" className="w-full" />
                  <p className="font-medium mt-2">Xe số 110cc</p>
                  <p className="text-gray-500 text-sm">Honda Wave RSX, Yamaha Sirius (ngẫu nhiên)</p>
                  <p className="text-red-500 font-semibold">120.000đ/ngày</p>
                </div>
                <div className="flex-1 text-center">
                  <img src="https://229a2c9fe669f7b.cmccloud.com.vn/images/thuexe/Xe_tay_ga_125cc_-_Honda_Vision_2019.jpg" alt="Xe tay ga 125cc" className="w-full" />
                  <p className="font-medium mt-2">Xe tay ga 125cc</p>
                  <p className="text-gray-500 text-sm">Dòng xe bất kỳ</p>
                  <p className="text-red-500 font-semibold">140.000đ/ngày</p>
                </div>
              </div>
              <div className="mt-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
                <p>Thuê càng lâu, giá càng rẻ!</p>
              </div>
            </div>
          </div>
        </div>

        {/* Summary Section */}
        <div className="lg:col-span-1">
          <BookingSummary totalPrice={totalPrice} selectedSeats={selectedSeats} />
          <div className="my-6"></div>
          <BookingConfirmation trip={trip} />
        </div>
      </div>

      <div className="w-full h-full bg-white shadow-md mt-6">
        <div className="container mx-auto">
          <div className="px-4 py-6 flex justify-between items-center space-x-4">
            <button  onClick={handleContinueBooking}  className="bg-blue-800 text-white font-semibold px-6 py-3 rounded-lg hover:bg-blue-900 transition duration-200 w-1/2">
              Tiếp tục đặt vé một chiều
            </button>
            <button className="bg-yellow-500 text-white font-semibold px-6 py-3 rounded-lg hover:bg-yellow-600 transition duration-200 w-1/2">
              Đặt thêm chiều về
            </button>
          </div>
          <div className="px-4 pb-6 flex justify-between items-center">
            <p className="text-sm text-gray-600">
              Bằng việc tiếp tục, bạn đồng ý với{' '}
              <a href="#" className="text-blue-500 underline">
                Chính sách bảo mật thanh toán
              </a>
              và
              <a href="#" className="text-blue-500 underline">
                Quy chế
              </a>
            </p>
            <div className="text-green-600 text-sm font-semibold">
              Đặt thêm chiều về, giảm ngay 20k!
              <a href="#" className="text-blue-500 underline">
                Chi tiết
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;