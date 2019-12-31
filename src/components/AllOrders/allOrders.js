import React, {useState, useEffect} from 'react';
import firebase from '../../utils/firebaseUtils.js'

function ClientOrders() {
  
  const [existingOrders, setExistingOrders] = useState([]);
  
  useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection("infoClient")
      .onSnapshot(snapshot => {
        const dbOrders = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setExistingOrders(dbOrders);
      });
    return () => unsubscribe();
  }, []);

  return existingOrders
  
}
  
export default ClientOrders; 