import React, { useState } from "react";
import { Table, Input, Select, Button, Space, Typography, Spin, Empty, Tag, DatePicker } from "antd";
import { SearchOutlined, ReloadOutlined, CloseCircleOutlined } from "@ant-design/icons";
import { useGetBookingStatsAndUsersQuery } from "../../../Redux/Company/companyApiSlice";
import { useLocation } from "react-router-dom";

const { Option } = Select;
const { Title } = Typography;

const translateBookingStatus = (status) => {
  switch (status) {
    case "Confirmed":
      return "Đã Xác Nhận";
    case "Cancelled":
      return "Đã Hủy";
    case "Pending":
      return "Chờ Xác Nhận";
    default:
      return "Không rõ";
  }
};

const getBookingStatusColor = (status) => {
  switch (status) {
    case "Confirmed":
      return "green";
    case "Cancelled":
      return "red";
    case "Pending":
      return "orange";
    default:
      return "default";
  }
};

const translatePaymentStatus = (paymentStatus) => {
  switch (paymentStatus) {
    case "Paid":
      return "Đã Thanh Toán";
    case "Unpaid":
      return "Chưa Thanh Toán";
    default:
      return "Không rõ";
  }
};

const getPaymentStatusColor = (paymentStatus) => {
  switch (paymentStatus) {
    case "Paid":
      return "blue";
    case "Unpaid":
      return "orange";
    default:
      return "default";
  }
};

const ManageBooking = () => {
  const location = useLocation();
  const { data, isLoading, isError, refetch } = useGetBookingStatsAndUsersQuery();

  const [searchText, setSearchText] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [sortField, setSortField] = useState("bookingDate");
  const [sortOrder, setSortOrder] = useState("ascend");
  const initialStatusFilter = location.state?.filter || "";
  const [bookingStatusFilter, setBookingStatusFilter] = useState(initialStatusFilter);
  const [dateRangeFilter, setDateRangeFilter] = useState([]);
  const [paymentMethodFilter, setPaymentMethodFilter] = useState("");

  const bookings = data?.data?.userBookings || [];
  const today = new Date().toISOString().split("T")[0];

  const clearFilters = () => {
    setSearchText("");
    setStatusFilter("");
    setSortField("bookingDate");
    setSortOrder("ascend");
    setBookingStatusFilter("");
    setDateRangeFilter([]);
    setPaymentMethodFilter("");
  };

  const filteredAndSortedBookings = bookings
    .filter((booking) => {
      const searchTextLower = searchText.toLowerCase();
      const userMatch =
        booking.userDetails?.fullName?.toLowerCase().includes(searchTextLower) ||
        booking.userDetails?.phoneNumber?.includes(searchTextLower);
      const statusMatch = statusFilter ? booking.paymentStatus === statusFilter : true;
      const bookingStatusMatch = bookingStatusFilter ? booking.status === bookingStatusFilter : true;
      const paymentMethodMatch = paymentMethodFilter
        ? booking.paymentMethod === paymentMethodFilter
        : true;
      const dateMatch =
        dateRangeFilter.length > 0
          ? new Date(booking.bookingDate) >= dateRangeFilter[0] &&
            new Date(booking.bookingDate) <= dateRangeFilter[1]
          : true;

      return userMatch && statusMatch && bookingStatusMatch && paymentMethodMatch && dateMatch;
    })
    .sort((a, b) => {
      const isTodayA = a.bookingDate?.split("T")[0] === today;
      const isTodayB = b.bookingDate?.split("T")[0] === today;

      if (isTodayA && !isTodayB) return -1;
      if (!isTodayA && isTodayB) return 1;

      if (sortField === "totalPrice") {
        const totalA = a.totalPrice || 0;
        const totalB = b.totalPrice || 0;
        return sortOrder === "ascend" ? totalA - totalB : totalB - totalA;
      }
      if (sortField === "bookingDate") {
        const dateA = new Date(a.bookingDate);
        const dateB = new Date(b.bookingDate);
        return sortOrder === "ascend" ? dateA - dateB : dateB - dateA;
      }
      return 0;
    });

  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên Người Dùng",
      dataIndex: "userName",
      key: "userName",
      render: (_, record) => record.userDetails?.fullName || "Không rõ",
    },
    {
      title: "Số Điện Thoại",
      dataIndex: "phoneNumber",
      key: "phoneNumber",
      render: (_, record) => record.userDetails?.phoneNumber || "Không rõ",
    },
    {
      title: "Ngày Đặt Vé",
      dataIndex: "bookingDate",
      key: "bookingDate",
      render: (_, record) =>
        record.bookingDate
          ? new Date(record.bookingDate).toLocaleDateString("vi-VN")
          : "Không rõ ngày",
    },
    {
      title: "Trạng Thái Đặt Vé",
      dataIndex: "status",
      key: "status",
      render: (_, record) => (
        <Tag color={getBookingStatusColor(record.status)}>
          {translateBookingStatus(record.status)}
        </Tag>
      ),
    },
    {
      title: "Trạng Thái Thanh Toán",
      dataIndex: "paymentStatus",
      key: "paymentStatus",
      render: (_, record) => (
        <Tag color={getPaymentStatusColor(record.paymentStatus)}>
          {translatePaymentStatus(record.paymentStatus)}
        </Tag>
      ),
    },
    {
      title: "Giá Vé",
      dataIndex: "totalPrice",
      key: "totalPrice",
      render: (_, record) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(record.totalPrice || 0),
    },
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>Quản Lý Đặt Vé</Title>

      <Space style={{ marginBottom: "16px", display: "flex", flexWrap: "wrap", gap: "10px" }}>
        <label>Tìm kiếm:</label>
        <Input
          placeholder="Tìm kiếm theo tên hoặc số điện thoại"
          prefix={<SearchOutlined />}
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
          style={{ width: 250 }}
        />
        <label>Trạng thái thanh toán:</label>
        <Select
          placeholder="Lọc trạng thái thanh toán"
          allowClear
          value={statusFilter}
          onChange={(value) => setStatusFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="Paid">Đã Thanh Toán</Option>
          <Option value="Unpaid">Chưa Thanh Toán</Option>
        </Select>
        <label>Trạng thái đặt vé:</label>
        <Select
          placeholder="Lọc trạng thái đặt vé"
          allowClear
          value={bookingStatusFilter}
          onChange={(value) => setBookingStatusFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="Confirmed">Đã Xác Nhận</Option>
          <Option value="Pending">Chờ Xác Nhận</Option>
          <Option value="Cancelled">Đã Hủy</Option>
        </Select>
        <label>Phương thức thanh toán:</label>
        <Select
          placeholder="Lọc phương thức thanh toán"
          allowClear
          value={paymentMethodFilter}
          onChange={(value) => setPaymentMethodFilter(value)}
          style={{ width: 200 }}
        >
          <Option value="Online">Thanh Toán Online</Option>
          <Option value="OnBoard">Thanh Toán Khi Lên Xe</Option>
        </Select>
        <label>Khoảng thời gian:</label>
        <DatePicker.RangePicker
          onChange={(dates) => setDateRangeFilter(dates || [])}
          style={{ width: 300 }}
        />
        <Button icon={<ReloadOutlined />} onClick={refetch}>
          Làm Mới
        </Button>
        <Button icon={<CloseCircleOutlined />} onClick={clearFilters} danger>
          Xóa Bộ Lọc
        </Button>
      </Space>

      {isLoading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : isError ? (
        <p style={{ color: "red" }}>Lỗi khi tải dữ liệu!</p>
      ) : filteredAndSortedBookings.length > 0 ? (
        <Table
          columns={columns}
          dataSource={filteredAndSortedBookings}
          pagination={{ pageSize: 10 }}
          rowKey={(record) => record._id}
          bordered
        />
      ) : (
        <Empty description="Không có dữ liệu để hiển thị" image={Empty.PRESENTED_IMAGE_SIMPLE} />
      )}
    </div>
  );
};

export default ManageBooking;
