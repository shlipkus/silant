import React from 'react';
import { useSelector } from 'react-redux';
import '../styles/results.css'

export default function Results() {
    const data = useSelector((state)=> state.basedata)
    const windowInnerWidth = document.documentElement.clientWidth

    console.log(windowInnerWidth);


    function tdFunc(item) {
        if(typeof(item)=='object') return <td>{item.name}</td>
        return <td><span className='t-span'>{item}</span></td>
    }    

    const tableHead = [
        'Зав. № машины', 'Модель техники', 'Модель двигателя', 'Зав. № двигателя',
        'Модель трансмиссии', 'Зав. № трансмиссии', 'Модель ведущего моста',
        'Зав. № ведущего моста', 'Модель управляемого моста', 'Зав. № управляемого моста'
    ]

    function getWidth(){
        if (windowInnerWidth <= 460) return '30%';
        const width = 100/tableHead.length
        return `${width}%`
    }
    return (
        <div className='search-result'>
            <h2 className='title-result'>Результат поиска:</h2>
            <div className='scrollable'>
            <table className='table-results'>
                <thead>
                    <tr>
                        {tableHead.map((item)=> <th style={{width: getWidth()}}><span className='t-span'>{item}</span></th>)}
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        {Object.keys(data).map((item) => tdFunc(data[item]))}
                    </tr>
                </tbody>
            </table>
            </div>
        </div>
    )
}