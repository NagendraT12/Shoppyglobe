import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import PropTypes from 'prop-types';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isAdding, setIsAdding] = useState(false);

  useEffect(() => {
    // Simulated API call
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://dummyjson.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart({ ...product, quantity }));
    setTimeout(() => setIsAdding(false), 1000);
  };

  if (loading) {
    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '60vh' 
      }}>
        <div className="loading-spinner" />
      </div>
    );
  }

  if (!product) {
    return (
      <div style={{ 
        textAlign: 'center', 
        padding: '3rem',
        color: 'var(--text-primary)'
      }}>
        <h2>Product not found</h2>
        <button
          className="btn btn-primary"
          onClick={() => navigate('/')}
          style={{ marginTop: '1rem' }}
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '3rem',
        alignItems: 'start'
      }}>
        {/* Image Gallery */}
        <div>
          <div style={{
            position: 'relative',
            borderRadius: '12px',
            overflow: 'hidden',
            marginBottom: '1rem',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)'
          }}>
            <img
              src={product.images[selectedImage]}
              alt={product.title}
              style={{
                width: '100%',
                height: '400px',
                objectFit: 'cover',
                transition: 'transform 0.3s ease'
              }}
            />
          </div>
          
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1rem'
          }}>
            {product.images.map((image, index) => (
              <div
                key={index}
                style={{
                  cursor: 'pointer',
                  borderRadius: '8px',
                  overflow: 'hidden',
                  border: `2px solid ${selectedImage === index ? 'var(--primary-color)' : 'transparent'}`,
                  transition: 'all 0.3s ease'
                }}
                onClick={() => setSelectedImage(index)}
              >
                <img
                  src={image}
                  alt={`${product.title} ${index + 1}`}
                  style={{
                    width: '100%',
                    height: '80px',
                    objectFit: 'cover'
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <h1 style={{
            fontSize: '2rem',
            color: 'var(--text-primary)',
            marginBottom: '1rem'
          }}>
            {product.title}
          </h1>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '1.5rem'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem'
            }}>
              {Array.from({ length: 5 }).map((_, index) => (
                <span key={index} style={{
                  color: index < Math.floor(product.rating) ? '#fbbf24' : '#4b5563'
                }}>
                  ★
                </span>
              ))}
            </div>
            <span style={{ color: 'var(--text-secondary)' }}>
              {product.rating} ({product.stock} in stock)
            </span>
          </div>

          <p style={{
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            lineHeight: '1.6'
          }}>
            {product.description}
          </p>

          <div style={{
            backgroundColor: 'var(--background-dark)',
            padding: '1.5rem',
            borderRadius: '12px',
            marginBottom: '2rem'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem'
            }}>
              <span style={{ color: 'var(--text-secondary)' }}>Price</span>
              <span style={{
                fontSize: '1.5rem',
                fontWeight: 'bold',
                color: 'var(--primary-color)'
              }}>
                ${product.price.toFixed(2)}
              </span>
            </div>

            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.5rem'
            }}>
              <div style={{
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                backgroundColor: 'var(--card-bg)',
                padding: '0.25rem',
                borderRadius: '8px',
                border: '1px solid var(--border-color)'
              }}>
                <button
                  className="btn"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  -
                </button>
                <span style={{
                  color: 'var(--text-primary)',
                  minWidth: '2rem',
                  textAlign: 'center'
                }}>
                  {quantity}
                </span>
                <button
                  className="btn"
                  onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                  style={{
                    padding: '0.25rem 0.5rem',
                    backgroundColor: 'transparent',
                    color: 'var(--text-primary)',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                >
                  +
                </button>
              </div>

              <button
                className="btn btn-primary"
                onClick={handleAddToCart}
                style={{
                  flex: 1,
                  position: 'relative',
                  overflow: 'hidden'
                }}
                disabled={isAdding}
              >
                {isAdding ? (
                  <span style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem'
                  }}>
                    <span className="loading-spinner" style={{ width: '20px', height: '20px' }} />
                    Adding...
                  </span>
                ) : (
                  'Add to Cart'
                )}
              </button>
            </div>

            <div style={{
              display: 'flex',
              gap: '1rem',
              color: 'var(--text-secondary)',
              fontSize: '0.9rem'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🛒</span> Free Shipping
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔄</span> Easy Returns
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span>🔒</span> Secure Payment
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 