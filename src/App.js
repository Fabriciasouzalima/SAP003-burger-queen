import React from 'react';
import firebase from './utils/firebaseUtils';
import './styles.css';


firebase.firestore().collection("foodsBreakfast").add({
  itens: [
    {
      name: "Café americano",
      price: 5
    },
    {
      name: "Café com leite",
      price: 7
    },
    {
      name: "Misto Quente",
      price: 10
    },
    {
      name: "Suco natural de fruta",
      price: 7
    }
  ]
});

firebase.firestore().collection('burgers').add({
itens: [
  {
    name: "Hambúrguer simples bovino",
    price: 10,
  },
  {
    name: "Hambúrguer duplo bovino",
    price: 15
  },
  {
    name: "Hambúrguer simples frango",
    price: 10,
  },
  {
    name: "Hambúrguer duplo frango",
    price: 15
  },{
    name: "Hambúrguer simples vegetariano",
    price: 10,
  },
  {
    name: "Hambúrguer duplo vegetariano",
    price: 10
  },
]

});

firebase.firestore().collection('sideDishes').add({
  itens: [
    {
      name: "Batatas fritas",
      price: 5
    },
    {
      name: "Anéis de cebola",
      price: 5
    }
  ]
});

firebase.firestore().collection('drinks').add({
  itens: [
    {
      name: "Água 500ml",
      price: 5
    },
    {
      name: "Água 750ml",
      price: 7
    },
    {
      name: "Refrigerante 500ml",
      price: 7
    },
    {
      name: "Refrigerante 750ml",
      price: 10
    }
  ]
});

firebase.firestore().collection('extras').add({
  itens: [
    {
      name: "Queijo",
      price: 1
    },
    {
      name: "Ovo",
      price: 1
    }
  ]
});
  

function App() {
  return (
    <div className="App">
      <h1>Aqui vai rolar o APP</h1>
    </div>
  );
}

export default App;
