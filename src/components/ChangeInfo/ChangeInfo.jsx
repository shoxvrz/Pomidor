import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const ChangeInfo = ({ selectedItem, onClose, onUpdate }) => {
  const [formData, setFormData] = useState(null);

  useEffect(() => {
    if (selectedItem) {
      setFormData(selectedItem);
    }
  }, [selectedItem]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedData = new FormData();
    updatedData.append('name', formData.name);
    updatedData.append('description', formData.description);
    updatedData.append('price', formData.price);
    updatedData.append('category', formData.category);
    if (formData.image) {
      updatedData.append('image', formData.image);
    }

    try {
      const response = await axios.put(`http://localhost:3000/foodData/${formData.id}`, updatedData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        toast.success('Data updated successfully');
        onUpdate();
        onClose();
      } else {
        toast.error('Failed to update data');
      }
    } catch (error) {
      toast.error('An error occurred while updating the data.');
      console.error('Error updating data:', error);
    }
  };

  if (!formData) {
    return null;
  }

  return (
    <div>
      <h2>Change Info</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="price">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="category">Category</label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="Milliy">Milliy Taom</option>
            <option value="Salad">Salad</option>
            <option value="Shirinliklar">Shirinliklar</option>
            <option value="Ichimliklar">Ichimliklar</option>
          </select>
        </div>
        <div>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            id="image"
            name="image"
            onChange={handleChange}
          />
        </div>
        <button type="submit">Update</button>
      </form>
      <button onClick={onClose}>Cancel</button>
    </div>
  );
};

export default ChangeInfo;
