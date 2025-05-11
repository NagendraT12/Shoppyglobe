import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import CartItem from '../components/CartItem';
import { clearCart } from '../redux/cartSlice';

const Cart = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isClearing, setIsClearing] = useState(false);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleCheckout = () => {
    navigate('/checkout');
  };

  const handleClearCart = () => {
    setIsClearing(true);
    setTimeout(() => {
      dispatch(clearCart());
      setIsClearing(false);
    }, 500);
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ 
        marginBottom: '2rem',
        color: 'var(--text-primary)',
        fontSize: '2rem',
        fontWeight: '600',
        textAlign: 'center',
        position: 'relative',
        paddingBottom: '1rem'
      }}>
        Shopping Cart
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60px',
          height: '3px',
          background: 'linear-gradient(to right, var(--primary-color), var(--primary-hover))',
          borderRadius: '2px'
        }} />
      </h1>

      {cart.items.length === 0 ? (
        <div style={{ 
          textAlign: 'center',
          padding: '3rem',
          backgroundColor: 'var(--background-dark)',
          borderRadius: '12px',
          border: '1px solid var(--border-color)',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
          animation: 'fadeIn 0.5s ease-out'
        }}>
          <h2 style={{ 
            color: 'var(--text-primary)',
            marginBottom: '1rem',
            fontSize: '1.5rem'
          }}>
            Your cart is empty
          </h2>
          <p style={{ 
            color: 'var(--text-secondary)',
            marginBottom: '2rem',
            fontSize: '1.1rem'
          }}>
            Add some products to your cart to continue shopping
          </p>
          <button
            className="btn btn-primary"
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              fontSize: '1rem',
              boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 6px 16px rgba(124, 58, 237, 0.3)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
            }}
          >
            Continue Shopping
          </button>
        </div>
      ) : (
        <div style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr 300px',
          gap: '2rem',
          alignItems: 'start'
        }}>
          <div style={{ 
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem'
          }}>
            {cart.items.map((item) => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div style={{ 
            position: 'sticky',
            top: '2rem',
            backgroundColor: 'var(--background-dark)',
            padding: '1.5rem',
            borderRadius: '12px',
            border: '1px solid var(--border-color)',
            boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
            transition: 'all 0.3s ease'
          }}>
            <h2 style={{ 
              color: 'var(--text-primary)',
              marginBottom: '1.5rem',
              fontSize: '1.5rem',
              position: 'relative',
              paddingBottom: '0.5rem'
            }}>
              Order Summary
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                width: '40px',
                height: '2px',
                background: 'linear-gradient(to right, var(--primary-color), var(--primary-hover))',
                borderRadius: '2px'
              }} />
            </h2>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease'
            }}>
              <span>Subtotal</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1rem',
              color: 'var(--text-secondary)',
              transition: 'all 0.3s ease'
            }}>
              <span>Shipping</span>
              <span style={{ color: 'var(--success-color)' }}>Free</span>
            </div>

            <div style={{ 
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '1.5rem',
              paddingTop: '1rem',
              borderTop: '1px solid var(--border-color)',
              color: 'var(--text-primary)',
              fontSize: '1.2rem',
              fontWeight: '600',
              transition: 'all 0.3s ease'
            }}>
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>

            <button
              className="btn btn-primary"
              onClick={handleCheckout}
              style={{
                width: '100%',
                marginBottom: '1rem',
                padding: '0.75rem',
                boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 16px rgba(124, 58, 237, 0.3)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(124, 58, 237, 0.2)';
              }}
            >
              Proceed to Checkout
            </button>

            <button
              className="btn btn-danger"
              onClick={handleClearCart}
              style={{
                width: '100%',
                padding: '0.75rem',
                backgroundColor: 'transparent',
                color: 'var(--danger-color)',
                border: '1px solid var(--danger-color)',
                transition: 'all 0.3s ease',
                opacity: isClearing ? 0.5 : 1
              }}
              disabled={isClearing}
              onMouseEnter={(e) => {
                if (!isClearing) {
                  e.currentTarget.style.transform = 'translateY(-2px)';
                  e.currentTarget.style.boxShadow = '0 4px 12px rgba(239, 68, 68, 0.2)';
                }
              }}
              onMouseLeave={(e) => {
                if (!isClearing) {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = 'none';
                }
              }}
            >
              {isClearing ? 'Clearing...' : 'Clear Cart'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart; 