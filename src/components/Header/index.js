import React from 'react';
import './styles.css';
import Logo from './logo_burger_queen.png';

const Header = () => (
  <header className="main-header">
    <img width={"50px"} src={Logo} alt="Logo Burger Queen" />
    BURGER QUEEN
  </header>
);

export default Header; 
