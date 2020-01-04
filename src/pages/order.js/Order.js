import React, { useState, useEffect } from "react";
import AddClientInfo from "../../components/AddCliente/addclient.js";
import Button from "../../components/Button/button.js";
import AllMenu from "../../components/AllMenu/allMenu.js";
import "./styles.css";

function Order() {
  const existingProducts = AllMenu();
  const [orderProducts, setOrderProducts] = useState([]);
  const [total, setTotal] = useState("");
  //const [options, setOptions] = useState("")

  const addProduct = product => {
    const itemIndex = orderProducts.findIndex(
      i => i.product.name === product.name
    );
    console.log(itemIndex);

    if (itemIndex === -1) {
      const orderItem = { quantity: 1, product: product };
      setOrderProducts(current => [...current, orderItem]);
    } else {
      const selectedProduct = orderProducts[itemIndex];
      selectedProduct.quantity = selectedProduct.quantity + 1;
      setOrderProducts([...orderProducts]);
    }
  };

  const delProduct = product => {
    const deletedProduct = orderProducts.map(elem => {
      if (elem.product.name === product.product.name) {
        if (elem.quantity !== 0) {
          elem.quantity -= 1;
          return elem;
        } else {
          return elem;
        }
      }
      return elem;
    });

    let delProduct = deletedProduct.filter(elem => elem.quantity !== 0);

    return setOrderProducts(delProduct);
  };

  useEffect(() => {
    const orderTotal = orderProducts.reduce(
      (total, orderProduct) =>
        total + orderProduct.quantity * orderProduct.product.price,
      0
    );
    setTotal(orderTotal);
  }, [orderProducts]);

  function addOptions() {
    existingProducts.map(product => {
      if (product.burger && product.options.length !== 0) {
        console.log(product.options);
      }
    });
  }

  return (
    <div className="App">
      <AddClientInfo
        pedidos={orderProducts}
        setOrderProducts={setOrderProducts}
        total={total}
        setTotal={setTotal}
      />
      <section className="Page">
        <div className="print-order">
          {orderProducts.map(orderProduct => (
            <>
              <p>
                nome: {orderProduct.product.name} quantidade:{" "}
                {orderProduct.quantity} preço: {orderProduct.product.price},00
                total: {orderProduct.quantity * orderProduct.product.price}
              </p>
              <Button
                key={Math.random()}
                handleClick={() => delProduct(orderProduct)}
                class="btn-del"
                title={`🗑`}
              />
            </>
          ))}

          <p className="total-order">
            Valor Total do Pedido: <strong>{total} ,00 reais</strong>
          </p>
        </div>

        <div className="products-list">
          <h1>Menu</h1>
          <h1>Café da Manhã</h1>
          {existingProducts.map((product, i) => {
            return product.breakfast ? (
              <>
                <Button
                  key={i}
                  handleClick={() => addProduct(product)}
                  class="itens"
                  title={`${product.name} R$ ${product.price},00`}
                />
              </>
            ) : (
              false
            );
          })}

          <h1>Almoço/Jantar</h1>
          {existingProducts.map((product, i) => {
            return product.lunch || product.burger ? (
              <>
                <Button
                  key={i}
                  handleClick={() => addProduct(product)}
                  class="itens"
                  title={`${product.name} R$ ${product.price},00`}
                />
              </>
            ) : (
              false
            );
          })}
        </div>
      </section>
    </div>
  );
}

export default Order;
