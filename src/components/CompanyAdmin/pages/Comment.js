import React, { useState } from 'react';
import { useGetCompanyFeedbacksQuery } from '../../../Redux/Company/companyApiSlice';

const Comment = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const limit = 5; // Số feedbacks trên mỗi trang

  const { data, isLoading, error, refetch } = useGetCompanyFeedbacksQuery({ page: currentPage, limit });

  // Chuyển trang tiếp theo
  const handleNextPage = () => {
    if (data?.pagination?.currentPage < data?.pagination?.totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  // Quay về trang trước
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
    }
  };

  // Refetch data khi page thay đổi
  React.useEffect(() => {
    refetch();
  }, [currentPage, refetch]);

  if (isLoading) {
    return <div className="text-center text-gray-500">Đang tải đánh giá...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Lỗi khi tải đánh giá: {error.message}</div>;
  }

  return (
    <div className="max-w-4xl mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Đánh giá của khách hàng</h2>
      <ul className="space-y-6">
        {data.feedbacks.map((feedback) => (
          <li key={feedback._id} className="p-4 border rounded-lg shadow-sm bg-gray-50">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-lg font-semibold text-gray-700">
                {feedback.user?.fullName || 'Khách hàng ẩn danh'}
              </h3>
              <span className="text-yellow-500 text-sm font-medium">
                ⭐ {feedback.rating}/5
              </span>
            </div>
            <p className="text-gray-600 mb-4">{feedback.comment}</p>
            {feedback.images?.length > 0 && (
              <div className="flex gap-3 overflow-auto">
                {feedback.images.map((image, index) => (
                  <img
                    key={index}
                    src={image.url}
                    alt="Feedback"
                    className="w-20 h-20 object-cover rounded-lg"
                  />
                ))}
              </div>
            )}
            <div className="text-sm text-gray-500 mt-4">
              <p>
                Ngày đánh giá: {new Date(feedback.createdAt).toLocaleDateString('vi-VN')}
              </p>
            </div>
          </li>
        ))}
      </ul>
      {data.pagination && (
        <div className="mt-6 flex justify-between items-center">
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === 1 ? 'bg-gray-300 cursor-not-allowed' : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={currentPage === 1}
            onClick={handlePrevPage}
          >
            Trang trước
          </button>
          <span className="text-gray-600">
            Trang {data.pagination.currentPage} / {data.pagination.totalPages}
          </span>
          <button
            className={`px-4 py-2 rounded-lg text-white ${
              currentPage === data.pagination.totalPages
                ? 'bg-gray-300 cursor-not-allowed'
                : 'bg-blue-500 hover:bg-blue-600'
            }`}
            disabled={currentPage === data.pagination.totalPages}
            onClick={handleNextPage}
          >
            Trang sau
          </button>
        </div>
      )}
    </div>
  );
};

export default Comment;
