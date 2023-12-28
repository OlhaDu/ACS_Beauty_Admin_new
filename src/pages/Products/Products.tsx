import React, { useEffect, useState } from "react";
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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('http://16.171.113.245:5000/api/product?page=1');
        
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const products: ProductElem[] = await response.json();
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
      <div>i'm products page</div>
      <div>
        {productsArray.map((product) => (
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
