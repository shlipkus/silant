import React, { useState, useEffect } from 'react';
import '../styles/blank.css';
import { serviceHead } from '../consts/consts';
import { useParams } from "react-router";
import axios from 'axios';
import { Link } from 'react-router-dom';

export default function TService () {
	const { id } = useParams();
	const [data, setData] = useState({});
	const list = serviceHead.map((item) => item);
    list.shift();
    const dataKeys = Object.keys(data);
    dataKeys.shift();
    dataKeys.shift();

    useEffect(() => {
        getData(id)
    }, [])

    function getData(query) {
        const token = window.localStorage.getItem('token');
        axios.get(`http://localhost:8000/service/${query}`,
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

    function tdFunc(item) {         
        if(typeof(item)=='object') return <td>{item.name}</td>
        return <td>{item}</td>
    }

    return (
        <div className='main'>
        <Link className='link-to' to='/'>На главную</Link>
        <h1 className='title'>Техническое обслуживание</h1>
            {Object.keys(data).length!=0 && <><h1 className='title'>Машина, Заводской №: {data.machine.serial_number}</h1>
                        <table className='table-results res'>
                        <tbody>
                            {list.map((item, ind) => <tr><td>{item}</td>{tdFunc(data[dataKeys[ind]])}<td className='desc'>{data[dataKeys[ind]].description}</td></tr>)}
                        </tbody>
                        </table></>}
        </div>
    )
}