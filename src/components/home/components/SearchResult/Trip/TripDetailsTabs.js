import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TripDetailsTabs = ({ trip, activeTab, setActiveTab }) => {
  const mainSliderRef = useRef(null);
  const thumbnailSliderRef = useRef(null);

  const renderTabContent = () => {
    switch (activeTab) {
      case "pickupDropOff":
        return (
          <div className="p-6 animate-fadeIn">
            <h3 className="font-semibold text-2xl mb-6 text-blue-700">Điểm đón / Điểm trả</h3>
            <p className="text-base text-gray-700 mb-6 italic">
              Các mốc thời gian đón, trả bên dưới là thời gian dự kiến. Lịch này có thể thay đổi tùy tình hình thực tế.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Điểm đón */}
              <div className="md:border-r md:pr-6">
                <h4 className="font-semibold text-xl text-gray-800 mb-4">Điểm đón</h4>
                <ul className="space-y-4">
                  {trip.pickupPoints && trip.pickupPoints.length > 0 ? (
                    trip.pickupPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mt-1 mr-3">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a6 6 0 016 6c0 5.25-6 10-6 10S4 13.25 4 8a6 6 0 016-6z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-gray-800 font-medium">{point.time}</p>
                          <p className="text-gray-600">{point.location}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>Không có thông tin điểm đón.</p>
                  )}
                </ul>
              </div>

              {/* Điểm trả */}
              <div className="mt-8 md:mt-0">
                <h4 className="font-semibold text-xl text-gray-800 mb-4">Điểm trả</h4>
                <ul className="space-y-4">
                  {trip.dropOffPoints && trip.dropOffPoints.length > 0 ? (
                    trip.dropOffPoints.map((point, index) => (
                      <li key={index} className="flex items-start">
                        <span className="text-green-600 mt-1 mr-3">
                          <svg
                            className="w-5 h-5"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M10 2a6 6 0 016 6c0 5.25-6 10-6 10S4 13.25 4 8a6 6 0 016-6z" />
                          </svg>
                        </span>
                        <div>
                          <p className="text-gray-800 font-medium">{point.time}</p>
                          <p className="text-gray-600">{point.location}</p>
                        </div>
                      </li>
                    ))
                  ) : (
                    <p>Không có thông tin điểm trả.</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        );
      case "discounts":
        return (
          <div className="p-6 animate-fadeIn">
            <h3 className="font-semibold text-2xl mb-6 text-blue-700">Ưu đãi đặc biệt</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-yellow-500 mt-1 mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927C9.469 1.78 10.531 1.78 10.951 2.927l1.362 3.724a1 1 0 00.949.69h3.943c1.168 0 1.657 1.495.712 2.178l-3.098 2.251a1 1 0 00-.364 1.118l1.362 3.724c.42 1.147-.895 2.094-1.829 1.41l-3.098-2.25a1 1 0 00-1.176 0l-3.098 2.25c-.934.684-2.249-.263-1.829-1.41l1.362-3.724a1 1 0 00-.364-1.118L2.484 9.52c-.945-.683-.456-2.178.712-2.178h3.943a1 1 0 00.949-.69l1.362-3.724z" />
                  </svg>
                </span>
                <p className="text-gray-700">
                  Giảm 50% tối đa 250k cho vé đầu tiên
                </p>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-500 mt-1 mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927C9.469 1.78 10.531 1.78 10.951 2.927l1.362 3.724a1 1 0 00.949.69h3.943c1.168 0 1.657 1.495.712 2.178l-3.098 2.251a1 1 0 00-.364 1.118l1.362 3.724c.42 1.147-.895 2.094-1.829 1.41l-3.098-2.25a1 1 0 00-1.176 0l-3.098 2.25c-.934.684-2.249-.263-1.829-1.41l1.362-3.724a1 1 0 00-.364-1.118L2.484 9.52c-.945-.683-.456-2.178.712-2.178h3.943a1 1 0 00.949-.69l1.362-3.724z" />
                  </svg>
                </span>
                <p className="text-gray-700">Giảm 20% cho mọi vé tiếp theo</p>
              </li>
            </ul>
          </div>
        );
      case "policy":
        return (
          <div className="p-6 animate-fadeIn">
            <h3 className="font-semibold text-2xl mb-6 text-blue-700">Chính sách</h3>
            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="text-green-500 mt-1 mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11V5h2v2h-2zm0 4v6h2v-6h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="text-gray-700">Hoàn tiền 100% nếu huỷ trước 24 giờ.</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mt-1 mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11V5h2v2h-2zm0 4v6h2v-6h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="text-gray-700">Hỗ trợ đổi vé miễn phí 1 lần.</p>
              </li>
              <li className="flex items-start">
                <span className="text-green-500 mt-1 mr-3">
                  <svg
                    className="w-6 h-6"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm-1-11V5h2v2h-2zm0 4v6h2v-6h-2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </span>
                <p className="text-gray-700">Bảo hiểm chuyến đi tối đa 1 tỷ VNĐ.</p>
              </li>
            </ul>
          </div>
        );
      case "images":
        const mainSliderSettings = {
          dots: false,
          arrows: true,
          infinite: true,
          speed: 800,
          slidesToShow: 1,
          slidesToScroll: 1,
          asNavFor: thumbnailSliderRef.current,
          fade: true, // Added fade effect
          nextArrow: <CustomArrow direction="next" />,
          prevArrow: <CustomArrow direction="prev" />,
        };

        const thumbnailSliderSettings = {
          dots: false,
          arrows: false,
          infinite: true,
          speed: 800,
          slidesToShow: 5,
          slidesToScroll: 1,
          focusOnSelect: true,
          asNavFor: mainSliderRef.current,
          centerMode: true,
          centerPadding: "0px",
        };

        return (
          <div className="p-6 animate-fadeIn">
            <h3 className="font-semibold text-2xl mb-6 text-blue-700">Hình ảnh</h3>
            <div className="w-full">
              {/* Slider chính */}
              <div className="relative">
                <Slider {...mainSliderSettings} ref={mainSliderRef}>
                  {trip.busType.images &&
                    trip.busType.images.map((image, index) => (
                      <div key={index} className="flex justify-center">
                        <img
                          src={image}
                          alt={`Bus image ${index + 1}`}
                          className="w-full max-h-96 object-cover rounded-lg shadow-lg"
                        />
                      </div>
                    ))}
                </Slider>
              </div>

              {/* Thumbnail */}
              <Slider
                {...thumbnailSliderSettings}
                ref={thumbnailSliderRef}
                className="mt-6"
              >
                {trip.busType.images &&
                  trip.busType.images.map((image, index) => (
                    <div key={index} className="px-1">
                      <img
                        src={image}
                        alt={`Thumbnail ${index + 1}`}
                        className="w-full h-20 object-cover rounded-md shadow-md cursor-pointer hover:ring-2 hover:ring-blue-500 transition duration-300"
                      />
                    </div>
                  ))}
              </Slider>
            </div>
          </div>
        );
      case "feedbacks":
        return (
          <div className="p-6 animate-fadeIn">
            <h3 className="font-semibold text-2xl mb-6 text-blue-700">Đánh giá khách hàng</h3>
            {trip.companyId.feedbacks && trip.companyId.feedbacks.length > 0 ? (
              <div className="space-y-8">
                {trip.companyId.feedbacks.map((feedback, index) => (
                  <div
                    key={index}
                    className="p-6 border rounded-lg shadow-md bg-white hover:shadow-lg transition duration-300 flex items-start"
                  >
                    <div className="w-14 h-14 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl mr-6">
                      {feedback.fullName[0].toUpperCase()}
                    </div>
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <p className="font-bold text-gray-800 text-lg">
                          {feedback.fullName}
                        </p>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <svg
                              key={i}
                              className={`w-5 h-5 ${
                                i < feedback.rating
                                  ? "text-yellow-500"
                                  : "text-gray-300"
                              }`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927C9.469 1.78 10.531 1.78 10.951 2.927l1.362 3.724a1 1 0 00.949.69h3.943c1.168 0 1.657 1.495.712 2.178l-3.098 2.251a1 1 0 00-.364 1.118l1.362 3.724c.42 1.147-.895 2.094-1.829 1.41l-3.098-2.25a1 1 0 00-1.176 0l-3.098 2.25c-.934.684-2.249-.263-1.829-1.41l1.362-3.724a1 1 0 00-.364-1.118L2.484 9.52c-.945-.683-.456-2.178.712-2.178h3.943a1 1 0 00.949-.69l1.362-3.724z" />
                            </svg>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700 mb-4">{feedback.comment}</p>
                      <p className="text-gray-500 text-sm">
                        {new Date(feedback.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p>Chưa có đánh giá nào.</p>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div>
      {/* Tabs Navigation */}
      <div className="flex flex-wrap justify-between md:justify-around border-b mb-6">
        {["pickupDropOff", "discounts", "policy", "images", "feedbacks"].map(
          (tab, index) => (
            <button
              key={index}
              className={`relative px-6 py-4 text-base font-semibold tracking-wide transition duration-300 ${
                activeTab === tab
                  ? "text-blue-700"
                  : "text-gray-600 hover:text-blue-600"
              }`}
              onClick={() => setActiveTab(tab)}
            >
              {tab === "pickupDropOff"
                ? "Điểm đón/trả"
                : tab === "discounts"
                ? "Ưu đãi"
                : tab === "policy"
                ? "Chính sách"
                : tab === "images"
                ? "Hình ảnh"
                : "Đánh giá"}
              {activeTab === tab && (
                <span className="absolute bottom-0 left-0 w-full h-1 bg-blue-700 rounded-t-md"></span>
              )}
            </button>
          )
        )}
      </div>
      {/* Tab Content */}
      <div className="bg-gray-50 shadow-lg rounded-lg overflow-hidden">
        {renderTabContent()}
      </div>
    </div>
  );
};

// Custom Arrow
const CustomArrow = ({ direction, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={`absolute ${
        direction === "next" ? "right-4" : "left-4"
      } top-1/2 transform -translate-y-1/2 bg-white text-gray-700 p-3 rounded-full shadow-md hover:bg-gray-100 focus:outline-none transition duration-300`}
    >
      {direction === "next" ? (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5l7 7-7 7"
          />
        </svg>
      ) : (
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      )}
    </button>
  );
};

export default TripDetailsTabs;
