import { createSlice } from '@reduxjs/toolkit';

interface PageState {
  value: 'login' | 'signup';
}

const initialState = { value: 'login' };

const userSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setLoginPage: (state) => {
      state.value = 'login';
    },
    setSignUpPage: (state) => {
      state.value = 'signup';
    },
  },
});

const { actions, reducer: pageReducer } = userSlice;
export const { setLoginPage, setSignUpPage } = actions;
export default pageReducer;
