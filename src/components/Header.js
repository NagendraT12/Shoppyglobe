import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import PropTypes from 'prop-types';

const Header = () => {
  const cartItems = useSelector(state => state.cart.items);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header style={{
      backgroundColor: scrolled ? 'rgba(31, 41, 55, 0.95)' : 'var(--card-bg)',
      padding: '1rem',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backdropFilter: 'blur(10px)',
      transition: 'all 0.3s ease',
      boxShadow: scrolled ? '0 4px 6px rgba(0, 0, 0, 0.1)' : 'none'
    }}>
      <nav className="container" style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>
        <Link 
          to="/" 
          className="animate-fade-in"
          style={{
            textDecoration: 'none',
            color: 'var(--text-primary)',
            fontSize: '1.5rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem'
          }}
        >
          <span style={{ color: 'var(--primary-color)' }}>Shoppy</span>Globe
        </Link>
        
        <div style={{ 
          display: 'flex', 
          gap: '2rem', 
          alignItems: 'center'
        }}>
          <Link 
            to="/" 
            style={{ 
              textDecoration: 'none', 
              color: location.pathname === '/' ? 'var(--primary-color)' : 'var(--text-secondary)',
              fontWeight: location.pathname === '/' ? '600' : '400',
              transition: 'all 0.3s ease',
              position: 'relative'
            }}
          >
            Home
            {location.pathname === '/' && (
              <span style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--primary-color)',
                animation: 'slideIn 0.3s ease-out'
              }} />
            )}
          </Link>
          
          <Link 
            to="/cart" 
            style={{ 
              textDecoration: 'none', 
              color: location.pathname === '/cart' ? 'var(--primary-color)' : 'var(--text-secondary)',
              fontWeight: location.pathname === '/cart' ? '600' : '400',
              transition: 'all 0.3s ease',
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}
          >
            <span>Cart</span>
            {totalItems > 0 && (
              <span style={{
                backgroundColor: 'var(--primary-color)',
                color: 'white',
                borderRadius: '50%',
                padding: '0.25rem 0.5rem',
                fontSize: '0.75rem',
                fontWeight: 'bold',
                animation: 'fadeIn 0.3s ease-out'
              }}>
                {totalItems}
              </span>
            )}
            {location.pathname === '/cart' && (
              <span style={{
                position: 'absolute',
                bottom: '-4px',
                left: 0,
                width: '100%',
                height: '2px',
                backgroundColor: 'var(--primary-color)',
                animation: 'slideIn 0.3s ease-out'
              }} />
            )}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 