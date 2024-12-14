import React, { useState, useEffect } from 'react';
import '../styles/authres.css';
import Machines from './machines';
import TechService from './techserv';
import Reclamations from './reclamations';


export default function AuthResults() {

    const [ check, setCheck ] = useState(
        {
            btn1: true,
            btn2: false,
            btn3: false
        }
    )


    function tabHandle(e) {
        const id = e.target.id;
        const obj = {
            btn1: id=='btn1',
            btn2: id=='btn2',
            btn3: id=='btn3'
        }
        setCheck(obj)       
    }

    return (
        <div className='search-result'>
            <h2 className='title-result'>Информация о комплектации и технических характеристиках Вашей техники:</h2>
            <div className='tab'>
                <button type='button' className='tablinks' id='btn1' disabled={check.btn1} onClick={tabHandle}>Общая информация</button>
                <button type='button' className='tablinks' id='btn2' disabled={check.btn2} onClick={tabHandle}>ТО</button>
                <button type='button' className='tablinks' id='btn3' disabled={check.btn3} onClick={tabHandle}>Рекламации</button>
            </div>
            {check.btn1 && <div className='tab-content'  id="content-1" >
                    <Machines />
                </div>}
            {check.btn2 && <div className='tab-content'  id="content-2"><TechService /></div>}
            {check.btn3 && <div className='tab-content'  id="content-3"><Reclamations /></div>}
        </div>
    )
}