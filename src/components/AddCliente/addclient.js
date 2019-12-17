import React, {useState} from 'react';
import Input from '../../components/Input/input.js'
import Button from '../../components/Button/button.js';
import firebase from '../../utils/firebaseUtils';

const AddClientInfo = (props) => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');
    const [dateHour, setDateHour] = useState('')


    function onSubmit(e) {
        e.preventDefault()


        
        firebase
            .firestore()
            .collection('infoClient')
            .add({
                client,
                table,
                pedidos:props.pedidos,
                total:props.total,
                dateHour,

            })
            .then(()=>{
               setTable('')
               setClient('')
               props.setOrderProducts([])
               props.setTotal('')
               setDateHour('')
                
            }) 
    }
  
  return (
    <div>
      <label>
        <strong>NOME DO CLIENTE</strong>
      </label>
      <Input
        class="input-name"
        type="text"
        value={client}
        onChange={e => setClient(e.currentTarget.value)}
      />
      <label>
        <strong>NÚMERO DA MESA</strong>
      </label>
      <Input
        class="input-number"
        type="number"
        value={table}
        onChange={e => setTable(e.currentTarget.value)}
      />
      <Button class="itens" handleClick={onSubmit} title="Enviar Pedidos" />
    </div>
  );
};

// let date = new Date()
// let hour = date.getHours()

export default AddClientInfo