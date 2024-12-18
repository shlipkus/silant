import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddTs(props) {
	const [ data, setData ] = useState({
		serialNumber: 0,
		tsType: 0,
		date: '',
		engHours: '',
		orderNumber: '',
		orderDate: '',
		serviceCompany: 0
	})

	const [error, setError] = useState('');
	const hbData = useSelector((store) => store.auth.user)
	const mData = useSelector((store) => store.machines)


	function handleSubmit(e) {
		e.preventDefault();
		const token = window.localStorage.getItem('token');
        axios.post('http://localhost:8000/service', 
        	{
        	        "machine": data.serialNumber,
        	        "ts_type": data.tsType,
        	        "date": data.date,
        	        "eng_hours": data.engHours,
        	        "order_number": data.orderNumber,
        	        "order_date": data.orderDate,
        	        "service_company": data.serviceCompany
        	},
            {
                headers: {
                  Authorization: 'Token ' + token 
                }
            })
            .then(function (response) {            
                if(response.status==200){
                    props.catchPost();
                }
            })
              .catch(function (error) {
                setError('Проверьте введеные данные')
                console.log(error);
            });
	}

	return (
			<form className='form-block' onSubmit={handleSubmit}>
                    <div className='filter-form'>
                    	<div className='input-box'><label>Зав. № машины: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, serialNumber: e.target.value})}>
                    		<option value=''></option>
                    		{Object.keys(mData).map((key) => <option value={key}>{mData[key]}</option>)}
                    	</select></div>                         
                        <div className='input-box'><label>Вид ТО: </label><select required className='select' id='1' onChange={(e)=> setData({...data, tsType: e.target.value})}>
                        	<option value=''></option>
                        	{hbData.hb.map((item) => item.book_name=="Техническое обслуживание" ? <option value={item.id}>{item.name}</option>: null)}
                        </select></div>
                        <div className='input-box'><label>Дата ТО: </label><input required className='form-field' type='date' id='1' onChange={(e)=> setData({...data, date: e.target.value})}></input></div>
                        <div className='input-box'><label>Наработка м/ч: </label><input required className='form-field' type='number' id='1' onChange={(e)=> setData({...data, engHours: e.target.value})}></input></div>
                        <div className='input-box'><label>№ заказ-наряда: </label> <input required className='form-field' type='text' id='1' onChange={(e)=> setData({...data, orderNumber: e.target.value})}></input></div>
                        <div className='input-box'><label>Дата заказ-наряда: </label><input required className='form-field' type='date' id='1' onChange={(e)=> setData({...data, orderDate: e.target.value})}></input></div>
                        <div className='input-box'><label>Сервисная компания: </label><select required className='select' type='text' id='1' onChange={(e)=> setData({...data, serviceCompany: e.target.value})}>
                        	<option value=''></option>
                        	{hbData.sc.map((item)=> <option value={item.id}>{item.name}</option>)}
                        </select></div>                       
                    </div> 
                    {error!='' && <span className='error-span'>{error}</span>}
                    <div className='buttn'><input className='form-submit marg' type='submit' value='Добавить' /></div>
            </form>
		)
}