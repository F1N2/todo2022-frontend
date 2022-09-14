import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Stat } from '../../module/statistics';

const initialState: { stat: Stat } = {
  stat: {
    year: { checked: 0, total: 0, percent: 0 },
    month: { checked: 0, total: 0, percent: 0 },
    week: { checked: 0, total: 0, percent: 0 },
    yesterday: { checked: 0, total: 0, percent: 0 },
  },
};

const setSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    setStat: (state, action: PayloadAction<Stat>) => {
      state.stat = { ...action.payload };
    },
  },
});

const { actions, reducer: statReducer } = setSlice;
export const { setStat } = actions;
export default statReducer;
