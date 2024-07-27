import React, { useState } from "react";
import { assets } from "../../admin_assets/assets";
import "./AddPage.scss";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPage = () => {
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState(null);
  const [data, setData] = useState({
    name: "",
    description: "",
    price: "",
    category: "Milliy",
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData((prev) => ({ ...prev, [name]: value }));
  };

  const onImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("price", Number(data.price));
    formData.append("category", data.category);
    formData.append("image", image);
  
    console.log("Submitting form with data:", data);
    console.log("Submitting form with image:", image);
  
    try {
      const response = await axios.post("http://localhost:3000/foodData", formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
  
      console.log("Response:", response);
  
      if (response.status === 201) {
        setData({
          name: "",
          description: "",
          price: "",
          category: "Milliy",
        });
        setImage(null);
        setImageUrl(null);
        toast.success('Item added successfully');
      } else {
        toast.error('Failed to add item');
      }
    } catch (error) {
      console.error("Error uploading data:", error);
      toast.error('An error occurred while uploading the data.');
    }
  };
  

  return (
    <div className="add">
      <form onSubmit={onSubmitHandler} className="add__container">
        <div className="add__image">
          <p>Upload Image</p>
          <label htmlFor="image">
            <img src={imageUrl || assets.upload_area} alt="Upload area" />
          </label>
          <input
            onChange={onImageChange}
            name="image"
            type="file"
            id="image"
            hidden
            required
          />
        </div>
        <div className="add__productName">
          <p>Produkt Nomi</p>
          <input
            value={data.name}
            onChange={onChangeHandler}
            type="text"
            name="name"
            placeholder="Shu yerga yozing..."
            required
          />
        </div>
        <div className="add__productDescription">
          <p>Produkt haqida ma'lumot</p>
          <textarea
            value={data.description}
            onChange={onChangeHandler}
            name="description"
            rows="6"
            placeholder="Shu yerga yozing..."
            required
          ></textarea>
        </div>
        <div className="add__categoryPrice">
          <div className="add__categoryPrice--category">
            <p>Produkt Kategoriyasi</p>
            <select
              value={data.category}
              onChange={onChangeHandler}
              name="category"
              required
            >
              <option value="Milliy">Milliy Taom</option>
              <option value="Salad">Salad</option>
              <option value="Shirinliklar">Shirinliklar</option>
              <option value="Ichimliklar">Ichimliklar</option>
            </select>
          </div>
          <div className="add__categoryPrice--price">
            <p>Produkt narxi</p>
            <input
              value={data.price}
              onChange={onChangeHandler}
              type="number"
              name="price"
              placeholder="10.000 so'm"
              required
            />
          </div>
        </div>
        <button type="submit" className="addBtn">
          Qo'shish
        </button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default AddPage;
