import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/index.js'; 

import firebase from '../../utils/firebaseUtils';
import './styles.css';

const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [pedidos, setPedidos] = useState('');
    const [total, setTotal] = useState('');

    function onSubmit(e) {
        e.preventDefault()
        
        firebase
            .firestore()
            .collection('infoClient')
            .add({
                client,
                table,
                pedidos,
                total,
            })
            .then(()=>{
               setTable('')
               setClient('')
               setPedidos('')
               setTotal('')
                
            }) 
    }
  
  return (
    <div>
      <label>
        <strong>NOME DO CLIENTE</strong>
      </label>
      <input id='input-name'type="text" value={client} onChange={e => setClient(e.currentTarget.value)}/>
      <label>
        <strong>NÚMERO DA MESA</strong>
      </label>
      <input id='input-number'type="number" value={table} onChange={e => setTable(e.currentTarget.value)}/>
      <button id='btn-food' onClick={onSubmit}><strong>Enviar Pedidos</strong></button>
    </div>
   
  );
};

function MenuCoffee(){

  const [itens, setItens] = useState([])

useEffect(() => {
  const unsubscribe = firebase
    .firestore()
    .collection('foodsBreakfast')
    .onSnapshot((snapshot) => {
      const products = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setItens(products)
    })
    return () => unsubscribe()
}, [])
 return itens
}



function Order() {

  const itens = MenuCoffee()
  return (
    <div className="App">
      <Header/>
      <AddClientInfo/>
      <h1>Café</h1>
      <ol>
        {itens.map((itens) => 
          <div key={itens.id}>
            <div className='itens-entry'> 
              {itens.name}
              <code className='itens'>{itens.price}reais</code>
            </div>
          </div>
        )}
      </ol>
      <h1>Hambúrguer</h1>
      <p></p>
      <h1>Acompanhamentos</h1>
      <p></p>
      <h1>Bebidas</h1>
      <p></p>
      <h1>Extras</h1>
      <p></p>     
    </div>
  );
}

export default Order
