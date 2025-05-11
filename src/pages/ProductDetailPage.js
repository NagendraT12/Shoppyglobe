import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';

const ProductDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product');
        }
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <div>Loading product details...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!product) return <div>Product not found</div>;

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  return (
    <div className="card" style={{ maxWidth: '800px', margin: '0 auto' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <img
            src={product.thumbnail}
            alt={product.title}
            style={{
              width: '100%',
              height: 'auto',
              borderRadius: '8px'
            }}
          />
        </div>
        
        <div>
          <h1 style={{ marginBottom: '1rem' }}>{product.title}</h1>
          <p style={{ color: '#666', marginBottom: '1rem' }}>
            {product.description}
          </p>
          
          <div style={{ marginBottom: '1rem' }}>
            <p style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#007bff' }}>
              ${product.price.toFixed(2)}
            </p>
            <p style={{ color: '#666' }}>
              Rating: {product.rating} ⭐
            </p>
          </div>
          
          <div style={{ marginBottom: '1rem' }}>
            <p><strong>Brand:</strong> {product.brand}</p>
            <p><strong>Category:</strong> {product.category}</p>
            <p><strong>Stock:</strong> {product.stock} units</p>
          </div>
          
          <button
            className="btn btn-primary"
            onClick={handleAddToCart}
            style={{ width: '100%' }}
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage; 