"use client";
import React from "react";
import Incrementatotion from '../app/incrementation/page'
import {userContext} from '../contexts/userContext'
// import { TodoList } from './views/todoList'
// import UserManagementApp from "./views/user";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';


export default function Home() {
  const user = {
    name:'kouassi',
    prenom : 'Elischama',
    email : 'schama@gmail.com'
  }
  return (
    <div
      style={{
        padding: "2rem",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      
      <userContext.Provider value={user} >
       <Incrementatotion />
        </userContext.Provider >
    </div>
  );
}
