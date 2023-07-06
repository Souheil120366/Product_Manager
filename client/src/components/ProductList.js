import React from 'react';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
// import '../App.css';
import {Link} from 'react-router-dom';
import DeleteProduct from './DeleteProduct';

const ProductList = props => {
  const {productList, setProductList} = props;
  const token = localStorage.getItem ('userInfo');

  const removeFromDom = productId => {
    setProductList (productList.filter (product => product._id !== productId));
  };

  return (
    <Container>
      <Row>
        <h1>All Products</h1>
        <Table>
          <thead>
            <tr>
              <th>Title</th>
              {token ? <th>Edit</th> : null}
              {token ? <th>Delete</th> : null}
            </tr>
          </thead>
          <tbody>
            {productList.map ((product, index) => {
              return (
                <tr key={index}>
                  <td>
                    <Link to={`/home/${product._id}`}>
                      {' '}{product.title}{' '}
                    </Link>
                  </td>
                  {token
                    ? <td>
                        <Link to={'/home/edit/' + product._id}>
                          Edit
                        </Link>
                      </td>
                    : null}
                  {token
                    ? <td>
                        <DeleteProduct
                          productId={product._id}
                          successCallback={() => removeFromDom (product._id)}
                        />
                      </td>
                    : null}
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Row>
    </Container>
  );
};
export default ProductList;
