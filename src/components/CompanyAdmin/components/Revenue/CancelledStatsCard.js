import React from "react";
import { Card, Typography, Spin, Row, Col } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { useGetCancelledStatsQuery } from "../../../../Redux/Company/companyApiSlice";

const { Title, Text } = Typography;

const CancelledStatsCard = () => {
  const navigate = useNavigate();
  const { data, isLoading, isError } = useGetCancelledStatsQuery();

  // Lấy dữ liệu hủy vé
  const currentMonthCancelled = data?.data?.currentMonth || 0;
  const lastMonthCancelled = data?.data?.lastMonth || 0;

  // Tính chênh lệch phần trăm
  const cancelledDifference =
    lastMonthCancelled > 0
      ? (((currentMonthCancelled - lastMonthCancelled) / lastMonthCancelled) * 100).toFixed(2)
      : currentMonthCancelled > 0
      ? 100
      : 0;

  const isPositive = cancelledDifference >= 0;

  const handleNavigate = () => {
    navigate("/companyadmin/bookings", {
      state: {
        filter: "Cancelled", 
      },
    });
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
            Số Lượt Hủy Vé
          </Title>
        </Col>
        <Col span={24}>
          <p style={{ fontSize: "36px", fontWeight: "bold", margin: "0", }}>
            {isLoading ? (
              <Spin size="large" />
            ) : isError ? (
              <Text type="danger">Lỗi tải dữ liệu</Text>
            ) : (
              currentMonthCancelled
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
              color: isLoading || isError ? "#d9d9d9" : isPositive ? "#ff4d4f" : "#52c41a",
            }}
          >
            {isLoading || isError ? (
              "Đang tải..."
            ) : isPositive ? (
              <>
                <ArrowUpOutlined style={{ marginRight: "8px" }} />
                +{cancelledDifference}% So với tháng trước
              </>
            ) : (
              <>
                <ArrowDownOutlined style={{ marginRight: "8px" }} />
                {cancelledDifference}% So với tháng trước
              </>
            )}
          </p>
        </Col>
      </Row>
    </Card>
  );
};

export default CancelledStatsCard;
