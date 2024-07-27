// src/components/FoodDisplay.js
import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllDataQuery } from '../../toolkit/Food/foodApi';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.scss';

const FoodDisplay = () => {
  const { data, error, isLoading } = useGetAllDataQuery();
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredItems = selectedCategory === 'all'
    ? data
    : data.filter((item) => item.category === selectedCategory);

  return (
    <div className='dispFood'>
      <h2>Sizga yaqin eng yaxshi taomlar</h2>
      <div className="dispFood__list">
        {filteredItems.map((item, i) => (
          <FoodItem key={i} {...item} />
        ))}
      </div>
    </div>
  );
};

export default FoodDisplay;
