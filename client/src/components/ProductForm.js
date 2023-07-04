import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
// import axios from 'axios';

const ProductForm = props => {
  //keep track of what is being typed via useState hook
  const {
    errors,
    setErrors,
    actionType,
    onSubmitProp,
    initialTitle,
    initialPrice,
    initialDescription,
  } = props;
  const [title, setTitle] = useState (initialTitle);
  const [price, setPrice] = useState (initialPrice);
  const [description, setDescription] = useState (initialDescription);
  //handler when the form is submitted
  const navigate=useNavigate();
  
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
    onSubmitProp ({title, price, description});
  };

  return (
    <div>
      
      <header>
        Product Manager
      </header>
      <form onSubmit={onSubmitHandler}>
        {/* {errors.map((err, index) => <p key={index}>{err}</p>)} */}

        <div className="form-fields">

          <label>Title</label><br />
          <input
            type="text"
            value={title}
            onChange={e => {
              setTitle (e.target.value);
              setErrors ([]);
            }}
          />

        </div>
        {errors.title ? <span>{errors.title.message}</span> : null}
        <br />
        <div className="form-fields">
          <label>Price</label><br />
          <input
            type="number"
            value={price}
            onChange={e => {
              setPrice (e.target.value);
              setErrors ([]);
            }}
          />
        </div>
        {errors.price ? <span>{errors.price.message}</span> : null}
        <br />
        <div className="form-fields">
          <label>Description</label><br />
          <input
            type="text"
            value={description}
            onChange={e => {
              setDescription (e.target.value);
              setErrors ([]);
            }}
          />
        </div>
        {errors.description ? <span>{errors.description.message}</span> : null}
        <br />
        {actionType == 'create'
          ? <input className="submit-input" type="submit" value="Create" />
          : <input className="submit-input" type="submit" value="Update" />}

      </form>
    </div>
  );
};
export default ProductForm;
