import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/index.js';
import Button from '../../components/Button/button.js';
//import input from '../../components/Input/input.js'

import firebase from '../../utils/firebaseUtils';
import './styles.css';


const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [pedidos, setPedidos] = useState([]);
    const [total, setTotal] = useState('');
    const [date, setDate] = useState('');
    const [hour,setHour] = useState('')

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
                date,
                hour,
            })
            .then(()=>{
               setTable('')
               setClient('')
               setPedidos('')
               setTotal('')
               setDate('')
               setHour('')
                
            }) 
    }
  
  return (
    <div>
      <label>
        <strong>NOME DO CLIENTE</strong>
      </label>
      <input
        className="input-name"
        type="text"
        value={client}
        onChange={e => setClient(e.currentTarget.value)}
      />
      <label>
        <strong>NÚMERO DA MESA</strong>
      </label>
      <input
        className="input-number"
        type="number"
        value={table}
        onChange={e => setTable(e.currentTarget.value)}
      />
      <Button class="itens" handleClick={onSubmit} title="Enviar Pedidos" />
    </div>
  );
};

function AllMenu(){

  const [existingProducts, setExistingProducts] = useState([])

useEffect(() => {
  const unsubscribe = firebase
    .firestore()
    .collection('menu')
    .onSnapshot((snapshot) => {
      const dbExistingProducts = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data()
      }))
      setExistingProducts(dbExistingProducts)
    })
    return () => unsubscribe()
}, [])
 return existingProducts
}



function Order() {
  

  const existingProducts = AllMenu()
  const [orderProducts, setOrderProducts] = useState([])

  const addProduct = (product) => {
    const itemIndex = orderProducts.findIndex(i => i.product.name === product.name);
    console.log(itemIndex);

    if (itemIndex === -1) {
      const orderItem = { quantity: 1, product: product }
      setOrderProducts(current => [...current, orderItem]);
    } else {
      const selectedProduct = orderProducts[itemIndex]
      selectedProduct.quantity = selectedProduct.quantity+1
      console.log(orderProducts);
      setOrderProducts([...orderProducts]);
    }
  };


  return (
    <div className="App">
      <Header />
      <AddClientInfo />
      <div className="print-order">
        {orderProducts.map(orderProduct => (
          <p>
            nome: {orderProduct.product.name} quantidade:{" "}
            {orderProduct.quantity} preco: {orderProduct.product.price} total:{" "}
            {orderProduct.quantity * orderProduct.product.price}
          </p>
        ))}
      </div>
      <h1>Menu</h1>
      <div>
        <h1>Café da Manha</h1>
        {existingProducts.map((product, i) => {
          return product.breakfast ? (
            <Button
              key={i}
              handleClick={() => addProduct(product)}
              class="itens"
              title={`${product.name} ${product.price} reais`}
            />
          ) : (
            false
          );
        })}
      </div>
      <div>
        <h1>Almoço</h1>
        {existingProducts.map((product, i) => {
          return product.lunch ? (
            <Button
              key={i}
              handleClick={() => addProduct(product)}
              class="itens"
              title={`${product.name} ${product.price} reais`}
            />
          ) : (
            false
          );
        })}
      </div>
    </div>
  );
}

export default Order 