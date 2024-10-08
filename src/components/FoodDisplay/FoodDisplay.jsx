import React from 'react';
import { useSelector } from 'react-redux';
import { useGetAllDataQuery } from '../../toolkit/Food/foodApi';
import FoodItem from '../FoodItem/FoodItem';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './FoodDisplay.scss';

const FoodDisplay = () => {
  const { data, error, isLoading } = useGetAllDataQuery();
  const searchQuery = useSelector((state) => state.search.searchedItem);
  const selectedCategory = useSelector((state) => state.category.selectedCategory);

  if (isLoading) {
    return (
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const filteredItems = data
    .filter((item) => item.name.toLowerCase().includes(searchQuery.toLowerCase()))
    .filter((item) => selectedCategory === 'all' || item.category === selectedCategory);

  return (
    <div className="dispFood">
      <h2>Sizga yaqin eng yaxshi taomlar</h2>
      <div className="dispFood__list">
        {filteredItems.length > 0 ? (
          filteredItems.map((item) => <FoodItem key={item.id} {...item} />)
        ) : (
          <p>Hech narsa topilmadi!</p>
        )}
      </div>
    </div>
  );
};

export default FoodDisplay;
