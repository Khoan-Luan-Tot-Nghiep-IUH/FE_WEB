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
    images: [],
  });
  const [imagePreviews, setImagePreviews] = useState([]);

  useEffect(() => {
    if (busType) {
      setFormData({
        name: busType.name,
        description: busType.description || '',
        seats: busType.seats,
        floorCount: busType.floorCount || 1,
        images: busType.images || [],
      });
      setImagePreviews(busType.images || []);
    }
  }, [busType]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length + formData.images.length > 5) {
      alert('Bạn chỉ có thể tải lên tối đa 5 hình ảnh');
      return;
    }

    const updatedImages = [...formData.images, ...files];
    setFormData({ ...formData, images: updatedImages });

    const imageUrls = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prev) => [...prev, ...imageUrls]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    // Tạo đối tượng FormData để xử lý cả dữ liệu text và file
    const formDataToSend = new FormData();
    formDataToSend.append('name', formData.name);
    formDataToSend.append('description', formData.description);
    formDataToSend.append('seats', formData.seats);
    formDataToSend.append('floorCount', formData.floorCount);
  
    // Thêm từng file ảnh vào FormData, nếu có
    formData.images.forEach((image) => {
      formDataToSend.append('images', image);
    });
  
    try {
      if (busType) {
        // Khi cập nhật, truyền ID và gửi FormData
        await updateBusType({ id: busType._id, updatedBusType: formDataToSend }).unwrap();
        closeDrawer(`Cập nhật loại xe "${formData.name}" thành công!`);
      } else {
        // Khi thêm loại xe mới
        await createBusType(formDataToSend).unwrap();
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
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700">Hình Ảnh:</label>
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleImageChange}
          className="mt-2 p-2 border rounded w-full"
        />
        <div className="flex mt-4 gap-2">
          {imagePreviews.map((src, index) => (
            <img
              key={index}
              src={src}
              alt={`Preview ${index + 1}`}
              className="w-20 h-20 object-cover rounded border"
            />
          ))}
        </div>
      </div>
      <button type="submit" className="bg-green-500 text-white px-4 py-2 rounded w-full">
        {busType ? 'Cập Nhật Loại Xe' : 'Thêm Loại Xe'}
      </button>
    </form>
  );
};

export default BusTypeForm;
