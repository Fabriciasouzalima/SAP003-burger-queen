import React from 'react';
import ClientOrders from '../../components/AllOrders/allOrders.js'

import "./styles.css"


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders);
  
  
  return (
    <div>
      {existingOrders.map(existingOrders => (
        <section className="container">
          <div className="card">
            <p>{existingOrders.dateHour}</p>
            Cliente:{existingOrders.client}
            Mesa: {existingOrders.table}
            <ul>
              Pedidos:
              {existingOrders.pedidos.map(
                products => products.quantity + products.product.name
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
    </div>
  );

}

export default Kitchen;