import React, {useState} from 'react';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

const RegisterForm = props => {
  //keep track of what is being typed via useState hook
  const {
    errors,
    setErrors,
    actionType,
    onSubmitProp,
    initialFirstName,
    initialLastName,
    initialEmail,
  } = props;
  const [firstName, setFirstName] = useState (initialFirstName);
  const [lastName, setLastName] = useState (initialLastName);
  const [email, setEmail] = useState (initialEmail);
  const [password, setPassword] = useState ('');
  const [confirmPassword, setConfPassword] = useState ('');
  //handler when the form is submitted
  console.log ('errors', errors);
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();

    onSubmitProp ({firstName, lastName, email, password, confirmPassword});
  };

  return (
    <Container>
      <Row>
        <h1>User Register</h1>
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              value={firstName}
              onChange={e => {
                setFirstName (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.firstName ? <span>{errors.firstName.message}</span> : null}
          <Form.Group className="mb-3">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              value={lastName}
              onChange={e => {
                setLastName (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.lastName ? <span>{errors.lastName.message}</span> : null}
          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="text"
              value={email}
              onChange={e => {
                setEmail (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.email ? <span>{errors.email.message}</span> : null}
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={e => {
                setPassword (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.password ? <span>{errors.password.message}</span> : null}
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control
              type="password"
              value={confirmPassword}
              onChange={e => {
                setConfPassword (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.confirmPassword
            ? <span>{errors.confirmPassword.message}</span>
            : null}
          <div className="mb-3">
            {actionType == 'create'
              ? <Button type="submit">Sign Up</Button>
              : <Button type="submit">Update</Button>}
          </div>
        </Form>
      </Row>
    </Container>
  );
};
export default RegisterForm;
