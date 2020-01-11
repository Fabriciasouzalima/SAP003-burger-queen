import React from "react";
import ClientOrders from "../../components/AllOrders/allOrders.js";
import Button from "../../components/Button/button.js";
import firebase from "../../utils/firebaseUtils";

import "./styles.css";

function Delivery() {
  const existingOrders = ClientOrders();

  const send = existingOrders => {
    firebase
      .firestore()
      .collection("Orders")
      .doc(existingOrders.id)
      .update({
        status: "Entregue",
        hourFinish: new Date(),
        hourF: new Date().getHours(),
        minF: new Date().getMinutes(),
        secF: new Date().getSeconds()
      });
  };

  const time = existingOrders => {
    console.log(existingOrders);

    let seconds;
    let rest;

    if (existingOrders.hourSend !== existingOrders.hourDone) {
      seconds =
        existingOrders.hourD * 3600 +
        existingOrders.minD * 60 +
        existingOrders.secD -
        (existingOrders.hourS * 3600 +
          existingOrders.minS * 60 +
          existingOrders.secS);
    } else {
      seconds =
        existingOrders.hourD * 3600 +
        existingOrders.minD * 60 +
        existingOrders.secD +
        86400 -
        (existingOrders.hourS * 3600 +
          existingOrders.minS * 60 +
          existingOrders.secS);
    }

    let horas = Math.floor(seconds / (60 * 60));
    rest = seconds % (60 * 60);

    let minutos = Math.floor(rest / 60);
    rest %= 60;

    let hora = [horas + " h:", minutos + " m "];
    return hora;
  };
  return (
    <section className="cardBox">
      {existingOrders.map(existingOrders =>
        existingOrders.status === "Pronto" ? (
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
                <div>O pedido ficou pronto em: {time(existingOrders)}</div>
                <Button
                  handleClick={() => send(existingOrders)}
                  className="btn-status2"
                  title="Pronto"
                />
              </ul>
            </div>
          </section>
        ) : null
      )}
    </section>
  );
}

export default Delivery;
