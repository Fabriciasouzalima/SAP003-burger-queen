import React, {useState} from 'react'


function CounterProduct(){
    const [counter, setCounter] = useState(0)

    return (
        <>
            <p>{counter}</p>
            <button onClick={() => setCounter(counter+1)}>Contador</button>
        </>

    )
}

export default CounterProduct