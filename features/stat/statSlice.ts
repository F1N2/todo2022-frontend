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

const statSlice = createSlice({
  name: 'stat',
  initialState,
  reducers: {
    setStat: (state, action: PayloadAction<Stat>) => {
      state.stat = { ...action.payload };
    },
    resetState: (state) => {
      state.stat = initialState.stat;
    },
  },
});

const { actions, reducer: statReducer } = statSlice;
export const { setStat, resetState } = actions;
export default statReducer;
