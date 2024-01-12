import { configureStore } from '@reduxjs/toolkit';
import productsSlice from '../redux/slices/productsSlice';

const store = configureStore({
	reducer: {
		products: productsSlice,
	},
});

export type RootState = ReturnType<typeof store.getState>;
export default store;