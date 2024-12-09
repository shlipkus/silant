import React from 'react';
import '../styles/header.css';
import logo from '../images/logo.svg?url';

export default function SHeader() {
    return <header className='header'>
        <div className='top-line'>
            <img src={logo} />
            <h3 className='contacts'>+7-8352-20-12-09, @telegram</h3>
            <div className='auth'>
                <h3 className='link'>Авторизация</h3>
            </div>
        </div>
        <h2 className='text-line'>Электронная сервисная книжка "Мой Силант"</h2>
    </header>
}