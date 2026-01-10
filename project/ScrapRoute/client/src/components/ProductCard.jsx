import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

const ProductCard = ({ product }) => {
  const { user } = useContext(AuthContext);

  const handleAddToCart = () => {
    if (!user) {
      alert("Please login to add items to your cart!");
      return;
    }
    console.log(`Added ${product.name} to cart`);
    // Add your cart logic here
  };

  return (
    <div style={styles.card}>
      <img 
        src={product.image || 'https://via.placeholder.com/150'} 
        alt={product.name} 
        style={styles.image} 
      />
      <div style={styles.details}>
        <h3 style={styles.name}>{product.name}</h3>
        <p style={styles.category}>{product.category}</p>
        <p style={styles.price}>${product.price}</p>
        
        <div style={styles.actions}>
          <Link to={`/product/${product._id}`} style={styles.viewBtn}>
            View Details
          </Link>
          
          <button 
            onClick={handleAddToCart} 
            style={user ? styles.cartBtn : styles.disabledBtn}
          >
            {user ? 'Add to Cart' : 'Login to Buy'}
          </button>
        </div>
      </div>
    </div>
  );
};

const styles = {
  card: {
    border: '1px solid #ddd',
    borderRadius: '8px',
    overflow: 'hidden',
    width: '250px',
    margin: '15px',
    boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
    backgroundColor: '#fff'
  },
  image: {
    width: '100%',
    height: '200px',
    objectFit: 'cover'
  },
  details: {
    padding: '15px',
    textAlign: 'center'
  },
  name: {
    fontSize: '1.2rem',
    margin: '10px 0'
  },
  category: {
    color: '#777',
    fontSize: '0.9rem',
    marginBottom: '10px'
  },
  price: {
    fontSize: '1.1rem',
    fontWeight: 'bold',
    color: '#2ecc71',
    marginBottom: '15px'
  },
  actions: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px'
  },
  viewBtn: {
    textDecoration: 'none',
    color: '#3498db',
    fontSize: '0.9rem',
    border: '1px solid #3498db',
    padding: '5px',
    borderRadius: '4px'
  },
  cartBtn: {
    backgroundColor: '#2ecc71',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'pointer'
  },
  disabledBtn: {
    backgroundColor: '#bdc3c7',
    color: 'white',
    border: 'none',
    padding: '8px',
    borderRadius: '4px',
    cursor: 'not-allowed'
  }
};

export default ProductCard;