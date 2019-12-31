import React from 'react';

import ClientOrders from '../../components/AllOrders/allOrders.js'


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders)
  
  return (
    <div>
    <h1>Será que vai da certo?</h1>
    {existingOrders.map(()=>{})}
    </div>
  )

}

export default Kitchen;