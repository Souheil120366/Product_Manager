import React, {useEffect} from 'react';
import axios from 'axios';
import '../App.css';
import {Link} from 'react-router-dom';

const ProductList = props => {
  
  const {product, setProduct} = props;
  const deleteProduct = (productId) => {
    axios.delete('http://localhost:8000/api/product/' + productId)
        .then(res => {
            setProduct(product.filter(product => product._id != productId));
        })
        .catch(err => console.log(err))
}
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
      <table>
        <tr>
          <th>Title</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      {product.map ((product, index) => {
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
                <button onClick={(e)=>{deleteProduct(product._id)}}>
                            Delete
                        </button>
                </td>
            
          
          </tr>
        );
      })}
      </table>
    </div>
  );
};
export default ProductList;
