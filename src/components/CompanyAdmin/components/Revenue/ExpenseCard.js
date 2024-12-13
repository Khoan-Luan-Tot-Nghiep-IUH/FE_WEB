import React from "react";
import { Row, Col, Typography, Spin } from "antd";
import { ArrowUpOutlined, ArrowDownOutlined } from "@ant-design/icons";
import { useGetExpenseComparisonQuery } from "../../../../Redux/Company/companyApiSlice";

const { Title, Text } = Typography;

const ExpenseCard = () => {
  const { data, isLoading, isError } = useGetExpenseComparisonQuery();

  // Dữ liệu từ API
  const currentMonthExpense = data?.data?.currentMonth || 0;
  const expenseChange = data?.data?.expenseChange || 0;

  const isPositive = expenseChange >= 0;

  return (
    <div
      style={{
        backgroundColor: "#f0f2f5",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
        textAlign: "center",
        padding: "20px",
        height: "100%",
        transition: "transform 0.2s, box-shadow 0.2s",
        cursor: "pointer",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.03)")}
      onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
    >
      <Row justify="center" align="middle">
        <Col span={24}>
          <Title level={4} style={{ color: "#1890ff", marginBottom: "8px" }}>
            Tổng Chi Phí
          </Title>
        </Col>
        <Col span={24}>
          <p style={{ fontSize: "36px", fontWeight: "bold", margin: 0, color: "#001529" }}>
            {isLoading ? (
              <Spin size="large" />
            ) : isError ? (
              <Text type="danger">Lỗi tải dữ liệu</Text>
            ) : (
              `${currentMonthExpense.toLocaleString()} ₫`
            )}
          </p>
        </Col>
        <Col span={24}>
          <p
            style={{
              margin: "12px 0 0",
              fontSize: "16px",
              fontWeight: "500",
              color: isPositive ? "#ff4d4f" : "#52c41a",
            }}
          >
            {isLoading || isError ? (
              "Đang tải..."
            ) : isPositive ? (
              <>
                <ArrowUpOutlined style={{ marginRight: "8px" }} />
                +{expenseChange}% So với tháng trước
              </>
            ) : (
              <>
                <ArrowDownOutlined style={{ marginRight: "8px" }} />
                {expenseChange}% So với tháng trước
              </>
            )}
          </p>
        </Col>
      </Row>
    </div>
  );
};

export default ExpenseCard;
