import React from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';

const url = '';

const DeleteProduct = props => {
  const {productId, successCallback} = props;
  const deleteProduct = e => {
    axios
      .delete (url + '/api/product/' + productId, {withCredentials: true})
      .then (res => {
        successCallback ();
      });
  };
  return (
    <Button variant="warning" onClick={deleteProduct}>
      Delete
    </Button>
  );
};
export default DeleteProduct;
