import React, { useState } from "react";
import {
  Table,
  Button,
  Tag,
  Typography,
  Space,
  Select,
  Spin,
  Modal,
  notification,
} from "antd";
import {
  ReloadOutlined,
  CheckOutlined,
  CloseOutlined,
  SyncOutlined,
} from "@ant-design/icons";
import {
  useGetCompanyExpensesQuery,
  useUpdateExpenseStatusMutation,
} from "../../../Redux/Company/companyApiSlice";

const { Title } = Typography;
const { Option } = Select;

const ManageExpense = () => {
  const { data, isLoading, isError, refetch } = useGetCompanyExpensesQuery();
  const [updateExpenseStatus] = useUpdateExpenseStatusMutation();
  const [selectedStatus, setSelectedStatus] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [currentExpense, setCurrentExpense] = useState(null);

  // Xử lý cập nhật trạng thái phiếu chi
  const handleUpdateStatus = async (status) => {
    try {
      await updateExpenseStatus({
        expenseId: currentExpense._id,
        status,
      }).unwrap();
      notification.success({
        message: "Thành công",
        description: `Đã cập nhật trạng thái phiếu chi.`,
      });
      setModalVisible(false);
      refetch();
    } catch (error) {
      notification.error({
        message: "Lỗi",
        description: "Đã xảy ra lỗi khi cập nhật trạng thái phiếu chi.",
      });
    }
  };

  // Hiển thị trạng thái phiếu chi với màu sắc
  const renderStatusTag = (status) => {
    const statusColors = {
      Pending: "orange",
      Approved: "green",
      Rejected: "red",
    };
    return <Tag color={statusColors[status] || "default"}>{status}</Tag>;
  };

  // Dữ liệu hiển thị
  const expenses = data?.data || [];

  const filteredExpenses = selectedStatus
    ? expenses.filter((expense) => expense.status === selectedStatus)
    : expenses;

  // Cột cho bảng
  const columns = [
    {
      title: "STT",
      dataIndex: "index",
      key: "index",
      render: (_, __, index) => index + 1,
    },
    {
      title: "Tên Tài Xế",
      dataIndex: "driverName",
      key: "driverName",
      render: (_, record) => record.driverId?.userId?.fullName || "Không rõ",
    },
    {   
      title: "Mô Tả",
      dataIndex: "description",
      key: "description",
    },
    {
      title: "Số Tiền (VND)",
      dataIndex: "amount",
      key: "amount",
      render: (amount) =>
        new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(amount),
    },
    {
      title: "Trạng Thái",
      dataIndex: "status",
      key: "status",
      render: (status) => renderStatusTag(status),
    },
    {
      title: "Hành Động",
      key: "action",
      render: (_, record) => (
        record.status === "Pending" ? (
          <Space>
            <Button
              icon={<CheckOutlined />}
              type="primary"
              onClick={() => {
                setCurrentExpense(record);
                handleUpdateStatus("Approved");
              }}
            >
              Duyệt
            </Button>
            <Button
              icon={<CloseOutlined />}
              type="danger"
              onClick={() => {
                setCurrentExpense(record);
                handleUpdateStatus("Rejected");
              }}
            >
              Từ Chối
            </Button>
          </Space>
        ) : (
          <Tag color="green">Đã Xử Lý</Tag>
        )
      ),
    },    
  ];

  return (
    <div style={{ padding: "20px" }}>
      <Title level={4}>Quản Lý Phiếu Chi</Title>

      {/* Bộ lọc và nút làm mới */}
      <Space
        style={{
          marginBottom: "16px",
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Select
          placeholder="Lọc trạng thái"
          allowClear
          onChange={(value) => setSelectedStatus(value)}
          style={{ width: 200 }}
        >
          <Option value="Pending">Chờ Xử Lý</Option>
          <Option value="Approved">Đã Duyệt</Option>
          <Option value="Rejected">Đã Từ Chối</Option>
        </Select>
        <Button
          icon={<ReloadOutlined />}
          onClick={refetch}
          style={{ display: "flex", alignItems: "center" }}
        >
          Làm Mới
        </Button>
      </Space>

      {/* Bảng danh sách phiếu chi */}
      {isLoading ? (
        <Spin tip="Đang tải dữ liệu..." />
      ) : isError ? (
        <p style={{ color: "red" }}>Lỗi khi tải dữ liệu.</p>
      ) : filteredExpenses.length > 0 ? (
        <Table
          columns={columns}
          dataSource={filteredExpenses}
          rowKey={(record) => record._id}
          bordered
          pagination={{ pageSize: 10 }}
        />
      ) : (
        <p style={{ textAlign: "center" }}>Không có dữ liệu để hiển thị.</p>
      )}

      {/* Modal xác nhận */}
      <Modal
        title="Xác Nhận Cập Nhật Trạng Thái"
        visible={modalVisible}
        onOk={() => handleUpdateStatus(currentExpense.status)}
        onCancel={() => setModalVisible(false)}
        okText="Xác Nhận"
        cancelText="Hủy"
      >
        <p>Bạn có chắc muốn thay đổi trạng thái của phiếu chi này?</p>
      </Modal>
    </div>
  );
};

export default ManageExpense;
