import React, { useEffect, useState } from 'react';
import { useParams } from "react-router";
import { useNavigate } from 'react-router-dom';
import '../styles/main.css'
import { useSelector, useDispatch } from 'react-redux';
import axios from 'axios'
import MachineBlank from '../components/machine-blank';


export default function Machine () {
    const { num } = useParams();
    const [ data, setData ] = useState({}) 
    const navigate = useNavigate();
    const tableHead = [
        'Вид ТО', 'Дата проведения ТО', 'Наработка, м/ч',
        '№ заказ-наряда', 'Дата заказ-наряда', 'Организация проводившая ТО',
    ]     


    useEffect(() => {
        getData(num)
    }, [])

    function getData(query) {
        const token = window.localStorage.getItem('token');
        axios.get(`http://localhost:8000/machines?serial_number=${query}`,
            {
            headers: {
              Authorization: 'Token ' + token 
            }
           })
          .then(function (response) {            
            if(response.status==200){
                setData(response.data[0])                
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


    return (
        <main className='main'>
            {Object.keys(data).length!=0 ? <MachineBlank data={data}/>: <h1 className='title'>Данные не найдены</h1>}
            <div className='search-result'>
                        <h2 className='title-result'>Информация о проведенных ТО Вашей техники:</h2>
                        <div className='tab'>
                            <button type='button' className='tablinks' id='main'  onClick={(e) => navigate('/')}>Общая информация</button>
                            <button type='button' className='tablinks' id='btn2' disabled={true}>ТО</button>
                            <button type='button' className='tablinks' id='rec'  onClick={(e) => navigate(`/machine/reclame/${num}`)}>Рекламации</button>
                        </div>                                             
            </div>
        </main>
    )
}