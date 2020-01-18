import React from "react";
import ClientOrders from "../../utils/AllOrders/allOrders.js";
import Button from "../../components/Button/button.js";
import Header from "../../components/Header/index.js";
import firebase from "../../utils/firebaseUtils";


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

    const hora = [horas + " horas e ", minutos + " minutos "]

    return hora ;
  };

  return (
    <div>
      <>
        <Header />
      </>

      <section className="cardBox">
        {existingOrders.map(existingOrders =>
          existingOrders.status === "Pronto" ? (
            <section className="container">
              <div className="card">
                <p>{existingOrders.dateHour}</p>
                <div>
                  <p>Cliente: {existingOrders.client}</p>
                  <p>Mesa: {existingOrders.table}</p>
                </div>
                <ul>
                  Pedidos:
                  {existingOrders.pedidos.map(products => (
                    <>
                      <p>{products.quantity} x {products.product.name}{" "}</p>
                      {products.product.selectedOptions}
                      {products.product.selectedExtra ? (
                        <p>Extras : {products.product.selectedExtra}</p>
                      ) : (
                        false
                      )}
                    </>
                  ))}
                  <p>Total: R$ {existingOrders.total},00</p>
                  <p>O pedido ficou pronto em: {time(existingOrders)}</p>
                  <Button
                    handleClick={() => send(existingOrders)}
                    className="btn-status2"
                  >{"Pronto"}</Button>
                </ul>
              </div>
            </section>
          ) : null
        )}
      </section>
    </div>
  );
}

export default Delivery;
