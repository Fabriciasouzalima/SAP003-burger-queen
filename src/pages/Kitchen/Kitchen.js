import React from "react";
import ClientOrders from "../../utils/AllOrders/allOrders.js";
import Button from "../../components/Button/button.js";
import Header from "../../components/Header/index.js";
import firebase from "../../utils/firebaseUtils";

import "./styles.css";

function Kitchen() {
  const existingOrders = ClientOrders();

  const confirm = existingOrders => {
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
      });
  };

  const done = existingOrders => {
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
      });
  };

  return (
    <div>
      <>
        <Header />
      </>
      <section className="cardBox">
        {existingOrders.map(existingOrders =>
          existingOrders.status === "Esperando" ||
          existingOrders.status === "Em preparo" ? (
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
                    className="btn-status"
                  >
                    {" "}
                    {`${existingOrders.status}`}
                  </Button>
                  <Button
                    handleClick={() => done(existingOrders)}
                    className="btn-status2"
                  >
                    {"Pronto"}{" "}
                  </Button>
                </ul>
              </div>
            </section>
          ) : null
        )}
      </section>
    </div>
  );
}

export default Kitchen;
