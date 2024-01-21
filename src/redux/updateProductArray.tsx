import { store } from './store';
import { getProductsAsync } from './slices/productsSlice';
import { useAppSelector } from './selectors';
import { selectProductsPageSize, selectProductsPage } from './hooks';

export const UpdateProductsArray = async () => {
  const page = useAppSelector((state) => selectProductsPage(state)) || 0;
  const pageSize = useAppSelector((state) => selectProductsPageSize(state)) || 10;

  try {
    await store.dispatch(getProductsAsync({ page, pageSize }));
  } catch (error) {
    console.error('Error dispatching actions:', error);
  }
};

