import axios from 'axios';

const searchTrips = async (searchParams) => {
    try {
        const response = await axios.get('http://localhost:5000/api/trips/search', {
            params: searchParams,
        });

        return response.data.data; // Trả về danh sách các chuyến đi tìm thấy
    } catch (error) {
        console.error('Error searching trips:', error);
        return [];
    }
};

// Khi người dùng nhấn "Tìm kiếm", bạn gọi hàm này với các tham số tìm kiếm
const handleSearch = async () => {
    const searchParams = {
        departureLocation: '66c596a6bda3082932a9be56', // Lấy từ state hoặc input
        arrivalLocation: '66c596a6bda3082932a9be57', // Lấy từ state hoặc input
        departureTime: '2024-08-23T10:00:00.000Z', // Lấy từ state hoặc input
    };

    const trips = await searchTrips(searchParams);
    // Hiển thị kết quả tìm kiếm trên giao diện người dùng
};
