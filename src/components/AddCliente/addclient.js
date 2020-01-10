import React, {useState} from 'react';
import Input from '../../components/Input/input.js'
import Button from '../../components/Button/button.js';
import firebase from '../../utils/firebaseUtils';

const AddClientInfo = (props) => {
    const [client, setClient] = useState('');
    const [table, setTable] = useState('');


    function onSubmit(e) {
        e.preventDefault()
       
        firebase
            .firestore()
            .collection('Orders')
            .add({
                client,
                table,
                pedidos:props.pedidos,
                total:props.total,
                dateHour: new Date().toLocaleString("pt-BR"),
                hourSend: new Date(),
                hourS: new Date().getHours(),
                minS: new Date().getMinutes(),
                secS: new Date().getSeconds(),
                status: "Esperando"
            })
            .then(()=>{
               setTable('')
               setClient('')
               props.setOrderProducts([])
               props.setTotal('')
                
            }) 
    }
  
  return (
    <div className='top-page'>
      <label className='text'>
        <strong>NOME DO CLIENTE</strong>
      </label>
      <Input
        class="input-name"
        type="text"
        value={client}
        onChange={e => setClient(e.currentTarget.value)}
      />
      <label className='text'>
        <strong>NÚMERO DA MESA</strong>
      </label>
      <Input
        class="input-number"
        type="number"
        value={table}
        onChange={e => setTable(e.currentTarget.value)}
      />
      <Button className="itens" handleClick={onSubmit} title="Enviar Pedidos" />
    </div>
  );
};


export default AddClientInfo