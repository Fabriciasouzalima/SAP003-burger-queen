import React from 'react';
import ClientOrders from '../../components/AllOrders/allOrders.js'

import "./styles.css"


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders);
  
  
  return (
    <section className="cardBox">
      {existingOrders.map(existingOrders => (
        <section className="container">
          <div className="card">
            <p>{existingOrders.dateHour}</p>
            Cliente:{existingOrders.client}
            Mesa: {existingOrders.table}
            <ul>
              Pedidos:
              {existingOrders.pedidos.map(
                products => <div>{products.quantity} {products.product.name}</div>
              )}
              <p>Total: R$ {existingOrders.total},00</p>
              <button className="btn-status">
                Pedido:
                {existingOrders.status}
              </button>
            </ul>
          </div>
        </section>
      ))}
    </section>
  );

}

export default Kitchen;