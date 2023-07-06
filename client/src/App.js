import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
// import './App.css';
import {Container} from 'react-bootstrap';
import Product from './views/Product';
import User from './views/User';
import Detail from './components/Detail';
import Update from './components/Update';


function App () {
  
  return (
    <Container>
    
      <BrowserRouter>
        <Routes>
          <Route element={<User />} path="/" default />
          <Route element={<Product />} path="/home" />
          <Route element={<Detail />} path="/home/:id" />
          <Route element={<Update/>} path="/home/edit/:id"/>
        </Routes>
      </BrowserRouter>
      </Container>
    
  );
}
export default App;
