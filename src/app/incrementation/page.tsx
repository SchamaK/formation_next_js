import React, { useState } from "react";
import { useRouter } from 'next/navigation';
import { useContext } from "react";
import {userContext} from "../../contexts/userContext"
import {User} from "../../types/user.interfaces"
// import {TodoList} from './todoList'

export default function Incrementatotion() {
  const userCurrent : User = useContext(userContext)
  const router = useRouter();
    const [ count , setCount]= useState(0)
    function increment(){
      setCount(count + 1)
    }
    function decrement(){
      setCount(count - 1)
    }
    function reset(){
      setCount(0)
    }
  
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <p> {count}</p>
        <p> {userCurrent.name} </p>
        <p> {userCurrent.prenom} </p>
        <p> {userCurrent.email} </p>
  
       <div style={{ marginTop: '2rem', display: 'flex', gap: '2rem' }}>
       <button onClick={increment}>Increment</button>
        <button onClick={reset}>Reset</button>
        <button onClick={decrement}>Decrement</button>
       </div>


       <div className="mt-6">  
       <button onClick={() => router.push('/todo')}>Todo List</button>
       </div>

      </div>
    )
}