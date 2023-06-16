import React, { useEffect,useState } from 'react';
import axios from 'axios';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';
const Main = (props) => {
    
    const [productList, setProductList] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8001/api/product')
            .then(res => {
                setProductList(res.data)
            })
            .catch((err)=>console.log(err))
    }, []);

    const createProduct = productParam => {
        
        axios.post('http://localhost:8001/api/product', productParam)
            .then(res => {
                console.log(res);
                console.log(res.data)
                setProductList([...productList, res.data])
            })
            .catch((err)=>console.log(err))
    }

    return (
        <div>
    	
           <ProductForm actionType={"create"} onSubmitProp={createProduct}  initialTitle="" initialPrice="" initialDescription="" />
            <hr/>
           <ProductList productList={productList} setProductList={setProductList} />
        </div>
    )
}
export default Main;