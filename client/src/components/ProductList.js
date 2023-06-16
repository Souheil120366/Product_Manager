import React, {useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';
import DeleteButton from './DeleteButton';

const ProductList = props => {
  const {productList, setProductList} = props;

  const removeFromDom = productId => {
    setProductList (productList.filter (product => product._id !== productId));
  };

  return (
    <div>
      <header>
        All Products
      </header>
      <table>
        <tr>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
        {productList.map ((product, index) => {
          return (
            <tr key={index}>
              <td>
                <Link to={`/${product._id}`}>
                  {' '}{product.title}{' '}
                </Link>
              </td>
              <td>
                <Link to={'/edit/' + product._id}>
                  Edit
                </Link>
              </td>
              <td>
                <DeleteButton
                  productId={product._id}
                  successCallback={() => removeFromDom (product._id)}
                />
              </td>
            </tr>
          );
        })}
      </table>
    </div>
  );
};
export default ProductList;
