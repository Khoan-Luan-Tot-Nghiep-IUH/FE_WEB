import React, { useState, useEffect } from 'react';
import { useCreateBusTypeMutation, useUpdateBusTypeMutation } from '../../../../Redux/Bustype/BusTypeApiSlice';

const BusTypeForm = ({ busType, closeDrawer }) => {
  const [createBusType] = useCreateBusTypeMutation();
  const [updateBusType] = useUpdateBusTypeMutation();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    seats: 40,
    floorCount: 1,
  });

  useEffect(() => {
    if (busType) {
      setFormData({
        name: busType.name,
        description: busType.description || '',
        seats: busType.seats,
        floorCount: busType.floorCount || 1,
      });
    }
  }, [busType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (busType) {
        await updateBusType({ id: busType._id, updatedBusType: formData }).unwrap();
        closeDrawer(`Cập nhật loại xe "${formData.name}" thành công!`);
      } else {
        await createBusType(formData).unwrap();
        closeDrawer(`Thêm loại xe "${formData.name}" thành công!`);
      }
    } catch (err) {
      closeDrawer(`Lỗi khi lưu loại xe: ${err.message}`, 'error');
      console.error('Lỗi khi lưu loại xe:', err);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Tên Loại Xe:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Mô Tả:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full"
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Số Ghế:</label>
        <input
          type="number"
          name="seats"
          value={formData.seats}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full"
          min="1"
          required
        />
      </div>
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Số Tầng:</label>
        <input
          type="number"
          name="floorCount"
          value={formData.floorCount}
          onChange={handleChange}
          className="mt-2 p-2 border rounded w-full"
          min="1"
        />
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        {busType ? 'Cập Nhật Loại Xe' : 'Thêm Loại Xe'}
      </button>
    </form>
  );
};

export default BusTypeForm;
