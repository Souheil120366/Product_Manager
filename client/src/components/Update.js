import React, { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate, useParams } from "react-router-dom";
import ProductForm from '../components/ProductForm';
import DeleteProduct from '../components/DeleteProduct';

const Update = (props) => {
    const { id } = useParams(); //this process is identical to the one we used with our Details.js component
    const [product, setProduct] = useState({}); //this process is identical to the one we
    const [errors, setErrors] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    // retrieve the current values for this person so we can fill
    // in the form with what is in the db currently
    const url="";
    // const url ='http://localhost:8001';
    useEffect(() => {
        axios.get(url+`/api/product/${id}`)
            .then(res => { 
                setProduct(res.data)
                setLoaded(true);
             })
            .catch(err => console.log(err))
    }, [])
    const updateProduct = productParam => {
        console.log('param',productParam);
        axios.put(url+`/api/product/${id}`,productParam, {withCredentials:true,})
            .then(res => {
                console.log(res);
                navigate("/home"); 
            })
            .catch(err=>{
                setErrors(err.response.data.errors);
            })
    }
    return (
        <div className="update">
            <h1>Update a Product</h1>
            {
            loaded && <ProductForm errors={errors} setErrors={setErrors} actionType={"update"} onSubmitProp={updateProduct} initialTitle={product.title} initialPrice={product.price}
            initialDescription={product.description}
            />
            }
            <DeleteProduct productId={product._id} successCallback={() => navigate("/")} />
        </div>
    )
}
export default Update;