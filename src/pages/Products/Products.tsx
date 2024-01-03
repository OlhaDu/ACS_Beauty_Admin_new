import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from "./Products.module.scss";
import ToolsPanel from "src/components/ToolsPanel/ToolsPanel";
import { ProductElem, ProductsResponse } from "src/types";
import { DataGrid, GridColDef } from '@mui/x-data-grid';

const Products = () => {
  const [productsArray, setProductsArray] = useState<ProductElem[]>([]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/product?page=1&pageSize=25&availability=true&discount=true&category=23&lookup=subcategory7");

        if (!response.data) {
          throw new Error('Failed to fetch products');
        }

        const productsRes: ProductsResponse = response.data;
        setProductsArray(productsRes.products);
      } catch (error) {
        if (error instanceof Error) {
          console.error('Error fetching products:', error.message);
        } else {
          console.error('Unknown error:', error);
        }
      }
    };

    fetchProducts();
  }, []); 

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'ID', width: 70 },
    // { field: 'img', headerName: 'Фото товару', width: 100 },
    { field: 'name', headerName: 'Назва товару', width: 250 },
    // { field: 'category', headerName: 'Категорія', width: 100 },
    { field: 'price', headerName: 'Ціна', width: 70 },
    // { field: 'display', headerName: 'Відображення', width: 120 },
    { field: 'createdAt', headerName: 'Створено', width: 150 },
  ];

  return (
    <>
      <ToolsPanel />
      <div className={styles.products_table}>
      <DataGrid
        rows={productsArray}
        columns={columns}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 15, 20]}
      />
    </div>
    </>
  );
};

export default Products;
