import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addToCart } from '../redux/cartSlice';
import PropTypes from 'prop-types';

const ProductItem = ({ product }) => {
  const dispatch = useDispatch();
  const { id, title, price, thumbnail, rating } = product;
  const [isHovered, setIsHovered] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  const handleAddToCart = () => {
    setIsAdding(true);
    dispatch(addToCart(product));
    setTimeout(() => setIsAdding(false), 1000);
  };

  return (
    <div 
      className="card animate-fade-in"
      style={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        transform: isHovered ? 'translateY(-8px)' : 'translateY(0)',
        transition: 'all 0.3s ease'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link 
        to={`/product/${id}`} 
        style={{ 
          textDecoration: 'none', 
          color: 'inherit',
          position: 'relative',
          overflow: 'hidden',
          borderRadius: '8px'
        }}
      >
        <div style={{
          position: 'relative',
          paddingTop: '100%',
          overflow: 'hidden',
          borderRadius: '8px'
        }}>
          <img
            src={thumbnail}
            alt={title}
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              transition: 'transform 0.3s ease',
              transform: isHovered ? 'scale(1.1)' : 'scale(1)'
            }}
          />
          <div style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.7))',
            opacity: isHovered ? 1 : 0,
            transition: 'opacity 0.3s ease'
          }} />
        </div>
        
        <h3 style={{ 
          margin: '1rem 0', 
          fontSize: '1.1rem',
          color: 'var(--text-primary)',
          transition: 'color 0.3s ease'
        }}>
          {title}
        </h3>
      </Link>
      
      <div style={{ marginTop: 'auto' }}>
        <div style={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: '1rem'
        }}>
          <p style={{ 
            color: 'var(--text-secondary)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.25rem'
          }}>
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index} style={{ 
                color: index < Math.floor(rating) ? '#fbbf24' : '#4b5563'
              }}>
                ★
              </span>
            ))}
          </p>
          <p style={{ 
            fontWeight: 'bold',
            color: 'var(--primary-color)',
            fontSize: '1.2rem'
          }}>
            ${price.toFixed(2)}
          </p>
        </div>
        
        <button
          className={`btn btn-primary ${isAdding ? 'animate-fade-in' : ''}`}
          onClick={handleAddToCart}
          style={{ 
            width: '100%',
            position: 'relative',
            overflow: 'hidden'
          }}
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
    </div>
  );
};

ProductItem.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProductItem; 