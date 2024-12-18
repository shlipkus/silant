import React, { useEffect } from 'react';
import '../styles/main.css'
import BaseMain from '../components/base-main';
import AuthMain from '../components/auth-main';
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios';


export default function SMain() {
    const dispatch = useDispatch();
    
    useEffect(() => {
        getUser();        
    }, [])

    function getUser() {
        const token = window.localStorage.getItem('token');
        if(token){
                axios.get('http://localhost:8000/',{
                    headers: {
                    Authorization: 'Token ' + token 
                    }
                })
                .then(function (response) {            
                    if(response.status==200){
                        dispatch({type: 'ADDAUTHDATA', payload: response.data});
                    }
                })
                .catch(function (error) {
                    console.log(error);
                });
            }
    }

    const auth = useSelector((state)=> state.auth);
    return (
        <>        
        {auth.isAuth ? <AuthMain /> : <BaseMain />}
        </>
    )
}