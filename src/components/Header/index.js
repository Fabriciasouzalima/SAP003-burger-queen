import React from 'react';
import { Link } from "react-router-dom";
import './styles.css';

import Logo from './logo_burger_queen.png';


const Header = () => (
  <header className="main-header">
    <img width={"50px"} src={Logo} alt="Logo Burger Queen" />
    BURGER QUEEN
    <Link to="/kitchen">Cozinha</Link>
    <Link to="/Order">Salão</Link>
  </header>
);

export default Header; 
