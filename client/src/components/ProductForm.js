import React, {useState} from 'react';
import axios from 'axios';
const ProductForm = (props) => {
  //keep track of what is being typed via useState hook
  const {actionType,onSubmitProp, initialTitle, initialPrice, initialDescription} = props;
  const [title, setTitle] = useState (initialTitle);
  const [price, setPrice] = useState (initialPrice);
  const [description, setDescription] = useState (initialDescription);
  //handler when the form is submitted
  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
    onSubmitProp({ title, price, description });

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
        {actionType == "create"?
          
          <input className="submit-input" type="submit" value="Create" />
          :<input className="submit-input" type="submit" value="Update" />
         }
        
      </form>
    </div>
  );
};
export default ProductForm;
