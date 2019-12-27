import React from 'react';
import Header from "../../components/Header/index.js";
import ClientOrders from '../../components/AllOrders/allOrders.js'


function KitchenOrders() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders)
  
  return (
    <Header/>
  )

}

export default KitchenOrders;