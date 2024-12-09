import React from 'react';
import '../styles/main.css'
import Results from './results';

export default function AuthMain() {
    const data = false;
    return (
        <main className='main'>
            <h1 className='title'>Проверьте комплектацию и технические характеристики техники Силант</h1>
            <form className='form'>
                <label className='label'>Заводской номер:</label>
                <input className='form-input'></input>
                <input className='form-submit' type='submit' value='Найти'/>
            </form>
            {data ? <Results />: null}           
        </main>
    )
}