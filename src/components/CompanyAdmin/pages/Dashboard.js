import React from "react";
import { Layout, Row, Col, Card, Typography, Spin } from "antd";
import Sidebar from "../components/Sidebar";
import CompletedTripsChart from "../components/Revenue/CompletedTripsChart";
import PaymentMethodChart from "../components/Revenue/RevenueChart";
import Top10UsersTable from "../components/Revenue/UserGrowthChart";
import TotalBookingsCard from "../components/Revenue/TotalBookingsCard"; 
import { useGetRevenueComparisonQuery } from "../../../Redux/Company/companyApiSlice"; 
import CancelledStatsCard from "../components/Revenue/CancelledStatsCard";
import ExpenseCard from "../components/Revenue/ExpenseCard";
import RankedRoutes from "../components/Revenue/RankedRoutes";

const { Content } = Layout;
const { Title } = Typography;

const RevenueCard = ({ title, value, growth, isLoading, isError }) => {
  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        cursor: "pointer",
        transition: "transform 0.2s, box-shadow 0.2s",
        textAlign: "center",
        padding: "20px",
        height:"100%"
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Row justify="center" align="middle">
        <Col span={24}>
          <Title level={4} style={{ color: "#1890ff", marginBottom: "8px" }}>
            {title}
          </Title>
        </Col>
        <Col span={24}>
          <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0, color: "#001529" }}>
            {isLoading ? (
              <Spin size="large" />
            ) : isError ? (
              <p type="danger">Lỗi tải dữ liệu</p>
            ) : (
              value
            )}
          </p>
        </Col>
        <Col span={24}>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "16px",
              fontWeight: "500",
              color: growth?.includes("+") ? "#52c41a" : "#ff4d4f",
            }}
          >
            {isLoading || isError ? "Đang tải..." : `${growth} So với tháng trước`}
          </p>
        </Col>
      </Row>
    </div>
  );
};


const Dashboard = () => {
  const { data, isLoading, isError } = useGetRevenueComparisonQuery();

  const summaryCards = [
    {
      title: "Số Lượt Bán",
      value: "924", // Tạm thời giá trị tĩnh
      growth: "-5.72%", // Tạm thời giá trị tĩnh
    },
  ];

  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <Sidebar />
      <Layout>
        <Content style={{ padding: "20px", backgroundColor: "#f0f2f5" }}>
          <Row gutter={[16, 16]}>
            <Col xs={24} sm={12} md={6}>
              <TotalBookingsCard />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <RevenueCard
                title="Doanh Thu"
                value={`${data?.data?.currentMonth?.toLocaleString()} ₫`}
                growth={
                  isLoading || isError
                    ? null
                    : `${data?.data?.revenueChange > 0 ? "+" : ""}${data?.data?.revenueChange}%`
                }
                isLoading={isLoading}
                isError={isError}
              />
            </Col>
            <Col xs={24} sm={12} md={6}>
              <ExpenseCard /> 
            </Col>
            <Col xs={24} sm={12} md={6}>
              <CancelledStatsCard />
            </Col>
          </Row>

          {/* Top 10 Users Table */}
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col xs={24} md={12}>
              <Card title="Doanh Thu Theo Phương Thức Thanh Toán">
                <PaymentMethodChart />
              </Card>
            </Col>
            <Col xs={24} md={12}>
              <Top10UsersTable />
            </Col>
          </Row>

          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col xs={24}>
              <Card title="Thống Kê Chuyến Đi">
                <CompletedTripsChart />
              </Card>
            </Col>
          </Row>
          <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
            <Col xs={24}>
              <Card title="Tuyến đường phổ biến">
                <RankedRoutes />
              </Card>
            </Col>
          </Row>
        </Content>
      </Layout>
    </Layout>
  );
};

export default Dashboard;
