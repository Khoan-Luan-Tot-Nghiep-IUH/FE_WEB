import React from 'react';
import { useLocation } from 'react-router-dom';
import { FaMoneyCheckAlt, FaQrcode, FaCar, FaPercentage, FaTicketAlt, FaMapMarkerAlt, FaClock } from 'react-icons/fa'; // Import icons from React Icons

const PaymentMethods = () => {
    const location = useLocation();
    const { selectedSeats, totalPrice, trip } = location.state || {};

    return (
        <div className="flex flex-col lg:flex-row justify-between p-6 bg-gray-100 min-h-screen">
            {/* Phương thức thanh toán */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
                <h1 className="text-xl font-semibold mb-4">Phương thức thanh toán</h1>

                {/* QR chuyển khoản/Ví điện tử */}
                <div className="mb-6 border border-gray-300 rounded p-4 hover:shadow-md transition-shadow duration-200 flex items-center">
                    <FaQrcode className="text-2xl text-blue-500 mr-3" /> {/* Icon for QR */}
                    <input type="radio" id="qr" name="payment" className="mr-3" />
                    <label htmlFor="qr" className="text-lg font-medium">QR chuyển khoản/ Ví điện tử</label>
                    <div className="ml-8 text-sm text-gray-500 mt-2">
                        <p>Hỗ trợ nhiều ví điện tử & 42 ngân hàng</p>
                    </div>
                </div>

                {/* Thanh toán khi lên xe */}
                <div className="mb-6 border border-gray-300 rounded p-4 hover:shadow-md transition-shadow duration-200 flex items-center">
                    <FaCar className="text-2xl text-green-500 mr-3" /> {/* Icon for Onboarding Payment */}
                    <input type="radio" id="onboard" name="payment" className="mr-3" />
                    <label htmlFor="onboard" className="text-lg font-medium">Thanh toán khi lên xe</label>
                    <p className="ml-8 text-sm text-gray-500 mt-2">Bạn có thể thanh toán cho tài xế khi lên xe</p>
                </div>

                {/* Thẻ thanh toán quốc tế */}
                <div className="mb-6 border border-gray-300 rounded p-4 hover:shadow-md transition-shadow duration-200 flex items-center">
                    <FaMoneyCheckAlt className="text-2xl text-purple-500 mr-3" /> {/* Icon for Credit Card */}
                    <input type="radio" id="card" name="payment" className="mr-3" />
                    <label htmlFor="card" className="text-lg font-medium">Thẻ thanh toán quốc tế</label>
                </div>

                {/* Hướng dẫn thanh toán */}
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-700 p-4 rounded-lg mt-4 flex items-center">
                    <FaTicketAlt className="text-2xl text-yellow-500 mr-3" /> {/* Icon for Important Information */}
                    <p>Hãy hủy vé khi không còn nhu cầu di chuyển. Chúng tôi sẽ yêu cầu bạn thanh toán trước cho những lần sau nếu bạn đặt vé nhưng không đi.</p>
                </div>
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                {/* Tổng tiền */}
                <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Tổng tiền</h2>
                        <p className="text-3xl font-bold text-blue-600">{totalPrice ? `${totalPrice.toLocaleString('vi-VN')} VND` : 'Chưa có thông tin giá'}</p>
                    </div>
                    <FaMoneyCheckAlt className="text-4xl text-blue-600" /> {/* Icon for Total Price */}
                </div>

                {/* Mã giảm giá */}
                <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
                    <h2 className="text-lg font-semibold text-gray-700 mb-2 flex items-center">
                        <FaPercentage className="text-xl text-blue-500 mr-2" /> Mã giảm giá
                    </h2>
                    <div className="flex">
                        <input type="text" placeholder="Nhập mã giảm giá" className="flex-1 p-3 border border-gray-300 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        <button className="bg-blue-500 text-white p-3 rounded-r-lg hover:bg-blue-600 transition duration-200">Áp dụng</button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2">Mã giảm giá không áp dụng cho phương thức thanh toán tại nhà xe.</p>
                </div>

                {trip && (
    <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-700 mb-2">Thông tin chuyến đi</h2>
        {/* Departure Information */}
        <div className="flex items-center mb-4">
            <FaClock className="text-blue-500 mr-2" /> {/* Clock Icon */}
            <div>
                <p className="text-lg font-bold text-gray-700">12:07</p> {/* Departure Time */}
                <p className="text-sm font-medium text-gray-700">Đồng Nai</p>
                <p className="text-sm text-gray-500">Biên Hòa, Đồng Nai</p>
            </div>
            <button className="ml-auto text-blue-500 hover:underline text-sm font-medium">Thay đổi</button> {/* Change Button */}
        </div>

        {/* Arrival Information */}
        <div className="flex items-center">
            <FaMapMarkerAlt className="text-red-500 mr-2" /> {/* Location Pin Icon */}
            <div>
                <p className="text-lg font-bold text-gray-700">12:07</p> {/* Arrival Time */}
                <p className="text-sm font-medium text-gray-700">Đà Lạt</p>
                <p className="text-sm text-gray-500">Số 10, Đường XYZ, Thành phố Đà Lạt</p>
            </div>
            <button className="ml-auto text-blue-500 hover:underline text-sm font-medium">Thay đổi</button> {/* Change Button */}
        </div>
    </div>
)}
                {/* Nút Đặt chỗ */}
                <button className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center">
                    <FaTicketAlt className="mr-2" /> Đặt chỗ
                </button>
            </div>
        </div>
    );
};

export default PaymentMethods;
