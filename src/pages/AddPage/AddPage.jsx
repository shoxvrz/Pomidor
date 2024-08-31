import React, { useState } from "react";
import { assets } from "../../admin_assets/assets";
import "./AddPage.scss";
import axios from "axios";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddPage = () => {
  const [image, setImage] = useState("");
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



  const onImageUrlChange = (e) => {
    setImage(e.target.value);  
  };

const onSubmitHandler = async (e) => {
  e.preventDefault();

  const payload = {
    name: data.name,
    description: data.description,
    price: Number(data.price),
    category: data.category,
    image: image || "", 
  };

  console.log("Submitting form with data:", payload);

  try {
    const response = await axios.post("https://66adf655b18f3614e3b65836.mockapi.io/pomidor/foodData", payload);

    console.log("Response:", response);

    if (response.status === 201) {
      setData({
        name: "",
        description: "",
        price: "",
        category: "Milliy",
      });
      setImage("");
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
          <p>Produkt Rasmi</p>
          <input
            onChange={onImageUrlChange}
            value={image}
            type="text"
            placeholder="Or enter image URL"
            name="imageUrl"
            required={!image}
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
              <option value="Salatlar">Salatlar</option>
              <option value="Rulonlar">Rulonlar</option>
              <option value="Shirinliklar">Shirinliklar</option>
              <option value="Sendvichlar">Sendvichlar</option>             
              <option value="To'rtlar">To'rtlar</option>
              <option value="Tabiiy">Tabiiy</option>
              <option value="Makaron">Makaron</option>
              <option value="Milliy">Milliy Taom</option>
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
