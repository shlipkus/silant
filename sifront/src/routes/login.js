import React, { useState, useEffect } from 'react';
import '../styles/login.css';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { ip } from '../consts/consts';

export default function Login() {
    const auth = useSelector((state)=> state.auth.isAuth);
    const navigate = useNavigate()
    

    useEffect(() => {
        if(auth) {
            navigate('/');
        }        
    }, [])

    const [loginData, setLoginData] = useState({
        username: '',
        password: ''
    })
    const dispatch = useDispatch();
    ;

    

    function handleSubmit(e){
        e.preventDefault();
        axios.post(ip + '/token',
            {
                username: loginData.username,
                password: loginData.password
            }
        ).then(function (response) {
            if(response.status==200){  
                window.localStorage.setItem('token', response.data.token);           
                dispatch({type: 'LOGGED'});
                navigate('/');
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    return (
        <main className='main'>
        <div className='login-block'>
            <h1 className='title'>Авторизация</h1>
            <form className='login-form' onSubmit={handleSubmit}>
                <label className='label'>Имя пользователя:</label>
                <input required className='login-input' type='text' onChange={(e)=>setLoginData({...loginData, username: e.target.value})}/>
                <label className='label'>Пароль:</label>
                <input required className='login-input' type='password' onChange={(e)=>setLoginData({...loginData, password: e.target.value})} />
                <input className='form-submit' type='submit' value='Войти' />
                <span className='text'>Для получения данных для входа свяжитесь с администратором</span>
                <Link className='link' to={'/'}>На главную</Link>
            </form>
        </div>
        </main>
    )
}