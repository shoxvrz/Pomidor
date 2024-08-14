import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import {toast} from 'react-toastify'
import {useNavigate} from 'react-router-dom'
import './ChangeInfo.scss'

const ChangeInfo = () => {
  const { id } = useParams();
  const [value, setValue] = useState({
    id: id,
    name: "",
    image: "",
    description: "",
    price: "",
    category: "",
  });
const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `https://66adf655b18f3614e3b65836.mockapi.io/pomidor/foodData/${id}`
        );
        setValue({
          id: response.data.id,
          name: response.data.name,
          image: response.data.image,
          description: response.data.description,
          price: response.data.price,
          category: response.data.category,
        });
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [id]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    const response = await axios.put(
      "https://66adf655b18f3614e3b65836.mockapi.io/pomidor/foodData/" + id,
      value
    );
    toast.success('Amal muvaffaqiyatli bajarildi!')
    navigate('/admin/list')
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValue((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <div className="changeInfo">
      <h2>Mahsulot informatsiyasini o'zgartirish</h2>
      <form>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            id="name"
            name="name"
            value={value.name}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="image">Image URL:</label>
          <input
            id="image"
            name="image"
            value={value.image}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="description">Description:</label>
          <input
            id="description"
            name="description"
            value={value.description}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            id="price"
            name="price"
            value={value.price}
            type="text"
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="category">Category:</label>
          <select
            id="category"
            name="category"
            value={value.category}
            onChange={handleChange}
          >
            <option value="Salatlar">Salatlar</option>
            <option value="Rulonlar">Rulonlar</option>
            <option value="Shirinliklar">Shirinliklar</option>
            <option value="Sendvichlar">Sendvichlar</option>
            <option value="To'rtlar">To'rtlar</option>
            <option value="Tabiiy">Tabiiy</option>
            <option value="Makaron">Makaron</option>
            <option value="Milliy">Milliy</option>
          </select>
        </div>
        <button onClick={handleUpdate} type="submit">
          Update
        </button>
      </form>
    </div>
  );
};

export default ChangeInfo;
