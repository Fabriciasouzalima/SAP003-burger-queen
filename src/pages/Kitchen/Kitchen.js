import React from 'react';
import ClientOrders from '../../components/AllOrders/allOrders.js'

import "./styles.css"


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders);
  
  
  return (
    <div>
      {existingOrders.map(existingOrders => (
        <>
          <div className="container">
            {existingOrders.dateHour}
    
            Cliente:{existingOrders.client} 
            Mesa: {existingOrders.table}

            
            Pedidos:
            {existingOrders.pedidos.map(
              products => ( products.quantity + products.product.name) 
              )}   
            Total: R$ {existingOrders.total},00 
            
            
             Status Pedido:{existingOrders.status}
            
          </div>
        </>   
      ))}
    </div>
  );

}

export default Kitchen;