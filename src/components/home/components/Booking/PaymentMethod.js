import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { FaQrcode, FaTicketAlt, FaLink, FaMoneyCheckAlt } from 'react-icons/fa';
import { useCreateBookingMutation } from '../../../../Redux/Booking/bookingApiSlice';
import QRCode from 'qrcode';
import Notification from '../../../shared/Notification/Notification';
import CountdownTimer from './CountdownTimer';
import VoucherList from './VoucherList';


const PaymentMethods = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedVoucher, setSelectedVoucher] = useState(null);
    const { selectedSeats, totalPrice: originalTotalPrice, trip, bookingId, expiryTime } = location.state || {};
    const [paymentMethod, setPaymentMethod] = useState(null);
    const [createBooking, { isLoading, isError, data, isSuccess }] = useCreateBookingMutation();
    const [isVoucherListVisible, setVoucherListVisible] = useState(false);
    const [confirmDialog, setConfirmDialog] = useState(false);

    
    const [notification, setNotification] = useState({
        open: false,
        message: '',
        severity: 'success', 
    });

    // Calculate the discounted price based on the selected voucher
    const discountedPrice = selectedVoucher
        ? originalTotalPrice - (originalTotalPrice * selectedVoucher.discount) / 100
        : originalTotalPrice;

    const showNotification = (message, severity = 'success') => {
        setNotification({ open: true, message, severity });
    };

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
            voucherCode: selectedVoucher?.code || null,
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
            <CountdownTimer endTime={expiryTime} onTimeout={handleTimeout} />

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-8 rounded-xl shadow-lg">
                    <h1 className="text-2xl font-semibold text-gray-800 mb-6">Phương thức thanh toán</h1>
                    
                    {/* Online Payment Option */}
                    <div 
                        className={`mb-6 border rounded-lg p-6 flex items-center cursor-pointer hover:shadow-md ${paymentMethod === 'Online' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod('Online')}
                    >
                        <FaQrcode className="text-3xl text-blue-500 mr-4" />
                        <div>
                            <input 
                                type="radio" 
                                id="qr" 
                                name="payment" 
                                className="mr-3 mt-1" 
                                checked={paymentMethod === 'Online'} 
                                onChange={() => setPaymentMethod('Online')} 
                            />
                            <label htmlFor="qr" className="text-lg font-medium text-gray-700">QR chuyển khoản / Ví điện tử</label>
                        </div>
                    </div>

                    {/* OnBoard Payment Option */}
                    <div 
                        className={`mb-6 border rounded-lg p-6 flex items-center cursor-pointer hover:shadow-md ${paymentMethod === 'OnBoard' ? 'border-green-500 bg-green-50' : 'border-gray-300'}`}
                        onClick={() => setPaymentMethod('OnBoard')}
                    >
                        <FaMoneyCheckAlt className="text-3xl text-green-500 mr-4" />
                        <div>
                            <input 
                                type="radio" 
                                id="onboard" 
                                name="payment" 
                                className="mr-3 mt-1" 
                                checked={paymentMethod === 'OnBoard'} 
                                onChange={() => setPaymentMethod('OnBoard')} 
                            />
                            <label htmlFor="onboard" className="text-lg font-medium text-gray-700">Thanh toán khi lên xe</label>
                        </div>
                    </div>

                    {isError && <p className="text-red-500 mt-4">Đã có lỗi xảy ra. Vui lòng thử lại.</p>}
                    {!isSuccess && (
                        <button 
                            className="w-full bg-yellow-500 text-white font-semibold py-3 rounded-lg hover:bg-yellow-600 flex items-center justify-center mt-4"
                            onClick={handleBooking}
                            disabled={isLoading}
                        >
                            <FaTicketAlt className="mr-2" /> {isLoading ? 'Đang đặt chỗ...' : 'Đặt chỗ'}
                        </button>
                    )}
                </div>

                <div className="bg-white p-8 rounded-xl shadow-lg">
                    <h2 className="text-2xl font-semibold text-gray-800 mb-6">Thông tin thanh toán</h2>
                    <button 
                        className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300 mb-4"
                        onClick={() => setVoucherListVisible(!isVoucherListVisible)}
                    >
                        {isVoucherListVisible ? 'Ẩn voucher' : 'Hiển thị voucher'}
                    </button>

                    <div className={`transition-all duration-300 ease-in-out transform ${isVoucherListVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'}`}>
                        {isVoucherListVisible && (
                            <VoucherList onSelectVoucher={(voucher) => {
                                setSelectedVoucher(voucher);
                                setVoucherListVisible(false); 
                            }} />
                        )}
                    </div>
                    {selectedVoucher && (
                        <div className="mt-4 p-4 bg-gray-100 border border-gray-200 rounded-lg">
                            <p className="text-sm text-gray-600">Voucher áp dụng: <span className="font-semibold">{selectedVoucher.code}</span></p>
                            <p className="text-sm text-gray-600">Giảm giá: <span className="font-semibold">{selectedVoucher.discount}%</span></p>
                        </div>
                    )}

                    <div className="mt-6 p-6 border rounded-lg shadow-sm bg-gray-100 flex items-center justify-between">
                        <div>
                            <h2 className="text-lg font-semibold text-gray-700 mb-2">Tổng tiền</h2>
                            <p className="text-2xl font-bold text-blue-600">{discountedPrice ? `${discountedPrice.toLocaleString('vi-VN')} VND` : 'Chưa có thông tin giá'}</p>
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
