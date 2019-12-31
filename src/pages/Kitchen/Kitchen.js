import React from 'react';

import ClientOrders from '../../components/AllOrders/allOrders.js'


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders)

  
  return (
    <div>
      <h1>Ordens em Andamento</h1>
      {existingOrders.map( existingOrders => (
        <ul>
          <li>
            Cliente: {existingOrders.client}
            Mesa: {existingOrders.table}
            Total: R$ {existingOrders.total},00
            {/* pedidos: {existingOrders.pedidos.map()} */}
            

          </li>
        </ul>
      ))}
    </div>
  );

}

export default Kitchen;