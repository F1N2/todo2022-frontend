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
    setModalData: (state, action: PayloadAction<any>) => {
      state.data = action.payload;
    },
  },
});

const { actions, reducer: modalReducer } = modalSlice;
export const { setModal, setModalData } = actions;
export default modalReducer;
