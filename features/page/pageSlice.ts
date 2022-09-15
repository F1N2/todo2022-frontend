import { createSlice } from '@reduxjs/toolkit';

interface PageState {
  value: 'login' | 'signup';
}

const initialState = { value: 'login' };

const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setLoginPage: (state) => {
      state.value = 'login';
    },
    setSignUpPage: (state) => {
      state.value = 'signup';
    },
    resetState: (state) => {
      state.value = initialState.value;
    },
  },
});

const { actions, reducer: pageReducer } = pageSlice;
export const { setLoginPage, setSignUpPage, resetState } = actions;
export default pageReducer;
