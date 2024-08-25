import React from 'react'
import { useContext } from 'react';
import { AuthContext } from './../../Contexts/AuthContext';
import Login from './../Login/Login';

export default function ProtectedRoute({children}) {
 const {usertoken}= useContext(AuthContext)
  return (
    <>
    {usertoken ? children: <Login/>}
    </>
  )
}
