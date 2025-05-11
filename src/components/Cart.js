import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import CartItem from './CartItem';

const Cart = () => {
  const { items, totalPrice } = useSelector(state => state.cart);

  if (items.length === 0) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <h2>Your cart is empty</h2>
        <Link to="/" className="btn btn-primary" style={{ marginTop: '1rem' }}>
          Continue Shopping
        </Link>
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1rem' }}>Shopping Cart</h2>
      
      <div style={{ marginBottom: '2rem' }}>
        {items.map(item => (
          <CartItem key={item.id} item={item} />
        ))}
      </div>

      <div className="card" style={{ marginTop: '2rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3>Total: ${totalPrice.toFixed(2)}</h3>
          <Link to="/checkout" className="btn btn-primary">
            Proceed to Checkout
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Cart; 