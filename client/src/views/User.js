import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
// import '../App.css';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import RegisterForm from '../components/RegisterForm';
import LoginForm from '../components/LoginForm';
// import UserList from '../components/UserList';

const url = '';

const User = () => {
  const [userList, setUserList] = useState ([]);
  const [errors, setErrors] = useState ([]);
  const navigate = useNavigate ();

  const register = userParam => {
    axios
      .post (url + '/api/users/register', userParam, {withCredentials: true})
      .then (res => {
        setUserList ([...userList, res.data]);
        localStorage.setItem ('userInfo', JSON.stringify (res.data));
        navigate ('/home');
      })
      // .catch((err)=>console.log(err))
      .catch (err => {
        setErrors (err.response.data.errors);
      });
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <RegisterForm
            errors={errors}
            setErrors={setErrors}
            actionType={'create'}
            onSubmitProp={register}
            initialFirstName=""
            initialLastName=""
            initialEmail=""
          />
        </Col>

        <Col>
          <LoginForm errors={errors} setErrors={setErrors} />
          {/* <UserList userList={userList} setUserList={setUserList} /> */}
        </Col>
      </Row>
    </Container>
  );
};
export default User;
