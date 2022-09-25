import { createSlice } from '@reduxjs/toolkit';

interface PageState {
  value: 'login' | 'signup';
}

const initialState = { page: 'login' };

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setLoginPage: (state) => {
      state.page = 'login';
    },
    setSignUpPage: (state) => {
      state.page = 'signup';
    },
    resetPage: (state) => {
      state.page = initialState.page;
    },
  },
});

const { actions, reducer: pageReducer } = pageSlice;
export const { setLoginPage, setSignUpPage, resetPage } = actions;
export default pageReducer;
