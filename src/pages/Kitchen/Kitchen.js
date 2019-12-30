import React from 'react';
//import Header from "../../components/Header/index.js";
import ClientOrders from '../../components/AllOrders/allOrders.js'


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders)
  
  return (
    // <Header/>
    <h1>to na cozinha</h1>
  )

}

export default Kitchen;