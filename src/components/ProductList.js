import React, { useState } from 'react';
import ProductItem from './ProductItem';
import useFetchProducts from '../hooks/useFetchProducts';
import PropTypes from 'prop-types';

const ProductList = () => {
  const { products, loading, error } = useFetchProducts();
  const [searchTerm, setSearchTerm] = useState('');

  if (loading) return <div>Loading products...</div>;
  if (error) return <div>Error: {error}</div>;

  const filteredProducts = products.filter(product =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <div style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          placeholder="Search products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: '0.5rem',
            fontSize: '1rem',
            borderRadius: '4px',
            border: '1px solid #ddd'
          }}
        />
      </div>

      {filteredProducts.length === 0 ? (
        <div>No products found</div>
      ) : (
        <div className="grid">
          {filteredProducts.map(product => (
            <ProductItem key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductList; 