import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import MachineBlank from '../components/machine-blank';
import TechService from '../components/techserv';
import Reclamations from '../components/reclamations';
import { Link } from 'react-router-dom';


export default function Machine () {
    const { id } = useParams();
    const [ data, setData ] = useState({}) 
    const [ check, setCheck ] = useState({
        btn2: true,
        btn3: false
    })
    const navigate = useNavigate();
    const tableHead = [
        'Вид ТО', 'Дата проведения ТО', 'Наработка, м/ч',
        '№ заказ-наряда', 'Дата заказ-наряда', 'Организация проводившая ТО',
    ]     


    useEffect(() => {
        getData(id)
    }, [])

    function getData(query) {
        const token = window.localStorage.getItem('token');
        axios.get(`http://localhost:8000/machines/${query}`,
            {
            headers: {
              Authorization: 'Token ' + token 
            }
           })
          .then(function (response) {            
            if(response.status==200){
                setData(response.data)                
            }
          })
          .catch(function (error) {
            console.log(error);
          });
    }

    function tdFunc(key, item) {
        if(key=='machine') return null            
        if(typeof(item)=='object') return <td>{item.name}</td>
        return <td>{item}</td>
    }

    function getWidth(){
        const width = 100/tableHead.length
        return `${width}%`
    }

    function tabHandle(e) {
        const id = e.target.id;
        const obj = {
            btn2: id=='btn2',
            btn3: id=='btn3'
        }
        setCheck(obj)       
    }


    return (
        <main className='main'>
            <Link className='link-to' to='/'>На главную</Link>
            {Object.keys(data).length!=0 ? <MachineBlank data={data}/>: <h1 className='title'>Данные не найдены</h1>}
            <div className='search-result'>
                        <h2 className='title-result'>Информация о проведенных ТО Вашей техники: </h2>
                        <div className='tab'>
                            <button type='button' className='tablinks' id='main'  onClick={(e) => navigate('/')}>Общая информация</button>
                            <button type='button' className='tablinks' id='btn2' disabled={check.btn2} onClick={tabHandle}>ТО</button>
                            <button type='button' className='tablinks' id='btn3'  disabled={check.btn3} onClick={tabHandle}>Рекламации</button>
                        </div>
                        {check.btn2 && Object.keys(data).length!=0 && <div className='tab-content'  id="content-2"><TechService num={ data.serial_number }/></div>}
                        {check.btn3 && <div className='tab-content'  id="content-3"><Reclamations num={ data.serial_number }/></div>}                                             
            </div>
            
        </main>
    )
}