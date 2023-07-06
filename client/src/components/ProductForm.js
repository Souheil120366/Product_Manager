import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Button from 'react-bootstrap/Button';

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
  const navigate = useNavigate ();

  const onSubmitHandler = e => {
    //prevent default behavior of the submit
    e.preventDefault ();
    onSubmitProp ({title, price, description});
  };

  return (
    <Container >
      <Row>
      {actionType == 'create'
        ? <h2>Create Product</h2>
        : <h2>Update Product</h2>}
        
        <Form onSubmit={onSubmitHandler}>
          <Form.Group className="mb-3">

            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={e => {
                setTitle (e.target.value);
                setErrors ([]);
              }}
            />

          </Form.Group>
          {errors.title ? <span>{errors.title.message}</span> : null}

          <Form.Group className="mb-3">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              value={price}
              onChange={e => {
                setPrice (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.price ? <span>{errors.price.message}</span> : null}

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={e => {
                setDescription (e.target.value);
                setErrors ([]);
              }}
            />
          </Form.Group>
          {errors.description
            ? <span>{errors.description.message}</span>
            : null}

          {actionType == 'create'
            ? <Button type="submit">Create</Button>
            : <Button type="submit">Update</Button>}

        </Form>
      </Row>
    </Container>
  );
};
export default ProductForm;
