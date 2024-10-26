import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaQrcode, FaTicketAlt, FaLink, FaMoneyCheckAlt } from 'react-icons/fa';
import { useCreateBookingMutation } from '../../../../Redux/Booking/bookingApiSlice';
import QRCode from 'qrcode';
import Notification from '../../../shared/Notification/Notification';  // Import custom Notification

const QRCodeDisplay = ({ qrCodeData }) => {
    const [qrUrl, setQrUrl] = useState('');

    useEffect(() => {
        if (qrCodeData) {
            QRCode.toDataURL(qrCodeData, {
                width: 256,
                margin: 2,
                color: {
                    dark: '#000',
                    light: '#FFF'
                }
            })
            .then(url => {
                setQrUrl(url);
            })
            .catch(err => {
                console.error('Lỗi tạo QR code:', err);
            });
        }
    }, [qrCodeData]);

    if (!qrUrl) {
        return <div className="text-center p-4">Đang tạo mã QR...</div>;
    }

    return (
        <div className="flex flex-col items-center">
            <img src={qrUrl} alt="QR Code" className="w-48 h-48" />
        </div>
    );
};

const PaymentMethods = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, totalPrice, trip } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [createBooking, { isLoading, isError, data, isSuccess }] = useCreateBookingMutation();

    // Trạng thái của thông báo
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success',  // "success", "error", "warning", "info"
    });

    // Mở thông báo
    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    // Đóng thông báo
    const closeNotification = () => {
        setNotification({ ...notification, open: false });
    };

    // Kiểm tra nếu booking thành công với phương thức OnBoard
    useEffect(() => {
        if (isSuccess && paymentMethod === 'OnBoard') {
            showNotification('Đặt chỗ thành công! Bạn sẽ thanh toán khi lên xe.');
            navigate('/user/ticket-buy');  // Điều hướng về trang lịch sử đặt vé
        }
    }, [isSuccess, paymentMethod, navigate]);

    const handleBooking = async () => {
        if (!paymentMethod) {
            showNotification('Vui lòng chọn phương thức thanh toán', 'error');
            return;
        }

        if (!trip || !selectedSeats || !totalPrice) {
            showNotification('Dữ liệu không hợp lệ', 'error');
            return;
        }

        const bookingData = {
            tripId: trip._id,
            seatNumbers: selectedSeats,
            paymentMethod,
        };

        try {
            await createBooking(bookingData).unwrap();
            if (paymentMethod === 'Online') {
                showNotification('Đặt chỗ thành công! vui lòng quý khách nhấn vào link để đến trang thanh toán...');
                setTimeout(() => {
                    window.open(data?.data?.paymentLink, "_self");
                }, 2000);
            }
        }
         catch (error) {
            console.error('Lỗi khi đặt chỗ:', error);
            showNotification('Có lỗi xảy ra khi đặt chỗ. Vui lòng thử lại.', 'error');
        }
    };

    const handlePaymentRedirect = () => {
        if (data?.data?.paymentLink) {
            window.open(data.data.paymentLink, "_self");
        }
    };

    return (
        <div className="flex flex-col lg:flex-row justify-between p-6 bg-gray-100 min-h-screen">
            {/* Phương thức thanh toán */}
            <div className="w-full lg:w-2/3 bg-white p-6 rounded-lg shadow-md mb-6 lg:mb-0">
                <h1 className="text-xl font-semibold mb-4">Phương thức thanh toán</h1>

                {/* QR chuyển khoản/Ví điện tử */}
                <div 
                    className={`mb-6 border border-gray-300 rounded p-4 hover:shadow-md transition-shadow duration-200 flex items-center ${paymentMethod === 'Online' ? 'border-blue-500' : ''}`}
                    onClick={() => setPaymentMethod('Online')}
                >
                    <FaQrcode className="text-2xl text-blue-500 mr-3" />
                    <input type="radio" id="qr" name="payment" className="mr-3" checked={paymentMethod === 'Online'} onChange={() => setPaymentMethod('Online')} />
                    <label htmlFor="qr" className="text-lg font-medium">QR chuyển khoản/ Ví điện tử</label>
                    <div className="ml-8 text-sm text-gray-500 mt-2">
                        <p>Hỗ trợ nhiều ví điện tử & 42 ngân hàng</p>
                    </div>
                </div>

                {/* Thanh toán khi lên xe */}
                <div 
                    className={`mb-6 border border-gray-300 rounded p-4 hover:shadow-md transition-shadow duration-200 flex items-center ${paymentMethod === 'OnBoard' ? 'border-blue-500' : ''}`}
                    onClick={() => setPaymentMethod('OnBoard')}
                >
                    <FaMoneyCheckAlt className="text-2xl text-green-500 mr-3" />
                    <input type="radio" id="onboard" name="payment" className="mr-3" checked={paymentMethod === 'OnBoard'} onChange={() => setPaymentMethod('OnBoard')} />
                    <label htmlFor="onboard" className="text-lg font-medium">Thanh toán khi lên xe</label>
                    <p className="ml-8 text-sm text-gray-500 mt-2">Bạn có thể thanh toán cho tài xế khi lên xe</p>
                </div>

                {isError && <p className="text-red-500 mt-4">Đã có lỗi xảy ra. Vui lòng thử lại.</p>}

                {/* Nút Đặt chỗ */}
                {!isSuccess && (
                    <button 
                        className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center"
                        onClick={handleBooking}
                        disabled={isLoading}
                    >
                        <FaTicketAlt className="mr-2" /> {isLoading ? 'Đang đặt chỗ...' : 'Đặt chỗ'}
                    </button>
                )}
            </div>

            {/* Tóm tắt đơn hàng */}
            <div className="w-full lg:w-1/3 bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">Thông tin thanh toán</h2>

                {isSuccess && (
                    <div className="space-y-4">
                        {/* Hiển thị QR Code */}
                        {data?.data?.qrCode && (
                            <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Quét mã QR để thanh toán</h3>
                                <QRCodeDisplay qrCodeData={data.data.qrCode} />
                            </div>
                        )}

                        {/* Hiển thị Payment Link */}
                        {data?.data?.paymentLink && (
                            <div className="p-4 border rounded-lg shadow-sm bg-gray-50">
                                <h3 className="text-lg font-medium text-gray-700 mb-2">Thanh toán qua liên kết</h3>
                                <button
                                    onClick={handlePaymentRedirect}
                                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                                >
                                    <FaLink className="mr-2" /> Chuyển đến trang thanh toán
                                </button>
                            </div>
                        )}
                    </div>
                )}

                {/* Hiển thị tổng tiền */}
                <div className="mb-6 p-4 border rounded-lg shadow-sm bg-gray-50 flex items-center justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-gray-700 mb-2">Tổng tiền</h2>
                        <p className="text-3xl font-bold text-blue-600">{totalPrice ? `${totalPrice.toLocaleString('vi-VN')} VND` : 'Chưa có thông tin giá'}</p>
                    </div>
                    <FaMoneyCheckAlt className="text-4xl text-blue-600" />
                </div>
            </div>

            {/* Thông báo */}
            <Notification
                open={notification.open}
                onClose={closeNotification}
                severity={notification.severity}
                message={notification.message}
            />
        </div>
    );
};

export default PaymentMethods;
