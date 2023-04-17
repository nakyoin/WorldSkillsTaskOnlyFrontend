import './App.css';
import React, {useEffect, useState} from 'react';
import {Link, Route, Routes} from 'react-router-dom';
import Index from './de-template-1/Index'
import Login from './de-template-1/Login'
import Reg from './de-template-1/Reg'
import Order from './de-template-1/Order'
import Cart from './de-template-1/Cart'




function App() {
  const [isAuth, setIsAuth] = useState(false);
  const [products, setProducts] = useState([]);
  const [token, setToken] = useState('')


  return (
    <><Routes>
      <Route
        path='/'
        element={<Index isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} token={token} products={products} setProducts={setProducts} />} />
      <Route
        path='/login'
        element = {<Login isAuth={isAuth} setToken={setToken} setIsAuth={setIsAuth}></Login>}>
      </Route>
      <Route
        path='/register'
        element = {<Reg isAuth={isAuth} setToken={setToken} token={token} setIsAuth={setIsAuth} ></Reg> }
      />
        {isAuth && (
          <>
            <Route path='/orders'
                   element=
                   {<Order isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} token={token} products={products} ></Order>} ></Route>
            <Route 
              path='/cart'
              element={
                <Cart isAuth={isAuth} setIsAuth={setIsAuth} setToken={setToken} token={token}></Cart>
              } ></Route>
          </>
        )}
      </Routes>
    </>
  );
}

export default App;
