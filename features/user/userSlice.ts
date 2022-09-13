import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface UserState {
  id: string;
  name: string;
  email: string;
  created: Date;
  updated: Date;
  accessToken: string;
}

const initialState: { user?: UserState } = {};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<UserState>) => {
      state.user = {
        ...action.payload,
      };
    },
    logout: (state) => {
      state.user = undefined;
    },
  },
});

const { actions, reducer: userReducer } = userSlice;
export const { login, logout } = actions;
export default userReducer;
