import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/authres.css';
import axios from 'axios'

export default function Reclamations() {
    const data = useSelector((state)=> state.maindata);
    const dispatch = useDispatch();
    const [filters, setFilters] = useState(
            {
                f_point: '',
                r_method: '',
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
            'Зав. № машины', 'Дата отказа', 'Наработка, м/ч',
            'Узел отказа', 'Описание отказа', 'Способ восстановления', 'Используемые запчасти',
            'Дата восстановления', 'Время простоя техники', 'Сервисная компания'
        ]
    
    const tableSort = [
        'machine__serial_number', 'failure_date', 'ng_hours', 'failure_point', 'failure_desc', 'recovery_method__name', 'used_spares',
        'recovery_date', 'downtime', 'service_company__name'
    ]
    
    
    function getData(query) {
            const token = window.localStorage.getItem('token');
            axios.get(`http://localhost:8000/reclamations?${query}`,
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
            getData(`failure_point__name__contains=${filters.f_point}&recovery_method__name__contains=${filters.r_method}&service_company__name__contains=${filters.sv_company}`)
        }
    return (
        <><div className='filter-panel'>
            <label>Сортировать по: </label>
            <select className='select' onChange={sortHandle} defaultValue={1}>
                {tableHead.map((item, index)=> <option value={index}>{item}</option>)}
            </select>
                <div className='filters'>
                    <button className='filter-open' onClick={(e) => setToggle(!toggle)}>Фильтры</button>
                    {toggle && <form className='form-block' onSubmit={handleFilter}>
                    <span>Полный или частичный ввод</span>
                    <div className='filter-form'>                           
                        <label>Узел отказа: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, f_point: e.target.value})}></input></label>
                        <label>Способ восстановления: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, r_method: e.target.value})}></input></label>
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