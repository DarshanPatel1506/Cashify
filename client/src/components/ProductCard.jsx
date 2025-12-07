import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaHeart, FaStar } from 'react-icons/fa';
import '../styles/ProductCard.css';
import { addToCart } from '../redux/slices/cartSlice';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addCart } from '../Api/api';

const ProductCard = ({ product }) => {
  console.log(product);


  const [isWishlisted, setIsWishlisted] = useState(false);
  const dispatch = useDispatch();

  const calculateDiscount = (original, current) => {
    const percent = Math.round(((original - current) / original) * 100);
    return percent;
  };

  const originalPrice = product.price + 5000; // example
  const discount = calculateDiscount(originalPrice, product.price);

  const handleAddCart = async (e) => {
    try {
      e.preventDefault();
      await addCart(product._id);
      dispatch(addToCart(product));
      toast.success(`${product.name} added to cart!`, {
        className: 'custom-toast',
      });
    } catch (error) {
      console.log(error);

      toast.error(error.message)
    }

  }


  return (
    <Link to={`/product/${product._id}`} className="product-link">
      <div className="product-card">
        <div className="img-container">
          <img src={product.images[0]} alt={product.name} />
          {product.stock < 5 && (
            <span className="stock-badge">Only {product.stock} left!</span>
          )}
        </div>

        <div className="info">
          <h2>{product.name}</h2>
          <div className="price-wrapper">
            <span className="price">₹{product.price.toLocaleString()}</span>
            <span className="original">₹{originalPrice.toLocaleString()}</span>
            <span className="discount">({discount}% OFF)</span>
          </div>
          
          <div className="stars">
            <FaStar color='white' className="star-icon" />
            <span>{product.averageRating > 0 ? product.averageRating : 5 }</span>
          </div>

          <div className="actions">
            <button onClick={(e) => {
              e.preventDefault();
              setIsWishlisted(!isWishlisted);
              toast.warning('This feature will be introduced soon!');
            }} className={`wishlist ${isWishlisted ? 'active' : ''}`}>
              <FaHeart /> {isWishlisted ? 'Wishlisted' : 'Wishlist'}
            </button>
            <button onClick={(e) => handleAddCart(e)} className="cart">
              <FaShoppingCart /> Add to Cart
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
