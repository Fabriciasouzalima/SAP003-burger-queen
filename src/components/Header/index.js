import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

import Logo from './logo_burger_queen.png';



const Header = () => (
  <header className="main-header">
    <img width={"50px"} src={Logo} alt="Logo Burger Queen" />
    BURGER QUEEN
    <Link className="links">
      <Link to="/order" className="links">
        Salão
      </Link>
      <Link to="/kitchen" className="links">
        Cozinha
      </Link>
      <Link to="/Delivery" className="links">
       Delivery
      </Link>
    </Link>
  </header>
);

export default Header; 
