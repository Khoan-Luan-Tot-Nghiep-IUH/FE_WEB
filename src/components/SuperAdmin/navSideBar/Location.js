import React, { useState } from 'react';
import { Button, Input, Modal, Card, Col, Row, Form, Space, Typography, message } from 'antd';
import { PlusOutlined, EditOutlined, EyeOutlined, DeleteOutlined } from '@ant-design/icons';
import { useGetLocationsQuery, useCreateLocationMutation, useGetLocationByIdQuery, useUpdateLocationMutation, useDeleteLocationMutation } from '../../../Redux/Location/locationApiSlice';

const { Title } = Typography;

const Location = () => {
  const [selectedLocationId, setSelectedLocationId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [newLocation, setNewLocation] = useState({ name: '', address: '', city: '', coordinates: [0, 0] });

  const { data: locations, error, isLoading } = useGetLocationsQuery();
  const [createLocation] = useCreateLocationMutation();
  const [updateLocation] = useUpdateLocationMutation();
  const [deleteLocation] = useDeleteLocationMutation();

  const { data: locationDetail } = useGetLocationByIdQuery(selectedLocationId, { skip: !selectedLocationId });

  const handleOpenModal = (location = null) => {
    setIsEditing(!!location);
    setNewLocation(location || { name: '', address: '', city: '', coordinates: [0, 0] });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  const handleCreateOrUpdate = async () => {
    try {
      if (isEditing) {
        await updateLocation({ id: newLocation._id, updatedLocation: newLocation }).unwrap();
        message.success('Location updated successfully');
      } else {
        await createLocation(newLocation).unwrap();
        message.success('Location created successfully');
      }
      handleCloseModal();
    } catch (error) {
      message.error('Failed to save location');
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteLocation(id).unwrap();
      message.success('Location deleted successfully');
    } catch (error) {
      message.error('Failed to delete location');
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <Title level={2} className="text-center text-blue-700 mb-8 font-bold">Location Management</Title>

      {/* Danh sách địa điểm */}
      <div className="bg-white p-4 rounded-lg shadow-lg mb-8">
        <div className="flex justify-between items-center mb-4">
          <Title level={4} className="text-blue-600">All Locations</Title>
          <Button type="primary" icon={<PlusOutlined />} onClick={() => handleOpenModal()} className="bg-blue-600">Add Location</Button>
        </div>

        {isLoading && <p>Loading...</p>}
        {error && <p className="text-red-500">Error loading locations</p>}

        <Row gutter={16}>
          {locations?.data?.map((location) => (
            <Col xs={24} sm={12} md={8} lg={6} key={location._id}>
              <Card
                hoverable
                className="location-card shadow-md hover:shadow-lg transition-shadow duration-300"
                actions={[
                  <EyeOutlined onClick={() => setSelectedLocationId(location._id)} />,
                  <EditOutlined onClick={() => handleOpenModal(location)} />,
                  <DeleteOutlined onClick={() => handleDelete(location._id)} />,
                ]}
              >
                <Card.Meta
                  title={<span className="text-blue-600 font-semibold">{location.name}</span>}
                  description={`${location.address}, ${location.city}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </div>

      {/* Chi tiết địa điểm */}
      {locationDetail && (
        <div className="bg-white p-4 rounded-lg shadow-lg mb-6">
          <Title level={4} className="text-blue-600">Location Detail</Title>
          <p><strong>Name:</strong> {locationDetail.data.name}</p>
          <p><strong>Address:</strong> {locationDetail.data.address}</p>
          <p><strong>City:</strong> {locationDetail.data.city}</p>
          <p><strong>Coordinates:</strong> {locationDetail.data.coordinates.coordinates.join(', ')}</p>
        </div>
      )}

      {/* Modal Thêm / Cập nhật địa điểm */}
      <Modal
        title={isEditing ? 'Edit Location' : 'Add New Location'}
        visible={isModalOpen}
        onOk={handleCreateOrUpdate}
        onCancel={handleCloseModal}
        okText={isEditing ? 'Update' : 'Create'}
        okButtonProps={{ className: 'bg-blue-600' }}
      >
        <Form layout="vertical">
          <Form.Item label="Name" required>
            <Input
              value={newLocation.name}
              onChange={(e) => setNewLocation({ ...newLocation, name: e.target.value })}
              placeholder="Enter location name"
            />
          </Form.Item>
          <Form.Item label="Address" required>
            <Input
              value={newLocation.address}
              onChange={(e) => setNewLocation({ ...newLocation, address: e.target.value })}
              placeholder="Enter address"
            />
          </Form.Item>
          <Form.Item label="City" required>
            <Input
              value={newLocation.city}
              onChange={(e) => setNewLocation({ ...newLocation, city: e.target.value })}
              placeholder="Enter city"
            />
          </Form.Item>
          <Space>
            <Form.Item label="Latitude" required>
              <Input
                type="number"
                value={newLocation.coordinates[0]}
                onChange={(e) => setNewLocation({ ...newLocation, coordinates: [parseFloat(e.target.value), newLocation.coordinates[1]] })}
                placeholder="Enter latitude"
              />
            </Form.Item>
            <Form.Item label="Longitude" required>
              <Input
                type="number"
                value={newLocation.coordinates[1]}
                onChange={(e) => setNewLocation({ ...newLocation, coordinates: [newLocation.coordinates[0], parseFloat(e.target.value)] })}
                placeholder="Enter longitude"
              />
            </Form.Item>
          </Space>
        </Form>
      </Modal>
    </div>
  );
};

export default Location;
