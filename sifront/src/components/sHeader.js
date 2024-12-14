import React from 'react';
import '../styles/header.css';
import logo from '../images/logo.svg?url';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

export default function SHeader() {
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const dispatch = useDispatch();

    function handleAuth(){
        navigate('/login')
    }

    function handleOut(){
        window.localStorage.removeItem('token');
        dispatch({type: 'LOGOUT'});
        dispatch({type: 'REMOVEBASEDATA'});
        navigate('/');
    }

    return <header className='header'>
        <div className='top-line'>
            <img src={logo} />
            <h3 className='contacts'>+7-8352-20-12-09, @telegram</h3>
            <div className='auth'>
                {!auth.isAuth ? <h3 className='link' onClick={handleAuth}>Авторизация</h3>:
                <h3 className='link' onClick={handleOut}>Выход</h3>}
            </div>
        </div>
        <h2 className='text-line'>Электронная сервисная книжка "Мой Силант"</h2>
    </header>
}