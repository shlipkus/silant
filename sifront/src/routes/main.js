import React from 'react';
import '../styles/main.css'
import BaseMain from '../components/base-main';
import AuthMain from '../components/auth-main';
import { useSelector } from 'react-redux';



export default function SMain() {    

    const auth = useSelector((state)=> state.auth);
    return (
        <>        
        {auth.isAuth ? <AuthMain /> : <BaseMain />}
        </>
    )
}