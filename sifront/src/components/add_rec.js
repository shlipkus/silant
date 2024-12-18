import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

export default function AddRec(props) {
	const [ data, setData ] = useState({
		serialNumber: 0,
		fDate: '',
		ngHours: 0,
		fPoint: '',
		fDesc: '',
		recMethod: '',
		serviceCompany: 0,
        usedSpar: '',
        recDate: ''
	})

	const [error, setError] = useState('');
	const hbData = useSelector((store) => store.auth.user)
	const mData = useSelector((store) => store.machines)


	function handleSubmit(e) {
		e.preventDefault();
        if(data.fDate > data.recDate) {
            setError('Дата отказа должна быть раньше даты восстановления')
            return
        }
		const token = window.localStorage.getItem('token');
        axios.post('http://localhost:8000/reclamations', 
        	{
        	        "machine": data.serialNumber,
        	        "failure_date": data.fDate,
        	        "ng_hours": data.ngHours,
        	        "failure_point": data.fPoint,
        	        "failure_desc": data.fDesc,
        	        "recovery_method": data.recMethod,
        	        "used_spares": data.usedSpar,
                    "recovery_date": data.recDate,
                    "service_company": data.serviceCompany,
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

                        <div className='input-box'><label>Дата отказа: </label><input required className='form-field' type='date' id='1' onChange={(e)=> setData({...data, fDate: e.target.value})}></input></div> 

                        <div className='input-box'><label>Наработка м/ч: </label><input required className='form-field' type='number' id='1' onChange={(e)=> setData({...data, ngHours: e.target.value})}></input></div> 

                        <div className='input-box'><label>Узел отказа: </label><select required className='select' id='1' onChange={(e)=> setData({...data, fPoint: e.target.value})}>
                        	<option value=''></option>
                        	{hbData.hb.map((item) => item.book_name=="Узел отказа" ? <option value={item.id}>{item.name}</option>: null)}
                        </select></div>

                        <div className='input-box'><label>Описание отказа: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, fDesc: e.target.value})}></input></div>

                        <div className='input-box'><label>Способ восстановления: </label><select required className='select' id='1' onChange={(e)=> setData({...data, recMethod: e.target.value})}>
                            <option value=''></option>
                            {hbData.hb.map((item) => item.book_name=="Восстановление" ? <option value={item.id}>{item.name}</option>: null)}
                        </select></div>

                        <div className='input-box'><label>Используемые запчасти: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, usedSpar: e.target.value})}></input></div>
                        
                        <div className='input-box'><label>Дата восстановления: </label><input required className='form-field' type='date' id='1' onChange={(e)=> setData({...data, recDate: e.target.value})}></input></div>

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