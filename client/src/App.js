import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import './App.css';
import Main from './views/Main';
import Detail from './components/Detail';
import Update from './components/Update';

function App () {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route element={<Main />} path="/home" default />
          <Route element={<Detail />} path="/:id" />
          <Route element={<Update/>} path="/edit/:id"/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}
export default App;
