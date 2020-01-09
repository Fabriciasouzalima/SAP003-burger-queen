import React from "react";
import ClientOrders from "../../components/AllOrders/allOrders.js";
import Button from "../../components/Button/button.js";
import firebase from "../../utils/firebaseUtils";

import "./styles.css";

function Kitchen() {
  const existingOrders = ClientOrders();

  const confirm = existingOrders => {
    console.log(existingOrders.id);

    firebase
      .firestore()
      .collection("Orders")
      .doc(existingOrders.id)
      .update({
        status: "Em preparo",
        hourDone: new Date(),
        hourD: new Date().getHours(),
        minD: new Date().getMinutes(),
        secD: new Date().getSeconds()
      })
      .then(() => {
        console.log("guardei info");
      });
  };

  const done = existingOrders => {
    console.log(existingOrders.id);

    firebase
      .firestore()
      .collection("Orders")
      .doc(existingOrders.id)
      .update({
        status: "Pronto",
        hourDone: new Date(),
        hourD: new Date().getHours(),
        minD: new Date().getMinutes(),
        secD: new Date().getSeconds()
      })
      .then(() => {
        console.log("guardei info");
      });
  };

  return (
    <section className="cardBox">
      {existingOrders.map(existingOrders => (
        <section className="container">
          <div className="card">
            <p>{existingOrders.dateHour}</p>
            <div>
              Cliente:{existingOrders.client}
              <div>Mesa: {existingOrders.table}</div>
            </div>
            <ul>
              Pedidos:
              {existingOrders.pedidos.map(products => (
                <>
                  <div>
                    {products.quantity} x {products.product.name}{" "}
                    {products.product.selectedOptions}
                  </div>
                  <p>extras : {products.product.selectedExtra}</p>
                  <p>Total: R$ {existingOrders.total},00</p>
                </>
              ))}
              <Button
                handleClick={() => confirm(existingOrders)}
                class="btn-status"
                title={`${existingOrders.status}`}
              />
            </ul>
          </div>
        </section>
      ))}
    </section>
  );
}

export default Kitchen;
