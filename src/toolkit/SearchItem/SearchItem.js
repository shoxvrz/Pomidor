import { createSlice } from '@reduxjs/toolkit';

const searchSlice = createSlice({
  name: 'searchItems',
  initialState: {
    searchedItem: '',
  },
  reducers: {
    searchItem(state, action) {
      state.searchedItem = action.payload;
    },
  }
});

export const { searchItem } = searchSlice.actions;
export default searchSlice.reducer;
