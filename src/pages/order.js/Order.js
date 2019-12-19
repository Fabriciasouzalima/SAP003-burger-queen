import React, {useState} from 'react';
import Header from '../../components/Header/index.js';
import AddClientInfo from '../../components/AddCliente/addclient.js'
import Button from '../../components/Button/button.js';
import AllMenu from '../../components/AllMenu/allMenu.js'

import './styles.css';


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
    const deletedProduct = orderProducts.map(elem => {
      

      if(elem.product.name === product.product.name ){
        if(elem.quantity !== 0){
          elem.quantity -= 1
          return elem
        } else{
          return elem
        }
        
      } else {
        return elem
      }
    })

    console.log(deletedProduct)
    
    setOrderProducts(deletedProduct)

    
  };
 

  return (
    <div className="App">
      <Header />
      <AddClientInfo
        pedidos={orderProducts}
        setOrderProducts={setOrderProducts}
        // total={}
        // setTotal={}
      />

      <div className="print-order">
        {orderProducts.map(orderProduct => (
          <>
            <p>
              nome: {orderProduct.product.name} quantidade:{" "}
              {orderProduct.quantity} preco: {orderProduct.product.price}
              total: {orderProduct.quantity * orderProduct.product.price}
            </p>
            <Button
              key={Math.random()}
              handleClick={() => delProduct(orderProduct)}
              class="itens"
              title={`delete`}
            />
          </>
        ))}

        <p className="total-order">
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
      </div>

      <div className='products-list'>
      <h1>Menu</h1>
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
            </>
          ) : (
            false
          );
        })}

        <h1>Almoço</h1>
        {existingProducts.map((product, i) => {
          return product.lunch ? (
            <>
              <Button
                key={i}
                handleClick={() => addProduct(product)}
                class="itens"
                title={`${product.name} ${product.price} reais`}
              />
            </>
          ) : (
            false
          );
        })}
      </div>
    </div>
  );
}

export default Order 

