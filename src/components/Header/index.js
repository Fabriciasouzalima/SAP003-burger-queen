import React, {useEffect, useState} from "react";
import { Link, useHistory } from "react-router-dom";
import firebase from "../../utils/firebaseUtils.js";
import "./styles.css";

import Logo from "./logo_burger_queen.png";

const Header = () => {
  let history = useHistory();
  const [user, setUser] = useState(false);

  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        firebase
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(querySnapshot => {
            if (querySnapshot.data().kitchen) {
              setUser(true);
            } else {
              setUser(false);
            }
          });
      }
    });
  }, []);

  const logout = () => {
    firebase.auth().signOut().then(history.push("/"));
  };

  return (
    <header className="main-header">
      <img width={"50px"} src={Logo} alt="Logo Burger Queen" />
      BURGER QUEEN
      <Link className="links">
        {!user ? (
          <Link to="/order" className="links">
            Salão
          </Link>
        ) : null}
        {user ? (
          <Link to="/kitchen" className="links">
            Cozinha
          </Link>
        ) : null}

        <Link to="/Delivery" className="links">
          Delivery
        </Link>
        <Link to="/" className="links">
          Sair
        </Link>
      </Link>
    </header>
  );
};

export default Header;
