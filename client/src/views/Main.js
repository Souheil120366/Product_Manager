import React, { useEffect,useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const url="";
// const url ='http://localhost:8001';

const Main = (props) => {
    
    const [productList, setProductList] = useState([]);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        axios.get(url+'/api/product')
            .then(res => {
                setProductList(res.data)
            })
            .catch((err)=>console.log(err))
    }, []);

    const createProduct = productParam => {
        
        axios.post(url+'/api/product', productParam)
            .then(res => {
                
                
                setProductList([...productList, res.data])
            })
            // .catch((err)=>console.log(err))
            .catch(err=>{
                setErrors(err.response.data.errors);
            }) 
    }
    
    return (
        <div>
    	
           <ProductForm errors={errors} setErrors={setErrors} actionType={"create"} onSubmitProp={createProduct}  initialTitle="" initialPrice="" initialDescription="" />
            <hr/>
           <ProductList productList={productList} setProductList={setProductList} />
        </div>
    )
}
export default Main;