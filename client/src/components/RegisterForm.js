import React, {useState} from 'react';

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
  const [password, setPassword] = useState ("");
  const [confirmPassword, setConfPassword] = useState ("");
  //handler when the form is submitted
  console.log('errors',errors);
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
  
    onSubmitProp ({firstName, lastName, email, password,confirmPassword});
  };

  return (
    <div>
      <header>
        User Register
      </header>
      <form onSubmit={onSubmitHandler}>
        {/* {errors.map((err, index) => <p key={index}>{err}</p>)} */}

        <div className="form-fields">

          <label>First Name</label><br />
          <input
            type="text"
            value={firstName}
            onChange={e => {
              setFirstName (e.target.value);
              setErrors ([]);
            }}
          />

        </div>
        {errors.firstName ? <span>{errors.firstName.message}</span> : null}
        <br />
        <div className="form-fields">

          <label>Last Name</label><br />
          <input
            type="text"
            value={lastName}
            onChange={e => {
              setLastName (e.target.value);
              setErrors ([]);
            }}
          />

        </div>
        {errors.lastName ? <span>{errors.lastName.message}</span> : null}
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
        {errors.email ? <span>{errors.email.message}</span> : null}
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
        {errors.password ? <span>{errors.password.message}</span> : null}
        <br />
        <div className="form-fields">
          <label>Confirm Password</label><br />
          <input
            type="password"
            value={confirmPassword}
            onChange={e => {
              setConfPassword (e.target.value);
              setErrors ([]);
            }}
          />
        </div>
        {errors.confirmPassword ? <span>{errors.confirmPassword.message}</span> : null}
        <br />
        {actionType == 'create'
          ? <input className="submit-input" type="submit" value="Sign Up" />
          : <input className="submit-input" type="submit" value="Update" />}

      </form>
    </div>
  );
};
export default RegisterForm;
