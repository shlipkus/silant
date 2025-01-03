import React, { useState, useEffect } from 'react';
import '../styles/blank.css';
import { reclameHead } from '../consts/consts';
import { useParams } from "react-router";
import axios from 'axios';
import { Link } from 'react-router-dom';
import { ip } from '../consts/consts';

export default function Reclamation () {
	const { id } = useParams();
	const [data, setData] = useState({});
	const list = reclameHead.map((item) => item);
    list.shift();
    const dataKeys = Object.keys(data);
    dataKeys.shift();
    dataKeys.shift();

    useEffect(() => {
        getData(id)
    }, [])

    function getData(query) {
        const token = window.localStorage.getItem('token');
        console.log('get')
        axios.get(`${ip}/reclamations/${query}`,
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
        if(typeof(item)=='object') return <td id={item.id}>{item.name}</td>
        return <td id={item.id}>{item}</td>
    }

    return (
        <div className='main'>
        <Link className='link-to' to='/'>На главную</Link>
        <h1 className='title'>Рекламация</h1>
            {Object.keys(data).length!=0 && <><h1 className='title'>Машина, Заводской №: {data.machine}</h1>
                        <table className='table-results res'>
                        <tbody>
                            {list.map((item, ind) => <tr><td>{item}</td>{tdFunc(data[dataKeys[ind]])}<td className='desc'>{data[dataKeys[ind]].description}</td></tr>)}
                        </tbody>
                        </table></>}
        </div>
    )
}