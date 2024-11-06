import React, { useState, useEffect } from 'react';
import {
  useGetDriversQuery,
  useUpdateDriverMutation,
  useDeleteDriverMutation,
  useDisableEmployeeMutation
} from '../../../Redux/Company/companyApiSlice';
import { Button, Table, Typography, Space, Spin, notification, Alert, Modal, Form, Input, InputNumber, Select } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined, UserOutlined, SearchOutlined, DollarOutlined } from '@ant-design/icons';
import AddDriverDrawer from '../components/ManageDriver/AddDriverDrawer';
import CalculateSalaryModal from '../components/ManageDriver/CalculateSalaryModal';

const { Title } = Typography;
const { confirm } = Modal;
const { Search } = Input;

const formatCurrency = (value) => new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
}).format(value);

const ManageDrivers = () => {
  const { data: driversData, isLoading, isError, refetch } = useGetDriversQuery();
  const [updateDriver] = useUpdateDriverMutation();
  const [deleteDriver] = useDeleteDriverMutation();
  const [toggleEmployeeStatus] = useDisableEmployeeMutation();
  const [drivers, setDrivers] = useState([]);
  const [filteredDrivers, setFilteredDrivers] = useState([]);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [salaryModalVisible, setSalaryModalVisible] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [editingDriver, setEditingDriver] = useState(null);
  const [form] = Form.useForm();

  useEffect(() => {
    if (driversData && driversData.drivers) {
      setDrivers(driversData.drivers);
      setFilteredDrivers(driversData.drivers);
    }
  }, [driversData]);

  const handleToggleDriverStatus = async (userId) => {
    try {
      const result = await toggleEmployeeStatus(userId).unwrap();
      notification.success({
        message: 'Thay đổi trạng thái thành công',
        description: 'Trạng thái của tài xế đã được cập nhật.',
      });
      refetch();
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi thay đổi trạng thái tài xế!',
      });
    }
  };

  const handleCalculateSalaryClick = (driver) => {
    setSelectedDriver(driver);
    setSalaryModalVisible(true);
  };

  const handleAddDriverClick = () => {
    setDrawerVisible(true);
  };

  const handleCloseDrawer = () => {
    setDrawerVisible(false);
  };

  const handleAddDriverSuccess = (newDriver) => {
    setDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    setFilteredDrivers((prevDrivers) => [...prevDrivers, newDriver]);
    refetch();
    notification.success({
      message: 'Thêm tài xế thành công',
      description: `Tài xế ${newDriver.userId.fullName} đã được thêm thành công.`,
    });
  };

  const handleSearch = (value) => {
    if (!value) {
      setFilteredDrivers(drivers);
    } else {
      const filteredData = drivers.filter(driver => 
        driver.userId.fullName.toLowerCase().includes(value.toLowerCase()) ||
        driver.userId.email.toLowerCase().includes(value.toLowerCase()) ||
        driver.licenseNumber.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredDrivers(filteredData);
    }
  };

  const handleEditDriver = (driver) => {
    setEditingDriver(driver);
    form.setFieldsValue(driver);
  };

  const handleUpdateDriver = async (values) => {
    try {
      await updateDriver({ driverId: editingDriver._id, updatedData: values }).unwrap();
      notification.success({
        message: 'Cập nhật thành công',
        description: `Tài xế ${values.fullName} đã được cập nhật.`,
      });
      setEditingDriver(null);
      refetch();
    } catch (error) {
      notification.error({
        message: 'Lỗi',
        description: 'Có lỗi xảy ra khi cập nhật tài xế!',
      });
    }
  };

  const handleDeleteDriver = (driverId) => {
    confirm({
      title: 'Bạn có chắc chắn muốn xóa tài xế này không?',
      onOk: async () => {
        try {
          await deleteDriver(driverId).unwrap();
          notification.success({
            message: 'Xóa thành công',
            description: 'Tài xế đã được xóa thành công.',
          });
          refetch();
        } catch (error) {
          notification.error({
            message: 'Lỗi',
            description: 'Có lỗi xảy ra khi xóa tài xế!',
          });
        }
      },
    });
  };

  const columns = [
    {
      title: 'Tên tài xế',
      dataIndex: ['userId', 'fullName'],
      key: 'fullName',
      render: (text) => <span><UserOutlined style={{ marginRight: 5 }} />{text}</span>
    },
    {
      title: 'Email',
      dataIndex: ['userId', 'email'],
      key: 'email',
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['userId', 'phoneNumber'],
      key: 'phoneNumber',
    },
    {
      title: 'Giấy phép lái xe',
      dataIndex: 'licenseNumber',
      key: 'licenseNumber',
    },
    {
      title: 'Lương cơ bản',
      dataIndex: 'baseSalary',
      key: 'baseSalary',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Mức lương mỗi chuyến',
      dataIndex: 'salaryRate',
      key: 'salaryRate',
      render: (value) => formatCurrency(value),
    },
    {
      title: 'Thao tác',
      key: 'action',
      render: (text, record) => (
        <Space size="middle">
          <Button type="link" icon={<EditOutlined />} onClick={() => handleEditDriver(record)}>Sửa</Button>
          <Button type="link" icon={<DeleteOutlined />} danger onClick={() => handleDeleteDriver(record._id)}>Xóa</Button>
          <Button type="link" onClick={() => handleToggleDriverStatus(record.userId._id)}>
            {record.isActive ? 'Vô hiệu hóa' : 'Kích hoạt'}
          </Button>
          <Button type="link" icon={<DollarOutlined />} onClick={() => handleCalculateSalaryClick(record)}>
            Tính lương
          </Button>
        </Space>
      ),
    },
  ];

  return (
    <div className="manage-drivers bg-white p-6 shadow-md rounded-lg">
      <div className="flex justify-between items-center mb-6">
        <Title level={3} className="text-gray-700">
          <UserOutlined style={{ marginRight: 8 }} />
          Quản Lý Tài Xế
        </Title>
        <Button type="primary" icon={<PlusOutlined />} onClick={handleAddDriverClick}>
          Thêm Tài Xế Mới
        </Button>
      </div>

      <Space style={{ marginBottom: 16 }}>
        <Search placeholder="Tìm kiếm tài xế..." onSearch={handleSearch} enterButton={<SearchOutlined />} />
      </Space>

      {isLoading ? (
        <div className="flex justify-center items-center py-10">
          <Spin tip="Đang tải danh sách tài xế..." size="large" />
        </div>
      ) : isError ? (
        <div className="flex justify-center items-center py-10">
          <Alert message="Có lỗi xảy ra khi tải danh sách tài xế" description={isError.message} type="error" showIcon />
        </div>
      ) : (
        <Table
          dataSource={filteredDrivers}
          columns={columns}
          rowKey="_id"
          pagination={{ pageSize: 5 }}
        />
      )}

      <AddDriverDrawer
        visible={drawerVisible}
        onClose={handleCloseDrawer}
        onAddDriverSuccess={handleAddDriverSuccess}
      />

      {selectedDriver && (
        <CalculateSalaryModal
          visible={salaryModalVisible}
          onClose={() => setSalaryModalVisible(false)}
          driver={selectedDriver}
        />
      )}
    </div>
  );
};

export default ManageDrivers;
