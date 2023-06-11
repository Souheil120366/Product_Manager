import React, {useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';

const ProductList = props => {
  
  const {product, setProduct} = props;

  useEffect (() => {
    axios
      .get ('http://localhost:8000/api/product')
      .then (res => {
        console.log (res.data);
        setProduct (res.data);
      })
      .catch (err => {
        console.log (err);
      });
  }, []);

  return (
    <div>
      <header>
        All Products
      </header>
      {product.map ((product, index) => {
        return (
          <div key={index}>
            <p><Link to={`/${product._id}`}>
              {' '}{product.title}{' '}
            </Link></p>
            
          </div>
        );
      })}
    </div>
  );
};
export default ProductList;
