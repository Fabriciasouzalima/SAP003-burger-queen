import React from 'react';
import ClientOrders from '../../components/AllOrders/allOrders.js'
import Button from "../../components/Button/button.js";
import firebase from '../../utils/firebaseUtils';

import "./styles.css"


function Kitchen() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders);
  
  const confirm = (item) => {
    
    firebase
    .firestore().collection('Orders').doc(item.id).update({
      status: 'Em preparo',
      hourDone: new Date(),
      hourD: new Date().getHours(),
      minD: new Date().getMinutes(),
      secD: new Date().getSeconds(),
    })
    .then(() => {
      console.log('guardei info');
    })
  }
  
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
              <>
                <Button
                  handleClick={() => confirm()}
                  class="btn-status"
                  title={`${existingOrders.status}`}
                />
              </>
            </ul>
          </div>
        </section>
      ))}
    </section>
  );

}

export default Kitchen;