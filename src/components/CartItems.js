import React, { useEffect, useState } from 'react';
import { Button, Typography, Divider, Badge, Card } from 'antd';
import { CloseOutlined, ClockCircleOutlined, EnvironmentOutlined, DollarOutlined, UserOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import moment from 'moment';

const { Title, Text } = Typography;

const CartItems = ({ items, onClose }) => {
    const [cartItems, setCartItems] = useState(items);

    useEffect(() => {
        const countdownInterval = setInterval(() => {
            setCartItems(prevItems =>
                prevItems.map(item => {
                    const timeLeft = new Date(item.expiryTime) - new Date();
                    return {
                        ...item,
                        countdown: timeLeft > 0 ? timeLeft : 0,
                    };
                }).filter(item => item.countdown > 0)
            );
        }, 1000);

        return () => clearInterval(countdownInterval);
    }, [items]);

    const formatCountdown = (countdown) => {
        const minutes = Math.floor(countdown / 60000);
        const seconds = Math.floor((countdown % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const totalPrice = cartItems.reduce((sum, item) => sum + item.totalPrice, 0);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
            onClick={e => e.target === e.currentTarget && onClose()}
        >
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full max-w-md bg-gray-100 shadow-2xl rounded-lg p-6 relative overflow-y-auto"
                style={{ backgroundColor: '#f2f4f5' }} // Nền xám nhạt
            >
                <div className="flex justify-between items-center mb-4">
                    <Title level={4} className="m-0">Giỏ hàng của bạn</Title>
                    <Button
                        icon={<CloseOutlined />}
                        shape="circle"
                        size="small"
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500"
                    />
                </div>

                {cartItems.map((item, index) => (
                    <Card
                        key={index}
                        bordered={false}
                        className="mb-4 shadow-md rounded-lg"
                        style={{
                            borderLeft: '4px solid #1890ff',
                            backgroundColor: '#ffffff', // Nền trắng
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                    >
                        <div className="flex justify-between items-center">
                            <div>
                                <Text strong style={{ color: '#1890ff' }}>Tên Công Ty:</Text> <Text>{item.trip.companyId?.name || "N/A"}</Text>
                            </div>
                            <Badge
                                count={formatCountdown(item.countdown)}
                                style={{ backgroundColor: item.countdown <= 0 ? '#f5222d' : '#52c41a' }}
                            />
                        </div>

                        <Divider />

                        <div className="flex flex-col space-y-2">
                            <div className="flex items-center">
                                <EnvironmentOutlined style={{ color: '#ff7a45', marginRight: '8px' }} />
                                <Text strong>Điểm Khởi Hành:</Text> <Text>{item.trip.departureLocation?.name || "N/A"}</Text>
                            </div>
                            <div className="flex items-center">
                                <EnvironmentOutlined style={{ color: '#ff4d4f', marginRight: '8px' }} />
                                <Text strong>Điểm Đến:</Text> <Text>{item.trip.arrivalLocation?.name || "N/A"}</Text>
                            </div>
                            <div className="flex items-center">
                                <ClockCircleOutlined style={{ color: '#52c41a', marginRight: '8px' }} />
                                <Text strong>Thời Gian Khởi Hành:</Text> <Text>{moment(item.trip.departureTime).format('DD/MM/YYYY HH:mm')}</Text>
                            </div>
                            <div className="flex items-center">
                                <UserOutlined style={{ color: '#722ed1', marginRight: '8px' }} />
                                <Text strong>Ghế Ngồi:</Text> <Text>{item.seatNumbers.join(', ')}</Text>
                            </div>
                            <div className="flex items-center">
                                <DollarOutlined style={{ color: '#faad14', marginRight: '8px' }} />
                                <Text strong>Giá:</Text> <Text>{item.totalPrice.toLocaleString()} VNĐ</Text>
                            </div>
                        </div>
                    </Card>
                ))}

                <Divider />

                <div className="flex justify-between items-center mt-4">
                    <Text strong>Tổng tiền:</Text>
                    <Text strong style={{ color: '#1890ff' }}>{totalPrice.toLocaleString()} VNĐ</Text>
                </div>

                <Button
                    type="primary"
                    block
                    className="h-12 mt-4 text-lg font-semibold"
                    onClick={() => alert("Thanh toán")}
                    icon={<ClockCircleOutlined />}
                    style={{
                        backgroundColor: '#1890ff',
                        borderColor: '#1890ff',
                        boxShadow: '0 4px 8px rgba(24, 144, 255, 0.2)',
                    }}
                >
                    Thanh toán
                </Button>
            </motion.div>
        </div>
    );
};

export default CartItems;
