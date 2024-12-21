import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import '../styles/authres.css';
import axios from 'axios';
import { ip } from '../consts/consts';
import { useNavigate } from 'react-router-dom';
import { machineHead } from '../consts/consts';
import AddMachine from './add_machine';

export default function Machines() {
    const data = useSelector((state)=> state.maindata);
    const auth = useSelector((state)=> state.auth);
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
    
    const [toggle, setToggle] = useState(
            {
                filter: false,
                add: false
            }
        );

    useEffect(()=>{
            getData('')
        }, [])
        
    function tdFunc(obj, key, item) { 
            if(key=='id') return null           
            if(typeof(item)=='object') return <td key={key} id={obj.id}>{item.name}</td>
            return <td key={key} id={obj.id}>{item}</td>
        }
    
    
    const tableSort = [
            'serial_number', 'tech_model__name', 'eng_model__name', 'eng_number', 'trans_model__name', 
            'trans_number', 'drv_axle_model__name', 'dev_axle_number', 'str_axle_model__name',
             'str_axle_number', 'sup_contract', 'ship_date', 'consignee', 'sup_address',
             'equipment', 'client__name', 'service_company__name'
        ]
    
    
    function getData(query) {
            const token = window.localStorage.getItem('token');
            axios.get(`${ip}/machines?${query}`,
                {
                headers: {
                  Authorization: 'Token ' + token 
                }
               })
              .then(function (response) {            
                if(response.status==200){
                    dispatch({type: 'ADDMAINDATA', payload: response.data});
                    dispatch({type: 'ADDLIST', payload: response.data})
                }
              })
              .catch(function (error) {
                console.log(error);
              });
        }
    
    function handleTd(e){
        navigate(`/machine/${e.target.id!="" ? e.target.id: e.target.firstChild.id}`)      
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

    function catchPost() {
        getData('');
        setToggle({filter: false, add: false})
    }

    return (
        <><div className='filter-panel'>
            <label>Сортировать по: </label>
            <select className='select' onChange={sortHandle} defaultValue={11}>
                {machineHead.map((item, index)=> <option key={index} value={index}>{item}</option>)}
            </select>
                <div className='filters'>
                    <div className='buttons'><button className='filter-open' onClick={(e) => setToggle({filter: !toggle.filter, add: false})}>Фильтры</button>
                    {['manager'].includes(auth.user.group) && <button className='filter-open to' onClick={(e) => setToggle({filter: false, add: !toggle.add})}>Добавить запись</button>}</div>
                            
                    {toggle.filter && <form className='form-block' onSubmit={handleFilter}>
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
                    {toggle.add && <AddMachine catchPost={catchPost}/>}                    
                    </div>
                    </div>
            <div className='scrollable'><table className='table-results'>
            <thead>
                <tr>
                    {machineHead.map((item, index)=> <th key={index} style={{width: getWidth()}}><span className='t-span'>{item}</span></th>)}
                </tr>
            </thead>
            <tbody>
                { data.map((obj, index)=>
                    <tr key={index} className='tr-click'  onClick={handleTd}>
                    {Object.keys(obj).map((item) => tdFunc(obj, item, obj[item]))}
                    </tr>)
                }
            </tbody>
        </table>        
        </div>
        </>
    )
}