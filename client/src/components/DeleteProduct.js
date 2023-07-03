import React from 'react'
import axios from 'axios';
// const url="";
const url ="http://localhost:8001";
const DeleteProduct = (props) => {
    const { productId, successCallback } = props;
    const deleteProduct = e => {
        axios.delete(url+'/api/product/' + productId,{withCredentials:true,})
            .then(res=>{
                successCallback();
            })
    }
    return (
        <button onClick={deleteProduct}>
            Delete
        </button>
    )
}
export default DeleteProduct;