"use client"
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';


export default function TodoList() {
  const router = useRouter();
    const [todos, setTodos] = useState<string[]>([])
    const [inputValue, setInputValue] = useState("")

    useEffect(() => {
        console.log("je suum monté")
    },[todos])

    function addTodo() {
        if (inputValue.trim()) {
            setTodos([...todos, inputValue])
            setInputValue('') // Déplacé à l'intérieur de la condition
        }
    }

    function deleteTodo(index: number) {
        setTodos(todos.filter((e, todoIndex) => todoIndex !== index));
    }

    return (
        <>
            <input 
                type="text" 
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && addTodo()}
                placeholder="Ajouter une nouvelle tâche..."
            />
            
            {/* <button onClick={addTodo}>Ajouter</button> */}

            <ul>
                {todos.map((value, index) => (
                    <li key={index}>
                        {value}
                        <button onClick={() => deleteTodo(index)}>
                            Supprimer
                        </button>
                    </li>
                ))}
            </ul>

            {!todos.length && (
                <div className="mt-6 text-center text-gray-600">
                    Il n'y a absolument pas de todos
                </div>
            )}


            <div className="mt-6">  
                <button onClick={() => router.push('/')}>page arriere</button>
                <button onClick={() => router.push('/user')} >page suivante</button>
                <button onClick={() => router.push('/test')} >Aller a la liste des clients</button>
            </div>

        </>
    )
}