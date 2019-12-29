import React from 'react';
import {BrowserRouter, Link } from "react-router-dom";
import './styles.css';

import Logo from './logo_burger_queen.png';


const Header = () => (
  <header className="main-header">
    <img width={"50px"} src={Logo} alt="Logo Burger Queen" />
    BURGER QUEEN
    <BrowserRouter>
      <Link to="/kitchen" className="links">
        Cozinha
      </Link>
      <Link to="/Order" className="links">
        Salão
      </Link>
    </BrowserRouter>
  </header>
);

export default Header; 
