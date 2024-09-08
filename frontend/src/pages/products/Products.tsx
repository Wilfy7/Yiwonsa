import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ProductsStyles.scss"; 
import { Link } from "react-router-dom";

const baseUrl = process.env.REACT_APP_API;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${baseUrl}/products/all`);
        setProducts(res.data.data || []);
        setLoading(false);
      } catch (error: any) {
        setError(error.message);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="products-container">
      <h1>All Products</h1>
      <div className="product-grid">
        {products.map((product: any) => { 
            return (
          <div key={product.id || product._id} className="product-card"> 
            <img
              src={product.image}
              alt={product.name}
              className="product-image"
            />
            <div className="product-details">
              <h2 className="product-title"></h2>
              <p className="product-description">{product.description}</p>
              <p className="product-price">kr {product.price}</p>
            </div>
          </div>
        );
    })}
      </div>
      <Link to="/product/create">Create Product</Link>
    </div>
  );
};

export default Products;

