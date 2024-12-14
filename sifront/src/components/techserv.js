import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/authres.css';
import axios from 'axios'

export default function TechService() {
    const data = useSelector((state)=> state.maindata);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState(
            {
                ts_type: '',
                machine: '',
                sv_company: '',
            }
        )
            
    const [toggle, setToggle] = useState(false);

    useEffect(()=>{
        getData('')
    }, [])
        
    function tdFunc(item) {            
            if(typeof(item)=='object') return <td>{item.name}</td>
            return <td>{item}</td>
        }
    
    const tableHead = [
            'Зав. № машины', 'Вид ТО', 'Дата проведения ТО', 'Наработка, м/ч',
            '№ заказ-наряда', 'Дата заказ-наряда', 'Организация проводившая ТО',
        ]
    
    const tableSort = [
        'machine__serial_number', 'ts_type__name', 'date', 'eng_hours', 'order_number', 'order_date', 'service_company__name'
    ]
    
    
    function getData(query) {
            const token = window.localStorage.getItem('token');
            axios.get(`http://localhost:8000/service?${query}`,
                {
                headers: {
                  Authorization: 'Token ' + token 
                }
               })
              .then(function (response) {            
                if(response.status==200){
                    dispatch({type: 'ADDMAINDATA', payload: response.data});
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    
    function getWidth(){
            const width = 100/tableHead.length
            return `${width}%`
        }
    
    function sortHandle(e) {            
            const sort = tableSort[e.target.value]
            getData(`order_by=${sort}`)
        }
    
    function handleFilter(e) {
            e.preventDefault()            
            getData(`ts_type__name__contains=${filters.ts_type}&machine__serial_number__contains=${filters.machine}&service_company__name__contains=${filters.sv_company}`)
        }
    return (
        <><div className='filter-panel'>
            <label>Сортировать по: </label>
            <select className='select' onChange={sortHandle} defaultValue={2}>
                {tableHead.map((item, index)=> <option value={index}>{item}</option>)}
            </select>
                <div className='filters'>
                    <button className='filter-open' onClick={(e) => setToggle(!toggle)}>Фильтры</button>
                    {toggle && <form className='form-block' onSubmit={handleFilter}>
                    <span>Полный или частичный ввод</span>
                    <div className='filter-form'>                           
                        <label>Вид ТО: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, ts_type: e.target.value})}></input></label>
                        <label>Зав. № машины: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, machine: e.target.value})}></input></label>
                        <label>Сервисная компания: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, sv_company: e.target.value})}></input></label>                        
                    </div> 
                    <div className='buttn'><input className='form-submit marg' type='submit' value='Применить' /></div>
                    </form>}
                    </div>
                    </div>
        <table className='table-results'>
            <thead>
                <tr>
                    {tableHead.map((item)=> <th style={{width: getWidth()}}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                { data.map((obj)=>
                    <tr>
                    {Object.keys(obj).map((item) => tdFunc(obj[item]))}
                    </tr>)
                }
            </tbody>
        </table></>
    )
}