import React, { useState } from "react";
import Input from "../../components/Input/input.js";
import Button from "../../components/Button/button.js";
import Logo2 from "./logo_burger_queen.png";
import firebase from "../../utils/firebaseUtils.js";
import { useHistory } from "react-router-dom";

import "./styles.css";

function Login() {
  let history = useHistory();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [page, setPage] = useState("");

  const infoLog = () => {
    return email.length > 0 && password.length > 0;
  };

  async function sign(e) {
    e.preventDefault();
    firebase
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then(user => {
        firebase
          .firestore()
          .collection("users")
          .doc(user.user.uid)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.data().kitchen) {
              history.push("/kitchen");
            } else {
              history.push("/order", "/Delivery");
            }
          });
      });
  }

  return (
    <main>
      <header className="header">
        <img width={"50px"} src={Logo2} alt="Logo Burger Queen" />
        BURGER QUEEN
      </header>
      <div className="img">
        <form className="logBox">
          <h1>Burger Queen</h1>
          <Input
            class="inputLog"
            placeholder="insira seu login"
            value={email}
            type="text"
            onChange={e => setEmail(e.target.value)}
          />
          <Input
            class="inputLog"
            placeholder="insira sua senha"
            value={password}
            type="password"
            onChange={e => setPassword(e.target.value)}
          />
          <Button className="btnLog" handleClick={sign} disabled={!infoLog()}>
            {'Acessar'}
          </Button>
        </form>
      </div>
    </main>
  );
}

export default Login;
