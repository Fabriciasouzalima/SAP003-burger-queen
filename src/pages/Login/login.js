import React, { useState } from "react";
import Input from "../../components/Input/input.js";
import Button from "../../components/Button/button.js";
import Logo from './logo_burger_queen.png';
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
        <form>
          <Input
            class="inputLog"
            placeholder="insira seu login"
            // value={props.value}
            // type={props.type}
            onChange={e => setLogin(e.target.value)}
          />
          <Input
            class="inputLog"
            placeholder="insira sua senha"
            // value={props.value}
            // type={props.type}
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
