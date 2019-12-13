import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/index.js'; 
import CounterProduct from '../../components/addClient/addClient.js'

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
      <button id='btn-send' onClick={onSubmit}><strong>Enviar Pedidos</strong></button>
    </div>
   
  );
};

function MenuCoffee(){

  const [itens, setItens] = useState([])

useEffect(() => {
  const unsubscribe = firebase
    .firestore()
    .collection('menu')
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
      <h1>Menu</h1>
      <div>
        <h1>Café da Manha</h1>
        {itens.map((itens) => 
             { return (itens.breakfast)? <p className='itens'>{itens.name} {itens.price}reais</p> : false}
        )}
        
      </div>
      <div>
        <h1>Almoço</h1>
        {itens.map((itens) => 
             { return (itens.lunch)? <p className='itens'>{itens.name} {itens.price}reais</p> : false}
        )}
        
      </div>
      <CounterProduct/>      
    
    </div>
  );
}

export default Order
