import React, {useState} from 'react';
import axios from 'axios';
const ProductForm = (props) => {
  //keep track of what is being typed via useState hook
  const {product, setProduct} = props;
  const [title, setTitle] = useState ('');
  const [price, setPrice] = useState (null);
  const [description, setDescription] = useState ('');
  //handler when the form is submitted
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
    //make a post request to create a new product
    axios
      .post ('http://localhost:8000/api/product', {
        title,
        price,
        description,
      })
      .then (res => {
        console.log (res);
        console.log (res.data);
        setProduct([...product, res.data]);
      })
      .catch (err => console.log (err));

      setTitle("");
      setPrice("");
      setDescription("");
  };

  return (
    <div>
         <header>
            Product Manager
          </header>
      <form onSubmit={onSubmitHandler}>

        <div className="form-fields">
          <label>Title</label><br />
          <input type="text" value={title} onChange={e => setTitle (e.target.value)} />
        </div>
        <br />
        <div className="form-fields">
          <label>Price</label><br />
          <input type="number" value={price} onChange={e => setPrice (e.target.value)} />
        </div>
        <br />
        <div className="form-fields">
          <label>Description</label><br />
          <input type="text" value={description} onChange={e => setDescription (e.target.value)} />
        </div>
        <br />
        <input className="submit-input" type="submit" value="Create"/>
      </form>
    </div>
  );
};
export default ProductForm;
