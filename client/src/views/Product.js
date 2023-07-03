import React, { useEffect,useState } from 'react';
import axios from 'axios';
// import jwt from 'jsonwebtoken';
// import Cookies from 'js-cookie';
// import { useCookies } from 'react-cookie';
import { useNavigate } from "react-router-dom";
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

// const url="";
const url ='http://localhost:8001';

const Product = (props) => {
    
    const [productList, setProductList] = useState([]);
    const [errors, setErrors] = useState([]);
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const navigate=useNavigate();
    
    
    useEffect(() => {
        axios.get(url+'/api/product',{withCredentials:true})
            .then(res => {
                setProductList(res.data)
            })
            .catch((err)=>console.log(err))

            
        
        const token = localStorage.getItem('userInfo');
        const parsedValue = JSON.parse(token);
        setFirstName(parsedValue.firstName);
        setLastName(parsedValue.lastName);  
        console.log('token',parsedValue.firstName);
        

    }, []);

    const createProduct = productParam => {
        
        axios.post(url+'/api/product', productParam,{withCredentials:true,})
            .then(res => {
                
                
                setProductList([...productList, res.data])
            })
            // .catch((err)=>console.log(err))
            .catch(err=>{
                console.log('this is the error',err.response.status);
                if (err.response.status === 401) navigate('/');
                else {setErrors(err.response.data.errors);}
            }) 
    }
    
    return (
        <div>
           <p>{firstName}</p>
           <ProductForm errors={errors} setErrors={setErrors} actionType={"create"} onSubmitProp={createProduct}  initialTitle="" initialPrice="" initialDescription="" />
            <hr/>
           <ProductList productList={productList} setProductList={setProductList} />
        </div>
    )
}
export default Product;