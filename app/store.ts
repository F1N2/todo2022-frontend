import { combineReducers, configureStore } from '@reduxjs/toolkit';
import storage from 'redux-persist/lib/storage';
import userReducer from '../features/user/userSlice';
import thunk from 'redux-thunk';
import { persistReducer } from 'redux-persist';
import pageReducer from '../features/page/pageSlice';
import statReducer from '../features/stat/statSlice';

const reducers = combineReducers({
  user: userReducer,
  page: pageReducer,
  stat: statReducer,
});

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  devTools: process.env.NODE_ENV !== 'production',
  middleware: [thunk],
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
