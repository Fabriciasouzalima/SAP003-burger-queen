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
                console.log(setClient(''),setTable(''));
                 
                
            })
        
        
    }
  
  return (
    <div>
      <label>
        <strong>NOME DO CLIENTE</strong>
      </label>
      <input type="text" value={client} onChange={e => setClient(e.currentTarget.value)}/>
      <label>
        <strong>NÚMERO DA MESA</strong>
      </label>
      <input type="number" value={table} onChange={e => setTable(e.currentTarget.value)}/>
      <button onSubmit={onSubmit}><strong>CAFÉ</strong></button>
      <button onSubmit={onSubmit}><strong>ALMOÇO/JANTAR</strong></button>
    </div>
   
  );
};
        


export default AddClientInfo 