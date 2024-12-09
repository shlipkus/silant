import React from 'react';
import '../styles/main.css';
import axios from 'axios';
import Results from './results';
import { useDispatch, useSelector } from 'react-redux';

export default function BaseMain() {
    const data = useSelector((state) => state.basedata);
    const dispatch = useDispatch();

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/base',
            {
                "num": "0019"
            }).then(function (response){
                if(response.status==200){
                    console.log(response.data)
                    dispatch({type: 'ADDBASEDATA', payload: response.data})
                }
            })
    }

    return (
        <main className='main'>
            <h1 className='title'>Проверьте комплектацию и технические характеристики техники Силант</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label className='label'>Заводской номер:</label>
                <input className='form-input'></input>
                <input className='form-submit' type='submit' value='Найти'/>
            </form>
            {Object.keys(data).length != 0 ? <Results />: null}           
        </main>
    )
}