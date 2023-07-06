import React, {useEffect, useState} from 'react';
import axios from 'axios';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useParams, useNavigate} from 'react-router-dom';
import Nav from 'react-bootstrap/Nav';

const url = '';

const Detail = props => {
  const [product, setProduct] = useState ({});
  const [firstName, setFirstName] = useState ('');
  const [lastName, setLastName] = useState ('');
  const navigate = useNavigate ();
  const {id} = useParams ();

  useEffect (() => {
    axios
      .get (url + `/api/product/${id}`)
      .then (res => {
        console.log (res.data);
        setProduct (res.data);
      })
      .catch (err => console.log (err));
    const token = localStorage.getItem ('userInfo');
    if (token) {
      const parsedValue = JSON.parse (token);
      setFirstName (parsedValue.firstName);
      setLastName (parsedValue.lastName);
    }
  }, []);
  return (
    <Container className="mt-4">
      <Row>
        <Col>
          {firstName ? <p>{firstName} {lastName}</p> : null}
        </Col>
        <Col>
          <Nav className="justify-content-center" activeKey="/home">
            <Nav.Item>
              <Button onClick={() => navigate ('/home')}>Home</Button>
            </Nav.Item>
          </Nav>
        </Col>
      </Row>
      <Row>

        <p>Title: {product.title}</p>
        <p>Price: {product.price}</p>
        <p>Description: {product.description}</p>
      </Row>
    </Container>
  );
};
export default Detail;
