import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate} from 'react-router-dom';
import ProductForm from '../components/ProductForm';
import ProductList from '../components/ProductList';

const url = '';


const Product = props => {
  const [productList, setProductList] = useState ([]);
  const [errors, setErrors] = useState ([]);
  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const navigate = useNavigate ();

  useEffect (() => {
    axios
      .get (url + '/api/product', {withCredentials: true})
      .then (res => {
        setProductList (res.data);
      })
      .catch (err => console.log (err));

    const token = localStorage.getItem ('userInfo');
    if (token) {
      const parsedValue = JSON.parse (token);
      setFirstName (parsedValue.firstName);
      setLastName (parsedValue.lastName);
      console.log ('token', parsedValue.firstName);
    }
  }, []);

  const logout = e => {
    e.preventDefault ();
    axios
      .post (url + '/api/users/logout', {}, {withCredentials: true})
      .then (res => {
        console.log (res.data);
        localStorage.removeItem ('userInfo');
        navigate ('/');
      })
      .catch (err => {
        console.log (err);
      });
  };

  const createProduct = productParam => {
    axios
      .post (url + '/api/product', productParam, {withCredentials: true})
      .then (res => {
        setProductList ([...productList, res.data]);
      })
      // .catch((err)=>console.log(err))
      .catch (err => {
        console.log ('this is the error', err.response.status);
        if (err.response.status === 401) navigate ('/');
        else {
          setErrors (err.response.data.errors);
        }
      });
  };

  return (
    <Container className="mt-4">
      <Row>

        <Col>
          <p>{firstName} {lastName}</p>
        </Col>
        <Col>
          <Button onClick={e => logout (e)}>Logout</Button>
        </Col>

      </Row>
      <Row>
        <Col>

          {firstName
            ? <ProductForm
                errors={errors}
                setErrors={setErrors}
                actionType={'create'}
                onSubmitProp={createProduct}
                initialTitle=""
                initialPrice=""
                initialDescription=""
              />
            : null}
        </Col>
        <Col>
          <ProductList
            productList={productList}
            setProductList={setProductList}
          />
        </Col>

      </Row>
    </Container>
  );
};
export default Product;
