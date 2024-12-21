import React, { useEffect } from 'react';
import SHeader from '../components/sHeader';
import { Outlet } from "react-router-dom";
import '../styles/root.css';
import SFooter from '../components/sFooter';
import axios from 'axios';
import { useSelector, useDispatch } from 'react-redux';
import { ip } from '../consts/consts';


export default function Root() {   
    const dispatch = useDispatch();
    const auth = useSelector((state)=> state.auth.isAuth);
    
    useEffect(() => {
        getUser();        
    }, [auth])

    function getUser() {
        const token = window.localStorage.getItem('token');
        if(token){
                axios.get(ip,{
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

    return (
        <>
            <SHeader />
            <Outlet />
            <SFooter />
        </>
    )
}