import React, { useState } from "react";
import Input from "../../components/Input/input.js";
import Button from "../../components/Button/button.js";
import Logo from './background.png';
import firebase from "../../utils/firebaseUtils.js";

import "./styles.css";

import { Link, useHistory } from 'react-router-dom';

function Login() {

  let history = useHistory();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  

  const infoLog = () => {
    return login.length > 0 && password.length > 0;
  };

  async function sign(e) {
    e.preventDefault();
    try {
      const auth = await firebase.signIn(login, password);

      firebase
        .firestore()
        .collection("users")
        .doc(auth.user.uid)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.data().kitchen) {
            history.push('/kitchen');
          } else {
            history.push('/order');
          }
        });
    
    } catch (error) {
      alert(error.message);
    }
  }

  return (
    <main>
      <section className="box">
        <img width="50%" src={Logo} alt="Logo Burguer Queen" />
        <form className="logBox">
          <h1>Burger Queen</h1>
          <Input
            class="inputLog"
            placeholder="insira seu login"
            value={login}
            type="text"
            onChange={e => setLogin(e.target.value)}
          />
          <Input
            class="inputLog"
            placeholder="insira sua senha"
            value={password}
            type="text"
            onChange={e => setPassword(e.target.value)}
          />
          <Button
            className="btnLog"
            title="Acessar"
            handleClick={sign}
            disabled={!infoLog()}
            // id={props.id}
          />
        </form>
      </section>
    </main>
  );
}

export default Login;
