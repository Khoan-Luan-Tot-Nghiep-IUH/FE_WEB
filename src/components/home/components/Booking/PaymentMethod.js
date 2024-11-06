import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaQrcode, FaTicketAlt, FaLink, FaMoneyCheckAlt } from 'react-icons/fa';
import { useCreateBookingMutation } from '../../../../Redux/Booking/bookingApiSlice';
import QRCode from 'qrcode';
import Notification from '../../../shared/Notification/Notification';
import CountdownTimer from './CountdownTimer';
import { v4 as uuidv4 } from 'uuid';

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
            <img src={qrUrl} alt="QR Code" className="w-48 h-48 shadow-md rounded-lg" />
        </div>
    );
};

const PaymentMethods = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { selectedSeats, totalPrice, trip, bookingId, expiryTime } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [createBooking, { isLoading, isError, data, isSuccess }] = useCreateBookingMutation();

    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', 
    });

    const [confirmDialog, setConfirmDialog] = useState(false);

    // Mở thông báo
    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

    // Đóng thông báo
    const closeNotification = () => {
        setNotification({ ...notification, open: false });
    };

    const handleTimeout = () => {
        setConfirmDialog(true);
    };

    const handleConfirmReturn = () => {
        navigate(-1);
    };

    const handleCancelReturn = () => {
        setConfirmDialog(false);
    };

    useEffect(() => {
        if (isSuccess && paymentMethod === 'OnBoard') {
            showNotification('Đặt chỗ thành công! Bạn sẽ thanh toán khi lên xe.');
            navigate('/user/ticket-buy'); 
        }
    }, [isSuccess, paymentMethod, navigate]);

    const handleBooking = async () => {
        if (!paymentMethod) {
            showNotification('Vui lòng chọn phương thức thanh toán', 'error');
            return;
        }

        if (!bookingId) {
            showNotification('Dữ liệu không hợp lệ', 'error');
            return;
        }

        const bookingData = {
            bookingId,
            paymentMethod,
        };

        try {
            const result = await createBooking(bookingData).unwrap();
            if (paymentMethod === 'Online') {
                showNotification('Đặt chỗ thành công! Vui lòng nhấn vào liên kết để thanh toán...', 'success');
                setTimeout(() => {
                    window.open(result.data.paymentLink, "_self");
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
        <div className="container mx-auto p-6 bg-gray-50 min-h-screen">
            {/* Countdown Timer */}
            <CountdownTimer endTime={expiryTime} onTimeout={handleTimeout} />

            {/* Xác nhận trước khi rời trang */}
            {confirmDialog && (
                <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
                    <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full text-center">
                        <p className="text-lg font-semibold text-gray-700 mb-4">Thời gian đã hết. Bạn có muốn quay lại trang trước không?</p>
                        <div className="flex justify-between mt-4">
                            <button onClick={handleConfirmReturn} className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition duration-300">
                                Xác nhận
                            </button>
                            <button onClick={handleCancelReturn} className="bg-gray-300 text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 transition duration-300">
                                Hủy bỏ
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Phương thức thanh toán</h1>
                    <div 
                        className={`mb-6 border border-gray-300 rounded-lg p-6 flex items-center cursor-pointer hover:shadow-md transition-shadow duration-200 ${paymentMethod === 'Online' ? 'border-blue-500 bg-blue-50' : ''}`}
                        onClick={() => setPaymentMethod('Online')}
                    >
                        <FaQrcode className="text-3xl text-blue-500 mr-4" />
                        <div className="flex-1">
                            <input 
                                type="radio" 
                                id="qr" 
                                name="payment" 
                                className="mr-3 mt-1" 
                                checked={paymentMethod === 'Online'} 
                                onChange={() => setPaymentMethod('Online')} 
                            />
                            <label htmlFor="qr" className="text-lg font-medium text-gray-700">QR chuyển khoản / Ví điện tử</label>
                            <p className="text-sm text-gray-500 mt-1">Hỗ trợ nhiều ví điện tử & 42 ngân hàng</p>
                        </div>
                    </div>
                    <div 
                        className={`mb-6 border border-gray-300 rounded-lg p-6 flex items-center cursor-pointer hover:shadow-md transition-shadow duration-200 ${paymentMethod === 'OnBoard' ? 'border-green-500 bg-green-50' : ''}`}
                        onClick={() => setPaymentMethod('OnBoard')}
                    >
                        <FaMoneyCheckAlt className="text-3xl text-green-500 mr-4" />
                        <div className="flex-1">
                            <input 
                                type="radio" 
                                id="onboard" 
                                name="payment" 
                                className="mr-3 mt-1" 
                                checked={paymentMethod === 'OnBoard'} 
                                onChange={() => setPaymentMethod('OnBoard')} 
                            />
                            <label htmlFor="onboard" className="text-lg font-medium text-gray-700">Thanh toán khi lên xe</label>
                            <p className="text-sm text-gray-500 mt-1">Bạn có thể thanh toán cho tài xế khi lên xe</p>
                        </div>
                    </div>

                    {isError && <p className="text-red-500 mt-4">Đã có lỗi xảy ra. Vui lòng thử lại.</p>}
                    {!isSuccess && (
                        <button 
                            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 transition duration-300 flex items-center justify-center mt-4"
                            onClick={handleBooking}
                            disabled={isLoading}
                        >
                            <FaTicketAlt className="mr-2" /> {isLoading ? 'Đang đặt chỗ...' : 'Đặt chỗ'}
                        </button>
                    )}
                </div>
                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin thanh toán</h2>

                    {isSuccess && (
                        <div className="space-y-6">
                            {data?.data?.qrCode && (
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-100">
                                    <h3 className="text-lg font-medium text-gray-700 mb-3">Quét mã QR để thanh toán</h3>
                                    <QRCodeDisplay qrCodeData={data.data.qrCode} />
                                </div>
                            )}
                            {data?.data?.paymentLink && (
                                <div className="p-4 border border-gray-200 rounded-lg shadow-sm bg-gray-100">
                                    <h3 className="text-lg font-medium text-gray-700 mb-3">Thanh toán qua liên kết</h3>
                                    <button
                                        onClick={handlePaymentRedirect}
                                        className="w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300 flex items-center justify-center"
                                    >
                                        <FaLink className="mr-2" /> Chuyển đến trang thanh toán
                                    </button>
                                </div>
                            )}
                        </div>
                    )}
                    <div className="mt-6 p-6 border border-gray-200 rounded-lg shadow-sm bg-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Tổng tiền</h2>
                            <p className="text-2xl font-bold text-blue-600">{totalPrice ? `${totalPrice.toLocaleString('vi-VN')} VND` : 'Chưa có thông tin giá'}</p>
                        </div>
                        <FaMoneyCheckAlt className="text-4xl text-blue-600" />
                    </div>
                </div>
            </div>
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
