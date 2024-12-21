import React, { useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { ip } from '../consts/consts';

export default function AddMachine(props) {
	const [ data, setData ] = useState({
		serialNumber: '',
		techModel: 0,
		engModel: 0,
		engNumber: '',
		transModel: 0,
		transNumber: '',
		drvAxleModel: 0,
        drvAxleNumber: '',
        strAxleModel: 0,
        strAxleNumber: '',
        supContract: '',
        shipDate: '',
        consignee: '',
        supAddress: '',
        equip: '',
        client: 0,
        serviceCompany: 0
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
        axios.post(ip + '/machines', 
        	{
        	        "serial_number": data.serialNumber,
        	        "tech_model": data.techModel,
        	        "eng_model": data.engModel,
        	        "eng_number": data.engNumber,
        	        "trans_model": data.transModel,
        	        "trans_number": data.transNumber,
        	        "drv_axle_model": data.drvAxleModel,
                    "dev_axle_number": data.drvAxleNumber,
                    "str_axle_model": data.strAxleModel,
                    "str_axle_number": data.strAxleNumber,
                    "sup_contract": data.supContract,
                    "ship_date": data.shipDate,
                    "consignee": data.consignee,
                    "sup_address": data.supAddress,
                    "equipment": data.equip,
                    "client": data.client,
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
			<form className='form-block wider' onSubmit={handleSubmit}>
                    <div className='filter-form machine'>
                        <div className='input-box'><label>Зав. № машины: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, serialNumber: e.target.value})}></input></div>

                    	<div className='input-box'><label>Модель техники: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, techModel: e.target.value})}>
                    		<option value=''></option>
                    		{hbData.hb.map((item)=> item.book_name=='Модель техники' && <option value={item.id}>{item.name}</option>)}
                    	</select></div>

                        <div className='input-box'><label>Модель двигателя: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, engModel: e.target.value})}>
                            <option value=''></option>
                            {hbData.hb.map((item)=> item.book_name=='Модель двигателя' && <option value={item.id}>{item.name}</option>)}
                        </select></div>
                        <div className='input-box'><label>Зав. № двигателя: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, engNumber: e.target.value})}></input></div>

                        <div className='input-box'><label>Модель трансмиссии: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, transModel: e.target.value})}>
                            <option value=''></option>
                            {hbData.hb.map((item)=> item.book_name=='Модель трансмиссии' && <option value={item.id}>{item.name}</option>)}
                        </select></div>
                        <div className='input-box'><label>Зав. № трансмиссии: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, transNumber: e.target.value})}></input></div>

                        <div className='input-box'><label>Модель ведущего моста: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, drvAxleModel: e.target.value})}>
                            <option value=''></option>
                            {hbData.hb.map((item)=> item.book_name=='Модель ведущего моста' && <option value={item.id}>{item.name}</option>)}
                        </select></div>
                        <div className='input-box'><label>Зав. № ведущего моста: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, drvAxleNumber: e.target.value})}></input></div>

                        <div className='input-box'><label>Модель управляемого моста: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, strAxleModel: e.target.value})}>
                            <option value=''></option>
                            {hbData.hb.map((item)=> item.book_name=='Модель управляемого моста' && <option value={item.id}>{item.name}</option>)}
                        </select></div>
                        <div className='input-box'><label>Зав. № управляемого моста: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, strAxleNumber: e.target.value})}></input></div>

                        <div className='input-box'><label>Договор поставки №, дата: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, supContract: e.target.value})}></input></div>

                        <div className='input-box'><label>Дата отгрузки с завода: </label><input required className='form-field' type='date' id='1' onChange={(e)=> setData({...data, shipDate: e.target.value})}></input></div> 

                        <div className='input-box'><label>Грузополучатель: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, consignee: e.target.value})}></input></div>

                        <div className='input-box'><label>Адрес поставки: </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, supAddress: e.target.value})}></input></div>

                        <div className='input-box'><label>Комплектация (доп. опции): </label> <input className='form-field' type='text' id='1' onChange={(e)=> setData({...data, equip: e.target.value})}></input></div>

                        <div className='input-box'><label>Клиент: </label><select required className='select' type='text' id='1' onChange={(e)=> setData({...data, client: e.target.value})}>
                            <option value=''></option>
                            {hbData.cl!=undefined && hbData.cl.map((item)=> <option value={item.id}>{item.name}</option>)}
                        </select></div>

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