import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/authres.css';
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { machineHead } from '../consts/consts';

export default function Machines() {
    const data = useSelector((state)=> state.maindata);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [filters, setFilters] = useState(
            {
                tech: '',
                eng: '',
                trans: '',
                drv_axle: '',
                str_axle: ''
            }
        )
    
    const [toggle, setToggle] = useState(false);

    useEffect(()=>{
            getData('')
        }, [])
        
    function tdFunc(key, item) {            
            if(typeof(item)=='object') return <td className='td-click' id={key} onClick={handleTd}>{item.name}</td>
            if(key=='serial_number') return <td className='td-click' id={key} onClick={handleTd}>{item}</td>
            return <td>{item}</td>
        }
    
    
    const tableSort = [
            'machine__serial_number', 'tech_model__name', 'eng_model__name', 'eng_number', 'trans_model__name', 
            'trans_number', 'drv_axle_model__name', 'dev_axle_number', 'str_axle_model__name',
             'str_axle_number', 'sup_contract', 'ship_date', 'consignee', 'sup_address',
             'equipment', 'client__name', 'service_company__name'
        ]
    
    
    function getData(query) {
            const token = window.localStorage.getItem('token');
            axios.get(`http://localhost:8000/machines?${query}`,
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
    
    function handleTd(e){
        if(e.target.id=='serial_number') {
            navigate(`/machine/${e.target.innerText}`)
        }        
    }
    
    function getWidth(){
            const width = 100/machineHead.length
            return `${width}%`
        }
    
    function sortHandle(e) {
            const sort = tableSort[e.target.value]
            getData(`order_by=${sort}`)
        }
    
    function handleFilter(e) {
            e.preventDefault()
            getData(`tech_model__name__contains=${filters.tech}&eng_model__name__contains=${filters.eng}&trans_model__name__contains=${filters.trans}&drv_axle_model__name__contains=${filters.drv_axle}&str_axle_model__name__contains=${filters.str_axle}`)
        }
    return (
        <><div className='filter-panel'>
            <label>Сортировать по: </label>
            <select className='select' onChange={sortHandle} defaultValue={11}>
                {machineHead.map((item, index)=> <option value={index}>{item}</option>)}
            </select>
                <div className='filters'>
                    <button className='filter-open' onClick={(e) => setToggle(!toggle)}>Фильтры</button>
                    {toggle && <form className='form-block' onSubmit={handleFilter}>
                    <span>Полный или частичный ввод</span>
                    <div className='filter-form'>                           
                        <label>Модель техники: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, tech: e.target.value})}></input></label>
                        <label>Модель двигателя: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, eng: e.target.value})}></input></label>
                        <label>Модель трансмиссии: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, trans: e.target.value})}></input></label>
                        <label>Модель ведущего моста: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, drv_axle: e.target.value})}></input></label>
                        <label>Модель управляемого моста: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, str_axle: e.target.value})}></input></label>
                    </div> 
                    <div className='buttn'><input className='form-submit marg' type='submit' value='Применить' /></div>
                    </form>}
                    </div>
                    </div>
        <table className='table-results'>
            <thead>
                <tr>
                    {machineHead.map((item)=> <th style={{width: getWidth()}}>{item}</th>)}
                </tr>
            </thead>
            <tbody>
                { data.map((obj)=>
                    <tr>
                    {Object.keys(obj).map((item) => tdFunc(item, obj[item]))}
                    </tr>)
                }
            </tbody>
        </table></>
    )
}