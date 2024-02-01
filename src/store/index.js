import { configureStore } from '@reduxjs/toolkit';
import userDetailReducer from "./userDetail-slice.js";
import { persistStore, persistReducer } from 'redux-persist';
// import rootReducer from './reducers';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, userDetailReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
});

export const persistor = persistStore(store);

/*
const store = configureStore({
    reducer: {
      userDetail: userDetailReducer
    } 
});
  
export default store;*/
  