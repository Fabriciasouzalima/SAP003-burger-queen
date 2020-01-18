import React, { useState, useEffect } from "react";
import AddClientInfo from "../../utils/AddCliente/addclient.js";
import Button from "../../components/Button/button.js";
import AllMenu from "../../utils/AllMenu/allMenu.js";
import "./styles.css";
import Header from "../../components/Header/index.js";

function Order() {
  const existingProducts = AllMenu();
  const [orderProducts, setOrderProducts] = useState([]);
  const [total, setTotal] = useState("");
  const [options, setOptions] = useState("");
  const [extra, setExtra] = useState([])


  const addProduct = product => {

    const itemIndex = orderProducts.findIndex(
      i =>
        i.product.name === product.name &&
        product.selectedOptions === i.product.selectedOptions &&
        product.selectedExtra === i.product.selectedExtra 
    );
  
    if (itemIndex === -1) {
      const orderItem = { quantity: 1, product: product };
      setOrderProducts(current => [...current, orderItem]);
    } else {
      const selectedProduct = orderProducts[itemIndex];
      selectedProduct.quantity = selectedProduct.quantity + 1;
      setOrderProducts([...orderProducts]);
    }

    setOptions("");
    setExtra("")

  };

  const delProduct = product => {
    
    const deletedProduct = orderProducts.map(elem => {
      if (
        elem.product.name === product.product.name &&
        elem.product.selectedOptions === product.product.selectedOptions &&
        elem.product.selectedExtra === product.product.selectedExtra
      ) {
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

  const extraCheckbox = e => {
    e.persist();
    if (!extra.includes(e.target.value)){
      setExtra([...extra, e.target.value])
    } else {
      setExtra(extra.filter(ex => ex !== e.target.value))
    } 
  };

  const radioOnChange = e => {
    e.persist();
    setOptions(e.target.value);
  };

  const renderProductsBreakfast = () => {
    return existingProducts.map((product, i) => {
      return product.breakfast ? (
        <>
          <Button
            key={i}
            handleClick={() => addProduct(product)}
            className="itens"
          >{`${product.name} R$ ${product.price},00`}</Button>
        </>
      ) : (
        false
      );
    })
  }
  
     
  const renderProducts = () => {
    return existingProducts.map((product, i) => {
      if (product.lunch) {
  
        return (
          <Button
            key={i}
            handleClick={() => addProduct(product)}
            className="itens"
            title={`${product.name} R$ ${product.price},00`}
          />
        );
      } else if (product.burger) {

        const newPrice = product.price + extra.length
    
        return (
          <>
            <form class="boxItens">
              <Button
                key={i}
                handleClick={() =>
                  addProduct({
                    ...product,
                    selectedOptions: options,
                    selectedExtra: extra,
                    price: newPrice
                  })
                }
                className="itens"
                title={`${product.name} R$ ${product.price},00`}
                disabled={options === ""}
              />
              <div>
                <p>Opções</p>
                {product.options.map(option => {
                  return (
                    <>
                      <label>{option}</label>
                      <input
                        type="radio"
                        value={option}
                        onChange={radioOnChange}
                        checked={option === options}
                      />
                    </>
                  );
                })}
                <p>Extras</p>
                <>
                 {product.extra.map(extraSel=> {
                  return (
                   <>
                   <label>{extraSel}</label>
                   <input
                    type="checkbox"
                    value={extraSel}
                    onChange={extraCheckbox}
                    checked={extra.includes(extraSel)}
                   />
                  </>
                  )})}
                  
                </>
              </div>
            </form>
          </>
        );
      }
      return null;
    });
  };
 
  return (
    <div className="App">
      <Header/>
      <AddClientInfo
        pedidos={orderProducts}
        setOrderProducts={setOrderProducts}
        total={total}
        setTotal={setTotal}
      />
      <section className="Page">
        <div className="print-order">
          {orderProducts.map(orderProduct => (
            <div className="boxOrder">
              <section>
                <p>nome: {orderProduct.product.name}{" "}</p>
                <p>{orderProduct.product.selectedOptions}</p>
                <p> extra{" "}{orderProduct.product.selectedExtra}</p>
                <p>quantidade:{" "}{orderProduct.quantity}</p>
                <p>preço (unidade):{" "}{orderProduct.product.price},00</p> 
                <p></p>
                total:{" "}{orderProduct.quantity * orderProduct.product.price},00
              </section>
              <Button
                key={Math.random()}
                handleClick={() => delProduct(orderProduct)}
                className="btn-del"
              >{"🗑"}</Button>
            </div>
          ))}

          <p className="total-order">
            Valor Total do Pedido: <strong>{total} ,00 reais</strong>
          </p>
        </div>

        <div className="products-list">
          <h1>Menu</h1>
          <h1>Café da Manhã</h1>
          {renderProductsBreakfast()}
          <h1>Almoço/Jantar</h1>
          {renderProducts()}
        </div>
      </section>
    </div>
  );

}

export default Order;
