import React from 'react';
import '../styles/blank.css';
import { machineHead } from '../consts/consts';

export default function MachineBlank({ data }) {
    const list = machineHead.map((item) => item);
    list.shift();
    const dataKeys = Object.keys(data);
    dataKeys.shift();

    function tdFunc(item) {         
        if(typeof(item)=='object') return <td>{item.name}</td>
        return <td>{item}</td>
    }

    return (
        <div className='blank'>
            <h1 className='title'>Машина, Заводской №: {data.serial_number}</h1>
            <table className='table-results res'>
                {list.map((item, ind) => <tr><td>{item}</td>{tdFunc(data[dataKeys[ind]])}<td className='desc'>{data[dataKeys[ind]].description}</td></tr>)}
           
            </table>
        </div>
    )
}