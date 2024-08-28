import React, { useState } from 'react';
import './ExploreMenu.scss';
import { menu_list } from '../../assets/assets';
import { useSelector, useDispatch } from 'react-redux';
import { selectCategory } from '../../toolkit/Food/filterFood';

const ExploreMenu = () => {
  const dispatch = useDispatch();
  const selectedCategory = useSelector((state) => state.category.selectedCategory);
  const [localCategory, setLocalCategory] = useState('all');

  const handleCategoryChange = (category) => {
    setLocalCategory(category);
    dispatch(selectCategory(category));
  };

  return (
    <div className='expMenu' id='expMenu'>
      <h1>Bizning menyu bilan tanishing</h1>
      <p>
        Taomlar qatorini o'z ichiga olgan turli xil menyudan tanlang. Bizning
        vazifamiz sizning xohishingizni qondirish va ovqatlanish tajribangizni
        bir vaqtning o'zida bitta mazali taom bilan ta'minlashdir.
      </p>
      <div className='expMenu__list'>
        {menu_list.map((item, index) => (
          <div
            key={index}
            className='expMenu__list--item'
            onClick={() =>
              handleCategoryChange(selectedCategory === item.menu_name ? 'all' : item.menu_name)
            }
          >
            <img
              className={selectedCategory === item.menu_name ? 'activeImg' : ''}
              src={item.menu_image}
              alt={item.menu_name}
            />
            <p>{item.menu_name}</p>
          </div>
        ))}
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
