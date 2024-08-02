import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllDataQuery } from '../../toolkit/Food/foodApi';
import FoodItem from '../FoodItem/FoodItem';
import './FoodDisplay.scss';

const FoodDisplay = () => {
  const { data, error, isLoading } = useGetAllDataQuery();
  const searchQuery = useSelector((state) => state.search.searchedItem);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredItems = data.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
