import React from 'react';
import '../styles/main.css'
import AuthResults from './authresults';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { groupName } from '../consts/consts';


export default function AuthMain() {
    const authData = useSelector((state)=>state.auth);
    
    return (
        <main className='main'>
            {authData.user != undefined ? <h1 className='title'>{groupName[authData.user.group]}: {authData.user.name}</h1>: null}
            {['manager'].includes(authData.user.group) && <Link className='link-to' to={'/handbooks'}>Справочники</Link>}
            {authData ? <AuthResults />: null}           
        </main>
    )
}