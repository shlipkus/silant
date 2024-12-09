import React, { useState } from 'react';
import axios from 'axios';
import '../styles/login.css';

export default function Login() {
    const [ loginData, setLogin ] = useState({
        username: '',
        password: ''
    })

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/token/',
            {
                username: loginData.username,
                password: loginData.password
            }
        ).then(function (response) {
            console.log(response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (       
        <div className='login'>
            <form className='form' onSubmit={handleSubmit}>
                <label className='input'>Логин:<input onChange={(e) => setLogin({...loginData, username: e.target.value})}/></label>
                <label className='input'>Пароль:<input onChange={(e) => setLogin({...loginData, password: e.target.value})}/></label>
                <input className='input' type='submit' value='Вход' />
            </form>
        </div>
    )
}