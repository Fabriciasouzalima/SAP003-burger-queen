import React, {useState, useEffect} from 'react';
import Header from '../../components/Header/index.js';
import AddClientInfo from '../../components/AddCliente/addclient.js'
import Button from '../../components/Button/button.js';

import firebase from '../../utils/firebaseUtils';

import './styles.css';



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
      setOrderProducts([...orderProducts]);
    }
  };

  const delProduct = (product) => {
    const itemIndex = orderProducts.findIndex(i => i.product.name === product.name);
    console.log(itemIndex);

    if (itemIndex === -1) {
      const orderItem = { quantity: 1, product: product }
      setOrderProducts(current => [...current, orderItem]);
    } else {
      const selectedProduct = orderProducts[itemIndex]
      selectedProduct.quantity = selectedProduct.quantity-1
      console.log(orderProducts);
      setOrderProducts([...orderProducts]);
    }
  };

  return (
    <div className="App">
      <Header />
      <AddClientInfo
      pedidos={orderProducts}
      setOrderProducts={setOrderProducts} 
      />

      <div className="print-order">
        {orderProducts.map(orderProduct => (
          <p>
            nome: {orderProduct.product.name} quantidade:{" "}
            {orderProduct.quantity} preco: {orderProduct.product.price}
            total: {orderProduct.quantity * orderProduct.product.price}
          </p>
        ))}
      </div>
      <p>
        Valor Total do Pedido:{" "}
        <strong>
          {orderProducts.reduce(
            (total, orderProduct) =>
              total + orderProduct.quantity * orderProduct.product.price,
            0
          )}{" "}
          reais
        </strong>
      </p>
      <h1>Menu</h1>
      <div>
        <h1>Café da Manha</h1>
        {existingProducts.map((product, i) => {
          return product.breakfast ? (
            <>
            <Button
              key={i}
              handleClick={() => addProduct(product)}
              class="itens"
              title={`${product.name} ${product.price} reais`}
            />
            <Button
              key={i}
              handleClick={() => delProduct(product)}
              class="itens"
              title={`delete`}
            />
            </>
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

