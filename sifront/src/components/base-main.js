import React, { useState } from 'react';
import '../styles/main.css';
import axios from 'axios';
import Results from './results';
import { useDispatch, useSelector } from 'react-redux';

export default function BaseMain() {
    const data = useSelector((state) => state.basedata);
    const dispatch = useDispatch();
    const [num, setNum] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/base',
            {
                "num": num
            }).then(function (response){
                if(response.status==200){
                    dispatch({type: 'ADDBASEDATA', payload: response.data})
                }
            }).catch(function (error) {
                console.log(error);
              });
    }

    return (
        <main className='main'>
            <h1 className='title'>Проверьте комплектацию и технические характеристики техники Силант</h1>
            <form className='form' onSubmit={handleSubmit}>
                <label className='label'>Заводской номер:</label>
                <input required className='form-input' placeholder='0000' onChange={(e)=> setNum(e.target.value)}></input>
                <input className='form-submit' type='submit' value='Найти'/>
            </form>            
            {Object.keys(data).length != 0 ? <Results />: null}           
        </main>
    )
}