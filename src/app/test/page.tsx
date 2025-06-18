"use client"
import React from 'react'
import useRestClients from '@/hooks/useRestClients'
import { useRef, useState } from "react";
export default function Client(){
    const count = useRef(0);
    const [refresh, setRefresh] = useState(0);
    const increment = () => {
    count.current++;
    console.log("Valeur actuelle :", count.current);
  };

    const {datas, loading, error} = useRestClients('https://jsonplaceholder.typicode.com/users')
    return(
        <div>
            <h1>Client</h1>

            {loading && <p>Loading...</p>}
            {error && <p>{error.message}</p>}
            {datas && datas.map((user: any) => (<p key={user.id}>
                {user.name}
                {user.email}
                {user.phone}
            </p>))}

            <p style={{color: 'red' , marginTop: '2rem' , marginLeft: '2rem'}}>UseRef</p>
      <button onClick={increment}>Incrémenter</button>
      <button onClick={() => setRefresh(refresh + 1)}>Forcer Refresh</button>
      <p>Valeur : {count.current}</p>

        </div>
    )
}