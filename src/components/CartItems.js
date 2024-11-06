import React from 'react';
import { Button, Table } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';

const CartItems = ({ items, onClose }) => {
    const columns = [
        {
            title: 'Tên Vé',
            dataIndex: 'name',
            key: 'name',
            render: (text) => <span className="text-gray-800 font-medium">{text}</span>,
        },
        {
            title: 'Giá',
            dataIndex: 'price',
            key: 'price',
            render: (price) => <span className="text-gray-800">{price.toLocaleString()} VNĐ</span>,
            align: 'right',
        },
    ];

    const handleOverlayClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    const totalPrice = items.reduce((sum, item) => sum + item.price, 0);

    return (
        <div
            className="fixed inset-0 bg-black bg-opacity-50 flex justify-end z-50"
            onClick={handleOverlayClick}
        >
            {/* Hiệu ứng Slide In sử dụng framer-motion */}
            <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                className="w-full max-w-md bg-white shadow-lg rounded-lg p-6 relative"
            >
                {/* Nút Đóng Ở Trên Cùng */}
                <div className="flex justify-between items-center mb-4 border-b pb-3">
                    <h3 className="text-xl font-semibold text-gray-900">Giỏ hàng của bạn</h3>
                    <Button
                        icon={<CloseOutlined />}
                        shape="circle"
                        size="small"
                        onClick={onClose}
                        className="text-gray-500 hover:text-red-500"
                    />
                </div>

                {/* Bảng Chi Tiết Sản Phẩm */}
                <Table
                    columns={columns}
                    dataSource={items.map((item, index) => ({ ...item, key: index }))}
                    pagination={false}
                    className="mb-4"
                    size="small"
                    bordered
                />

                {/* Hiển Thị Tổng Tiền */}
                <div className="flex justify-between items-center border-t pt-4 mt-4 text-lg font-semibold text-gray-900">
                    <span>Tổng tiền:</span>
                    <span>{totalPrice.toLocaleString()} VNĐ</span>
                </div>

                {/* Nút Thanh Toán */}
                <Button
                    type="primary"
                    className="w-full h-12 mt-6 text-lg font-semibold"
                    onClick={() => alert("Thanh toán")}
                >
                    Thanh toán
                </Button>
            </motion.div>
        </div>
    );
};

export default CartItems;
