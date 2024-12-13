import React, { useEffect, useState } from "react";
import { Select, Spin, Typography, message } from "antd";
import { FaChair } from "react-icons/fa";
import { useGetBusTypesByCompanyQuery } from "../../../Redux/User/apiSlice";

const { Option } = Select;
const { Text } = Typography;

const BusTypeInput = ({
  companyId,
  selectedBusType,
  onSelectBusType,
  selectedSeats,
  onSelectSeats,
}) => {
  const { data: apiResponse, isLoading, error, refetch } =
    useGetBusTypesByCompanyQuery(companyId, {
      skip: !companyId, // Không gọi API nếu chưa chọn công ty
    });

  const [seatOptions, setSeatOptions] = useState([]);

  useEffect(() => {
    if (companyId) {
      refetch();
    }
  }, [companyId, refetch]);

  useEffect(() => {
    if (selectedBusType) {
      const busType = apiResponse?.data?.find((bus) => bus._id === selectedBusType);
      if (busType) {
        // Tạo danh sách ghế dựa trên số ghế của loại xe
        const seats = Array.from({ length: busType.seats }, (_, index) => ({
          seatNumber: index + 1,
          isAvailable: true, // Có sẵn mặc định
        }));
        setSeatOptions(seats);
      }
    } else {
      setSeatOptions([]); // Reset danh sách ghế nếu không chọn loại xe
    }
  }, [selectedBusType, apiResponse]);

  const getSeatStyle = (seat) => {
    if (seat.seatNumber === 1) {
      return "text-gray-500 cursor-not-allowed"; // Ghế số 1 (không được bán)
    }
    if (selectedSeats.includes(seat.seatNumber)) {
      return "text-red-500"; // Ghế đã chọn
    }
    return "text-green-300"; // Ghế có sẵn
  };

  const handleSeatClick = (seat) => {
    if (seat.seatNumber === 1 || !seat.isAvailable) return; // Không cho chọn ghế số 1 hoặc ghế không có sẵn
    const updatedSeats = selectedSeats.includes(seat.seatNumber)
      ? selectedSeats.filter((num) => num !== seat.seatNumber) // Bỏ chọn ghế
      : [...selectedSeats, seat.seatNumber]; // Chọn ghế mới
    onSelectSeats(updatedSeats);
  };

  if (!companyId) {
    return <Text type="secondary">Hãy chọn công ty trước.</Text>;
  }

  if (isLoading) {
    return <Spin tip="Đang tải danh sách loại xe..." />;
  }

  if (error) {
    console.error("Error fetching bus types:", error);
    message.error("Không thể tải danh sách loại xe. Vui lòng thử lại.");
    return <Text type="danger">Lỗi khi tải loại xe.</Text>;
  }

  return (
    <div className="space-y-4">
      {/* Loại xe */}
      <div className="space-y-2">
        <label className="block text-sm font-medium text-gray-700">Chọn loại xe</label>
        <Select
          className="w-full h-[70px]"
          value={selectedBusType}
          onChange={onSelectBusType}
          placeholder="Chọn loại xe"
          showSearch
          optionFilterProp="children"
        >
          {apiResponse?.data?.map((busType) => (
            <Option key={busType._id} value={busType._id}>
              <div className="flex items-center gap-2 h-[70px]">
                <img
                  src={busType.images[0]} // Hiển thị ảnh đầu tiên trong danh sách
                  alt={busType.name}
                  style={{ width: 30, height: 30, borderRadius: "50%" }}
                />
                <div>
                  <div className="font-medium">{busType.name}</div>
                  <div className="text-sm text-gray-500">{busType.description}</div>
                </div>
              </div>
            </Option>
          ))}
        </Select>
      </div>

      {/* Ghế */}
      {seatOptions.length > 0 && (
        <div className="space-y-4">
          <label className="block text-sm font-medium text-gray-700">Chọn ghế</label>
          {/* Ghi chú */}
          <div className="flex flex-wrap gap-4 text-sm text-gray-700 mb-4">
            <div className="flex items-center gap-2">
              <FaChair className="text-gray-500" /> Ghế không bán
            </div>
            <div className="flex items-center gap-2">
              <FaChair className="text-red-500" /> Ghế đã chọn
            </div>
            <div className="flex items-center gap-2">
              <FaChair className="text-green-300" /> Ghế có sẵn
            </div>
          </div>

          {/* Danh sách ghế */}
          <div
            className="grid gap-3 mx-auto"
            style={{
              gridTemplateColumns: `repeat(5, minmax(0, 1fr))`, // Dàn ghế 5 cột
            }}
          >
            {seatOptions.map((seat) => (
              <button
                key={seat.seatNumber}
                onClick={() => handleSeatClick(seat)}
                disabled={seat.seatNumber === 1 || !seat.isAvailable}
                className={`relative text-2xl cursor-pointer ${getSeatStyle(seat)}`}
              >
                <FaChair />
                <span className="text-xs absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  {seat.seatNumber}
                </span>
              </button>
            ))}
          </div>

          {/* Ghế đã chọn */}
          {selectedSeats.length > 0 && (
            <div className="mt-4 text-gray-700">
              <strong>Ghế đã chọn:</strong> {selectedSeats.join(", ")}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BusTypeInput;
