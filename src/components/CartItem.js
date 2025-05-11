import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { removeFromCart, updateQuantity } from '../redux/cartSlice';
import PropTypes from 'prop-types';

const CartItem = ({ item }) => {
  const dispatch = useDispatch();
  const { id, title, price, thumbnail, quantity } = item;
  const [isRemoving, setIsRemoving] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const handleQuantityChange = (newQuantity) => {
    if (newQuantity > 0) {
      setIsUpdating(true);
      dispatch(updateQuantity({ id, quantity: newQuantity }));
      setTimeout(() => setIsUpdating(false), 500);
    }
  };

  const handleRemove = () => {
    setIsRemoving(true);
    setTimeout(() => {
      dispatch(removeFromCart(id));
    }, 300);
  };

  return (
    <div 
      className={`card animate-fade-in ${isRemoving ? 'animate-slide-in' : ''}`}
      style={{ 
        display: 'flex', 
        gap: '1.5rem', 
        alignItems: 'center',
        opacity: isRemoving ? 0 : 1,
        transform: isRemoving ? 'translateX(20px)' : 'translateX(0)',
        transition: 'all 0.3s ease',
        position: 'relative',
        overflow: 'hidden'
      }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div style={{
        position: 'relative',
        width: '100px',
        height: '100px',
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: isHovered ? '0 4px 12px rgba(0, 0, 0, 0.2)' : 'none',
        transition: 'all 0.3s ease'
      }}>
        <img
          src={thumbnail}
          alt={title}
          style={{
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
          background: 'linear-gradient(to bottom, transparent 50%, rgba(0,0,0,0.3))',
          opacity: isHovered ? 1 : 0,
          transition: 'opacity 0.3s ease'
        }} />
      </div>
      
      <div style={{ flex: 1 }}>
        <h3 style={{ 
          margin: '0 0 0.5rem 0',
          color: 'var(--text-primary)',
          transition: 'color 0.3s ease',
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
        }}>
          {title}
        </h3>
        <p style={{ 
          color: 'var(--text-secondary)', 
          marginBottom: '0.5rem',
          fontSize: '0.9rem',
          transition: 'all 0.3s ease',
          transform: isHovered ? 'translateX(4px)' : 'translateX(0)'
        }}>
          ${price.toFixed(2)} each
        </p>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem'
        }}>
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '0.5rem',
            backgroundColor: 'var(--background-dark)',
            padding: '0.25rem',
            borderRadius: '8px',
            border: '1px solid var(--border-color)',
            boxShadow: isHovered ? '0 2px 8px rgba(0, 0, 0, 0.1)' : 'none',
            transition: 'all 0.3s ease'
          }}>
            <button
              className="btn"
              onClick={() => handleQuantityChange(quantity - 1)}
              style={{ 
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
              }}
              disabled={isUpdating}
            >
              -
            </button>
            <span style={{ 
              color: 'var(--text-primary)',
              minWidth: '2rem',
              textAlign: 'center',
              transition: 'all 0.3s ease',
              transform: isUpdating ? 'scale(1.2)' : 'scale(1)'
            }}>
              {quantity}
            </span>
            <button
              className="btn"
              onClick={() => handleQuantityChange(quantity + 1)}
              style={{ 
                padding: '0.25rem 0.5rem',
                backgroundColor: 'transparent',
                color: 'var(--text-primary)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                transform: isHovered ? 'scale(1.1)' : 'scale(1)'
              }}
              disabled={isUpdating}
            >
              +
            </button>
          </div>
          
          <button
            className="btn btn-danger"
            onClick={handleRemove}
            style={{ 
              marginLeft: 'auto',
              padding: '0.5rem 1rem',
              opacity: isRemoving ? 0.5 : 1,
              transform: isHovered ? 'translateY(-2px)' : 'translateY(0)',
              boxShadow: isHovered ? '0 4px 12px rgba(239, 68, 68, 0.2)' : 'none'
            }}
            disabled={isRemoving}
          >
            {isRemoving ? 'Removing...' : 'Remove'}
          </button>
        </div>
      </div>
    </div>
  );
};

CartItem.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    thumbnail: PropTypes.string.isRequired,
    quantity: PropTypes.number.isRequired,
  }).isRequired,
};

export default CartItem; 