import React, { useEffect, useState } from "react";
import axios from "axios";
import ToolsPanel from "src/components/ToolsPanel/ToolsPanel";

interface ProductElem {
  BrandId: number;
  SubcategoryId: number;
  count: null;
  description: string;
  discount: string;
  hit: boolean;
  id: number;
  name: string;
  novelty: boolean;
  price: string;
}

const Products = () => {
  const [productsArray, setProductsArray] = useState<ProductElem[]>([]);

  const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
  });

  console.log(api);
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get("/api/product?page=1");

        if (!response.data) {
          throw new Error('Failed to fetch products');
        }

        const products: ProductElem[] = response.data;
        setProductsArray(products);
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

  return (
    <>
      <ToolsPanel />
      <div>
        {Array.isArray(productsArray) && productsArray.map((product) => (
          <div key={product.id}>
            <h3>{product.name}</h3>
            <span>{product.description}</span>
          </div>
        ))}
      </div>
    </>
  );
};

export default Products;
