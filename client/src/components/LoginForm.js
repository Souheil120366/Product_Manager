import React, {useState} from 'react';
import axios from 'axios';
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
    <div>
      <header>
        User Login
      </header>
      <p>{errors ? errors : ''}</p>
      <form onSubmit={onSubmitHandler}>

        <br />
        <div className="form-fields">
          <label>Email</label><br />
          <input
            type="text"
            value={email}
            onChange={e => {
              setEmail (e.target.value);
              setErrors ([]);
            }}
          />
        </div>

        <br />
        <div className="form-fields">
          <label>Password</label><br />
          <input
            type="password"
            value={password}
            onChange={e => {
              setPassword (e.target.value);
              setErrors ([]);
            }}
          />
        </div>

        <br />
        <input className="submit-input" type="submit" value="Sign In" />
      </form>
    </div>
  );
};
export default LoginForm;
