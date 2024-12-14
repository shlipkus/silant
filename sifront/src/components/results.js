import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/results.css'

export default function Results() {
    const data = useSelector((state)=> state.basedata)

    function tdFunc(item) {
        if(typeof(item)=='object') return <td>{item.name}</td>
        return <td>{item}</td>
    }    

    const tableHead = [
        'Зав. № машины', 'Модель техники', 'Модель двигателя', 'Зав. № двигателя',
        'Модель трансмиссии', 'Зав. № трансмиссии', 'Модель ведущего моста',
        'Зав. № ведущего моста', 'Модель управляемого моста', 'Зав. № управляемого моста'
    ]

    function getWidth(){
        const width = 100/tableHead.length
        return `${width}%`
    }
    return (
        <div className='search-result'>
            <h2 className='title-result'>Результат поиска:</h2>
            <table className='table-results'>
                <thead>
                    <tr>
                        {tableHead.map((item)=> <th style={{width: getWidth()}}>{item}</th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(data).map((item) => tdFunc(data[item]))}
                    </tr>
                </tbody>
            </table>
        </div>
    )
}