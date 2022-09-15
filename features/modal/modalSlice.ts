import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  modal: string | false;
  data?: any;
}

const initialState: ModalState = { modal: false };

const modalSlice = createSlice({
  name: 'modal',
  initialState,
  reducers: {
    setModal: (state, action: PayloadAction<string | false>) => {
      state.modal = action.payload;
    },
    resetState: (state) => {
      state.modal = initialState.modal;
    },
  },
});

const { actions, reducer: modalReducer } = modalSlice;
export const { setModal, resetState } = actions;
export default modalReducer;
