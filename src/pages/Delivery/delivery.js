import React, { useState, useEffect } from 'react';
import ClientOrders from '../../components/AllOrders/allOrders.js'
import firebase from '../../utils/firebaseUtils.js';



function Delivery() {
  const existingOrders = ClientOrders() 
  console.log(existingOrders);
  
  const [delivery, setDelivery] = useState([]);

  useEffect(() => {
    firebase
      .firestore().collection('Orders')
      .orderBy('hourDone', 'asc')
      .onSnapshot((snap) => {
        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data()
        }))
        setDelivery(list)
      })
  }, [])

  const done = existingOrders => {
    firebase
      .firestore()
      .collection("Orders")
      .doc(existingOrders.id)
      .update({
        status: "Pronto",
        hourConclud: new Date(),
        hourC: new Date().getHours(),
        minC: new Date().getMinutes(),
        secC: new Date().getSeconds()
      })
      .then(() => {
        console.log("finish");
      });
  };

  const time = (item) => {
    let seconds = (((item.hourD*3600)+(item.minD*60)+(item.secD)) - ((item.hourS*3600)+(item.minS*60)+(item.minS)))
    
    let horas = Math.floor(seconds/(60*60));
    let resto = seconds % (60*60);
    let minutos = Math.floor(seconds/60);
    resto %= 60;
    let segundos = Math.ceil(resto);

    let hora = [horas +' h, ', minutos + ' m e ', segundos +' s.']
    return hora;
    }


  return (
    <div>
      <h2>Pronto para a Entrega</h2>

        {delivery.map((item, index) =>
        <div key={index}>
          {item.status === 'toDeliver' ?
            <div>
              <h3>{item.client} - {item.table}</h3>
                {item.resumo.map((itens, index) =>
                  <div key={index}>
                    {itens.type === 'burger' ?
                      <p>{itens.name}{' /' + itens.meetSelect}{' com adicional: ' + itens.addExtra} - Qtd:{itens.count} </p>
                    :
                      <p>{itens.name} - Qtd:{itens.count} </p>}                       
                  </div> 
                )}
              <button onClick={() => done(item)}>entregue!</button> 
              <div>O pedido ficou pronto em: {time(item)}</div>
              {console.log(time(item))}
            </div>
          : null }

        </div>
        )}
          

    </div>
  );
}

export default Delivery