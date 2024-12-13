import React, { useState } from "react";
import { Modal } from "antd";
import { formatCurrency } from "utils/formatUtils";
import TripDetailsTabs from "./TripDetailsTabs";
import { BsStarFill, BsStarHalf, BsStar } from "react-icons/bs";

const TripDetails = ({ trip, onToggle, loading }) => {
  
  const [isDetailsVisible, setIsDetailsVisible] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [activeTab, setActiveTab] = useState("discounts"); 


  const mainImage =
    trip.busType.images && trip.busType.images.length > 0
      ? trip.busType.images[0]
      : "https://via.placeholder.com/150";

  const handleViewMoreImages = () => {
    setIsDetailsVisible(true);
    setActiveTab("images");
  };

  const handleCloseModal = () => {
    setIsModalVisible(false);
  };

  const renderStars = (rating) => {
    const sanitizedRating = Math.max(0, Math.min(5, Number(rating) || 0));
    const fullStars = Math.floor(sanitizedRating);
    const halfStars = sanitizedRating % 1 >= 0.5 ? 1 : 0;
    const emptyStars = 5 - fullStars - halfStars;
  
    return (
      <div className="flex items-center">
        {Array(fullStars)
          .fill()
          .map((_, index) => (
            <BsStarFill key={`full-${index}`} className="text-yellow-500" />
          ))}
        {halfStars === 1 && <BsStarHalf className="text-yellow-500" />}
        {Array(emptyStars)
          .fill()
          .map((_, index) => (
            <BsStar key={`empty-${index}`} className="text-gray-300" />
          ))}
      </div>
    );
  };
  

  const handleToggleTrip = () => {
    if (isDetailsVisible) {
      setIsDetailsVisible(false);
    }
    onToggle();
  };

  return (
    <div className="border border-gray-200  rounded-lg shadow-md hover:shadow-lg p-4 mb-6 transition-shadow">
      <div className="flex flex-col md:flex-row items-start gap-4">
        <div className="relative w-full md:w-1/5 flex-shrink-0">
          <img
            src={mainImage}
            alt="Bus"
            className="w-full h-28 object-cover rounded-lg"
            onClick={handleViewMoreImages}
          />
          {trip.instantConfirmation && (
            <div className="absolute top-1 left-1 bg-green-600 text-white text-xs px-2 py-1 rounded">
              Xác nhận tức thì
            </div>
          )}
        </div>

        {/* Nội dung chính */}
        <div className="flex-1">
          {/* Tên công ty và đánh giá */}
          <div className="flex justify-between items-center">
            <h3 className="font-semibold text-lg text-gray-800">
              {trip.companyId.name}
            </h3>
            <div className="flex items-center">
              {renderStars(trip.companyId.averageRating || 0)}
              <span className="text-sm text-gray-500 ml-2">
                ({trip.companyId.totalReviews || 0})
              </span>
            </div>
          </div>
          <p className="text-sm text-gray-600 mt-1">
            {trip.busType.description} ({trip.busType.seats} chỗ)
          </p>

          {/* Thông tin giờ đi và đến */}
          <div className="flex justify-between items-center mt-3">
            {/* Giờ đi */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">
                {new Date(trip.departureTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-500">
                {trip.departureLocation.name}
              </p>
            </div>

            {/* Hành trình */}
            <div className="text-center text-gray-400 text-sm">
              {Math.round(
                (new Date(trip.arrivalTime) - new Date(trip.departureTime)) /
                  3600000
              ) || 1}{" "}
              giờ
            </div>

            {/* Giờ đến */}
            <div className="text-center">
              <p className="text-lg font-bold text-gray-800">
                {new Date(trip.arrivalTime).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
              <p className="text-sm text-gray-500">
                {trip.arrivalLocation.name}
              </p>
            </div>
          </div>
        </div>

        {/* Giá vé và nút */}
        <div className="text-right w-full md:w-auto flex-shrink-0">
          <p className="text-xl font-bold text-red-600">
            {formatCurrency(trip.basePrice)} VND
          </p>
          {trip.discount && (
            <p className="text-sm text-gray-500 line-through">
              {formatCurrency(trip.originalPrice)} VND
            </p>
          )}
          <p className="text-xs text-green-600 mt-1">
            Còn {trip.availableSeats} chỗ trống
          </p>
          <button
            onClick={handleToggleTrip}
            className="bg-yellow-500 text-white px-5 py-2 mt-2 rounded-lg hover:bg-yellow-600 transition"
            disabled={loading}
          >
            Chọn chuyến
          </button>
        </div>
      </div>

      {/* Nút xem thêm */}
      <div className="mt-4">
        <button
          onClick={() => setIsDetailsVisible(!isDetailsVisible)}
          className="text-blue-600 text-sm"
        >
          {isDetailsVisible ? "Ẩn chi tiết" : "Thông tin chi tiết"}
        </button>
      </div>

      {/* Nội dung chi tiết */}
      {isDetailsVisible && (
        <div className="mt-4 bg-gray-100 rounded-lg p-4">
          <TripDetailsTabs trip={trip}
            activeTab={activeTab}
            setActiveTab={setActiveTab} />
        </div>
      )}

      {/* Modal hình ảnh */}
      <Modal
        visible={isModalVisible}
        footer={null}
        onCancel={handleCloseModal}
        title="Hình Ảnh Xe"
      >
        <div className="grid grid-cols-3 gap-4">
          {trip.busType.images &&
            trip.busType.images.map((image, index) => (
              <img
                key={index}
                src={image}
                alt={`Bus image ${index + 1}`}
                className="w-full h-32 object-cover rounded-lg"
              />
            ))}
        </div>
      </Modal>
    </div>
  );
};

export default TripDetails;
