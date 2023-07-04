import React, { useEffect, useState } from 'react'
import axios from 'axios';
import '../App.css';
import {useParams, useNavigate} from "react-router-dom";
// const url="";
const url ='http://localhost:8001';
const Detail = (props) => {
    const [product, setProduct] = useState({})
    const navigate=useNavigate();
    const {id} = useParams(); 
    useEffect(() => {
        axios.get(url+`/api/product/${id}`)
            .then( res => {
                console.log(res.data);
                setProduct(res.data);
            })
            .catch( err => console.log(err) );
    }, []);
    return (
        <div className="App">
            <button onClick={() => {navigate('/home')}}>Home</button>
            <p>Title: {product.title}</p>
            <p>Price: {product.price}</p>
            <p>Description: {product.description}</p>
        </div>
    );
}
export default Detail;