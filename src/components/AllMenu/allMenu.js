import React, {useState,useEffect} from 'react'
import firebase from '../../utils/firebaseUtils.js'

function AllMenu() {
  const [existingProducts, setExistingProducts] = useState([]);

  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("menu")
      .onSnapshot(snapshot => {
        const dbExistingProducts = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExistingProducts(dbExistingProducts);
      });
    return () => unsubscribe();
  }, []);
  return existingProducts;
}

export default AllMenu 