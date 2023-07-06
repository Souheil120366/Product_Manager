import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate, useParams} from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import DeleteProduct from '../components/DeleteProduct';

const Update = props => {
  const {id} = useParams (); //this process is identical to the one we used with our Details.js component
  const [product, setProduct] = useState ({}); //this process is identical to the one we
  const [errors, setErrors] = useState ([]);
  const [loaded, setLoaded] = useState (false);
  const navigate = useNavigate ();
  // retrieve the current values for this person so we can fill
  // in the form with what is in the db currently
  const url = '';
  
  useEffect (() => {
    axios
      .get (url + `/api/product/${id}`)
      .then (res => {
        setProduct (res.data);
        setLoaded (true);
      })
      .catch (err => console.log (err));
  }, []);
  const updateProduct = productParam => {
    console.log ('param', productParam);
    axios
      .put (url + `/api/product/${id}`, productParam, {withCredentials: true})
      .then (res => {
        console.log (res);
        navigate ('/home');
      })
      .catch (err => {
        if (err.response.status === 401) navigate ('/');
        else {
          setErrors (err.response.data.errors);
        }
      });
  };
  return (
    <Container className="mt-5">
      <Row>
        <Col>

          {loaded &&
            <ProductForm
              errors={errors}
              setErrors={setErrors}
              actionType={'update'}
              onSubmitProp={updateProduct}
              initialTitle={product.title}
              initialPrice={product.price}
              initialDescription={product.description}
            />}
        </Col>

      </Row>
    </Container>
  );
};
export default Update;
