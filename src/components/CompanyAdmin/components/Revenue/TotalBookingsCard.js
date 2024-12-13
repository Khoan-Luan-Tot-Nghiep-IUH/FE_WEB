import React from "react";
import { Card, Typography, Spin, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetBookingStatsAndUsersQuery } from "../../../../Redux/Company/companyApiSlice";

const { Title, Text } = Typography;

const TotalBookingsCard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetBookingStatsAndUsersQuery();

  // Lấy dữ liệu thống kê
  const currentMonthBookings = data?.data?.bookingStats?.currentMonth?.totalBookings || 0;
  const lastMonthBookings = data?.data?.bookingStats?.lastMonth?.totalBookings || 0;

  // Tính chênh lệch phần trăm
  const bookingDifference =
    lastMonthBookings > 0
      ? (((currentMonthBookings - lastMonthBookings) / lastMonthBookings) * 100).toFixed(2)
      : currentMonthBookings > 0
      ? 100
      : 0;

  const isPositive = bookingDifference >= 0;

  const handleNavigate = () => {
    navigate("/companyadmin/bookings");
  };

  return (
    <Card
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        textAlign: "center",
      }}
      hoverable
      onClick={handleNavigate} // Điều hướng khi click
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Row align="middle" justify="center">
        <Col span={24}>
          <Title level={4} style={{ color: "#1890ff", marginBottom: "8px" }}>
            Tổng Số Vé Đặt Mới
          </Title>
        </Col>
        <Col span={24}>
          <p style={{ fontSize: "36px", fontWeight: "bold", margin: "0", color: "#001529" }}>
            {isLoading ? (
              <Spin size="large" />
            ) : isError ? (
              <Text type="danger">Lỗi tải dữ liệu</Text>
            ) : (
              currentMonthBookings
            )}
          </p>
        </Col>
        <Col span={24}>
          <p
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "12px 0 0",
              fontSize: "16px",
              fontWeight: "500",
              color: isLoading || isError ? "#d9d9d9" : isPositive ? "#52c41a" : "#ff4d4f",
            }}
          >
            {isLoading || isError ? (
              "Đang tải..."
            ) : isPositive ? (
              <>
                <ArrowUpOutlined style={{ marginRight: "8px" }} />
                +{bookingDifference}% So với tháng trước
              </>
            ) : (
              <>
                <ArrowDownOutlined style={{ marginRight: "8px" }} />
                {bookingDifference}% So với tháng trước
              </>
            )}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default TotalBookingsCard;
