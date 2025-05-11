import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';
import PropTypes from 'prop-types';

const Checkout = () => {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
    country: '',
    zipCode: '',
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: ''
  });
  const [errors, setErrors] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const validateForm = () => {
    const newErrors = {};
    if (step === 1) {
      if (!formData.firstName) newErrors.firstName = 'First name is required';
      if (!formData.lastName) newErrors.lastName = 'Last name is required';
      if (!formData.email) newErrors.email = 'Email is required';
      if (!formData.address) newErrors.address = 'Address is required';
      if (!formData.city) newErrors.city = 'City is required';
      if (!formData.country) newErrors.country = 'Country is required';
      if (!formData.zipCode) newErrors.zipCode = 'ZIP code is required';
    } else if (step === 2) {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.cardName) newErrors.cardName = 'Name on card is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleNext = () => {
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleBack = () => {
    setStep(1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      setIsProcessing(true);
      // Simulate payment processing
      setTimeout(() => {
        dispatch(clearCart());
        navigate('/success');
      }, 2000);
    }
  };

  return (
    <div className="container" style={{ padding: '2rem 0' }}>
      <h1 style={{ 
        marginBottom: '2rem',
        color: 'var(--text-primary)',
        fontSize: '2rem',
        fontWeight: '600',
        textAlign: 'center'
      }}>
        Checkout
      </h1>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 400px',
        gap: '2rem',
        alignItems: 'start'
      }}>
        <div style={{
          backgroundColor: 'var(--background-dark)',
          padding: '2rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '2rem',
            position: 'relative'
          }}>
            <div style={{
              width: '100%',
              height: '2px',
              backgroundColor: 'var(--border-color)',
              position: 'absolute',
              top: '50%',
              transform: 'translateY(-50%)'
            }} />
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              position: 'relative',
              zIndex: 1
            }}>
              {[1, 2].map((s) => (
                <div
                  key={s}
                  style={{
                    width: '40px',
                    height: '40px',
                    borderRadius: '50%',
                    backgroundColor: s <= step ? 'var(--primary-color)' : 'var(--background-dark)',
                    border: `2px solid ${s <= step ? 'var(--primary-color)' : 'var(--border-color)'}`,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: s <= step ? 'white' : 'var(--text-secondary)',
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {s}
                </div>
              ))}
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            {step === 1 ? (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      First Name
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.firstName ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.firstName && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.firstName}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Last Name
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.lastName ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.lastName && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.lastName}
                      </span>
                    )}
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'var(--card-bg)',
                      border: `1px solid ${errors.email ? 'var(--danger-color)' : 'var(--border-color)'}`,
                      borderRadius: '8px',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {errors.email && (
                    <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.email}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'var(--card-bg)',
                      border: `1px solid ${errors.address ? 'var(--danger-color)' : 'var(--border-color)'}`,
                      borderRadius: '8px',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {errors.address && (
                    <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.address}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      City
                    </label>
                    <input
                      type="text"
                      name="city"
                      value={formData.city}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.city ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.city && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.city}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Country
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.country ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.country && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.country}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      name="zipCode"
                      value={formData.zipCode}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.zipCode ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.zipCode && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.zipCode}
                      </span>
                    )}
                  </div>
                </div>

                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleNext}
                  style={{ marginTop: '1rem' }}
                >
                  Continue to Payment
                </button>
              </div>
            ) : (
              <div style={{ display: 'grid', gap: '1.5rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Card Number
                  </label>
                  <input
                    type="text"
                    name="cardNumber"
                    value={formData.cardNumber}
                    onChange={handleInputChange}
                    placeholder="1234 5678 9012 3456"
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'var(--card-bg)',
                      border: `1px solid ${errors.cardNumber ? 'var(--danger-color)' : 'var(--border-color)'}`,
                      borderRadius: '8px',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {errors.cardNumber && (
                    <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.cardNumber}
                    </span>
                  )}
                </div>

                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                    Name on Card
                  </label>
                  <input
                    type="text"
                    name="cardName"
                    value={formData.cardName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '0.75rem',
                      backgroundColor: 'var(--card-bg)',
                      border: `1px solid ${errors.cardName ? 'var(--danger-color)' : 'var(--border-color)'}`,
                      borderRadius: '8px',
                      color: 'var(--text-primary)'
                    }}
                  />
                  {errors.cardName && (
                    <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                      {errors.cardName}
                    </span>
                  )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      name="expiryDate"
                      value={formData.expiryDate}
                      onChange={handleInputChange}
                      placeholder="MM/YY"
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.expiryDate ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.expiryDate && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.expiryDate}
                      </span>
                    )}
                  </div>
                  <div>
                    <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-primary)' }}>
                      CVV
                    </label>
                    <input
                      type="text"
                      name="cvv"
                      value={formData.cvv}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '0.75rem',
                        backgroundColor: 'var(--card-bg)',
                        border: `1px solid ${errors.cvv ? 'var(--danger-color)' : 'var(--border-color)'}`,
                        borderRadius: '8px',
                        color: 'var(--text-primary)'
                      }}
                    />
                    {errors.cvv && (
                      <span style={{ color: 'var(--danger-color)', fontSize: '0.875rem', marginTop: '0.25rem' }}>
                        {errors.cvv}
                      </span>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
                  <button
                    type="button"
                    className="btn"
                    onClick={handleBack}
                    style={{
                      backgroundColor: 'transparent',
                      color: 'var(--text-primary)',
                      border: '1px solid var(--border-color)'
                    }}
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="btn btn-primary"
                    disabled={isProcessing}
                    style={{ flex: 1 }}
                  >
                    {isProcessing ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                        <span className="loading-spinner" style={{ width: '20px', height: '20px' }} />
                        Processing...
                      </span>
                    ) : (
                      'Complete Purchase'
                    )}
                  </button>
                </div>
              </div>
            )}
          </form>
        </div>

        <div style={{
          position: 'sticky',
          top: '2rem',
          backgroundColor: 'var(--background-dark)',
          padding: '1.5rem',
          borderRadius: '12px',
          border: '1px solid var(--border-color)'
        }}>
          <h2 style={{ 
            color: 'var(--text-primary)',
            marginBottom: '1.5rem',
            fontSize: '1.5rem'
          }}>
            Order Summary
          </h2>

          <div style={{ marginBottom: '1.5rem' }}>
            {cart.items.map((item) => (
              <div
                key={item.id}
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1rem',
                  paddingBottom: '1rem',
                  borderBottom: '1px solid var(--border-color)'
                }}
              >
                <img
                  src={item.thumbnail}
                  alt={item.title}
                  style={{
                    width: '60px',
                    height: '60px',
                    objectFit: 'cover',
                    borderRadius: '8px'
                  }}
                />
                <div style={{ flex: 1 }}>
                  <h3 style={{ 
                    color: 'var(--text-primary)',
                    fontSize: '1rem',
                    marginBottom: '0.25rem'
                  }}>
                    {item.title}
                  </h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>
                    Quantity: {item.quantity}
                  </p>
                </div>
                <span style={{ color: 'var(--text-primary)', fontWeight: '500' }}>
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </div>
            ))}
          </div>

          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            color: 'var(--text-secondary)'
          }}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div style={{ 
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '1rem',
            color: 'var(--text-secondary)'
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
            fontWeight: '600'
          }}>
            <span>Total</span>
            <span>${total.toFixed(2)}</span>
          </div>

          <div style={{
            display: 'flex',
            gap: '1rem',
            color: 'var(--text-secondary)',
            fontSize: '0.9rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>🔒</span> Secure Checkout
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <span>💳</span> Multiple Payment Options
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout; 