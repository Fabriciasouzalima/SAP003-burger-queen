import React, {useState} from 'react';
import firebase from '../../utils/firebaseUtils'
import './styles.css';


const AddClientInfo = () => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('')

    function onSubmit(e) {
        e.preventDefault()
        
        firebase
            .firestore()
            .collection('infoClient')
            .add({
                client,
                table,
            })
            .then(()=>{
               setTable('')
               setClient('')
                 
                
            })
        
        
    }
  
  return (
    <div>
      <label>
        <strong>NOME DO CLIENTE</strong>
      </label>
      <input id='input-name'type="text" value={client} onChange={e => setClient(e.currentTarget.value)}/>
      <label>
        <strong>NÚMERO DA MESA</strong>
      </label>
      <input id='input-number'type="number" value={table} onChange={e => setTable(e.currentTarget.value)}/>
      <button id='btn-food' onClick={onSubmit}><strong>CAFÉ</strong></button>
      <button id='btn-food' onClick={onSubmit}><strong>ALMOÇO/JANTAR</strong></button>
    </div>
   
  );
};
        


export default AddClientInfo 