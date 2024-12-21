import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/authres.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AddRec from './add_rec';
import { ip } from '../consts/consts';

export default function Reclamations({ num }) {
    const data = useSelector((state)=> state.maindata);
    const auth = useSelector((state)=> state.auth);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [filters, setFilters] = useState(
            {
                f_point: '',
                r_method: '',
                sv_company: '',
            }
        )
            
    const [toggle, setToggle] = useState(
            {
                filter: false,
                add: false
            }
        );

    useEffect(()=>{
        num==undefined ? getData(''): getData(`machine__serial_number=${num}`)
    }, [])
        
    function tdFunc(obj, key) {
            if(key=='id') return null            
            if(typeof(obj[key])=='object') return <td id={obj.id}>{obj[key].name}</td>
            return <td id={obj.id}>{obj[key]}</td>
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
            axios.get(`${ip}/reclamations?${query}`,
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

    function handleTd(e){
        navigate(`/reclame/${e.target.id!="" ? e.target.id: e.target.firstChild.id}`)       
    }

    function catchPost() {
        getData('');
    }


    return (
        <><div className='filter-panel'>
            <label>Сортировать по: </label>
            <select className='select' onChange={sortHandle} defaultValue={1}>
                {tableHead.map((item, index)=> <option value={index}>{item}</option>)}
            </select>
                <div className='filters'>
                    <div className='buttons'><button className='filter-open' onClick={(e) => setToggle({filter: !toggle.filter, add: false})}>Фильтры
                    </button>{['service company', 'manager'].includes(auth.user.group) && <button className='filter-open to' onClick={(e) => setToggle({filter: false, add: !toggle.add})}>Добавить запись</button>}</div>
                    {toggle.filter && <form className='form-block' onSubmit={handleFilter}>
                    <span>Полный или частичный ввод</span>
                    <div className='filter-form'>                           
                        <label>Узел отказа: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, f_point: e.target.value})}></input></label>
                        <label>Способ восстановления: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, r_method: e.target.value})}></input></label>
                        <label>Сервисная компания: <input className='form-field' type='text' id='1' onChange={(e)=> setFilters({...filters, sv_company: e.target.value})}></input></label>                        
                    </div> 
                    <div className='buttn'><input className='form-submit marg' type='submit' value='Применить' /></div>
                    </form>}
                    {toggle.add && <AddRec catchPost={catchPost}/>}
                    </div>
                    </div>
        <div className='scrollable'><table className='table-results'>
            <thead>
                <tr>
                    {tableHead.map((item)=> <th style={{width: getWidth()}}><span className='t-span'>{item}</span></th>)}
                </tr>
            </thead>
            <tbody>
                { data.map((obj)=>
                    <tr className='tr-click' onClick={handleTd}>
                    {Object.keys(obj).map((item) => tdFunc(obj, item))}
                    </tr>)
                }
            </tbody>
        </table></div></>
    )
}