import React, {useState} from 'react';
import axios from 'axios';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Row from 'react-bootstrap/Row';
import {useNavigate} from 'react-router-dom';

const url = '';

const LoginForm = props => {
  //keep track of what is being typed via useState hook
  //   const {errors, setErrors} = props;
  const navigate = useNavigate ();
  const [errors, setErrors] = useState ([]);
  const [email, setEmail] = useState ('');
  const [password, setPassword] = useState ('');

  //handler when the form is submitted

  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
    axios
      .post (
        url + '/api/users/login',
        {email: email, password: password},
        {withCredentials: true}
      )
      .then (res => {
        console.log ('user', res.data);
        localStorage.setItem ('userInfo', JSON.stringify (res.data));
        navigate ('/home');
      })
      .catch (err => {
        console.log (err);
        setErrors (err.response.data.msg);
      });
  };

  return (
    <Container>
      <Row>
        <h1>
          User Login
        </h1>
        <p>{errors ? errors : ''}</p>
        <Form onSubmit={onSubmitHandler}>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label><br />
            <Form.Control
              type="text"
              value={email}
              onChange={e => {
                setEmail (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label><br />
            <Form.Control
              type="password"
              value={password}
              onChange={e => {
                setPassword (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>

          <Button type="submit">Sign In</Button>
        </Form>
      </Row>
    </Container>
  );
};
export default LoginForm;
