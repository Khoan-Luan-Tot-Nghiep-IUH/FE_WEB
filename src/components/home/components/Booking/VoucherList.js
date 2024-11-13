import React from 'react';
import { FaTag, FaPercent, FaCalendarAlt } from 'react-icons/fa';
import { useGetAllVouchersQuery } from '../../../../Redux/User/apiSlice';

const VoucherList = ({ onSelectVoucher }) => {
    const { data: vouchers, isLoading: isVouchersLoading, isError } = useGetAllVouchersQuery();

    return (
        <div className="mb-6">
            <h3 className="text-2xl font-semibold text-gray-800 mb-6">Voucher của bạn</h3>
            {isVouchersLoading ? (
                <p>Đang tải danh sách voucher...</p>
            ) : isError ? (
                <p className="text-red-500">Không thể tải danh sách voucher. Vui lòng thử lại.</p>
            ) : (
                <ul className="space-y-4">
                    {vouchers?.map(voucher => (
                        <li 
                            key={voucher._id} 
                            className="flex items-center p-4 border border-gray-200 rounded-lg shadow-md bg-white hover:bg-gray-50 cursor-pointer transition duration-200"
                            onClick={() => onSelectVoucher(voucher)}
                        >
                            <div className="flex-shrink-0 text-blue-500 mr-4">
                                <FaTag size={24} />
                            </div>
                            <div className="flex-1">
                                <p className="text-lg font-medium text-gray-700 mb-1">Mã: {voucher.code}</p>
                                <div className="flex items-center text-sm text-gray-500 space-x-4">
                                    <div className="flex items-center">
                                        <FaPercent className="mr-1 text-yellow-500" />
                                        <span>Giảm giá: {voucher.discount}%</span>
                                    </div>
                                    <div className="flex items-center">
                                        <FaCalendarAlt className="mr-1 text-red-500" />
                                        <span>HSD: {new Date(voucher.expiryDate).toLocaleDateString('vi-VN')}</span>
                                    </div>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default VoucherList;
