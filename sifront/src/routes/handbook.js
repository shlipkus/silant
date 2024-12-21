import React, { useState, useEffect } from 'react';
import { useParams } from "react-router";
import { Link } from 'react-router-dom';
import axios from 'axios';
import { ip } from '../consts/consts';

export default function Handbook() {
	const [ data, setData ] = useState({});
	const { id } = useParams();
	const [ toggle, setToggle ] = useState(false);
	const [ put, setPut ] = useState({
		name: '',
		desc: ''
	})

	useEffect(()=>{
		getData(id)
	}, [])

	function getData(id) {
		const token = window.localStorage.getItem('token');
		axios.get(`${ip}/handbooks/${id}`,
			{
            headers: {
              Authorization: 'Token ' + token 
            }
           }
           ).then(function (response) {            
            if(response.status==200){
                setData(response.data)                
            }
          })
          .catch(function (error) {
            console.log(error);
          })
	}

	function patchData(data) {
		const token = window.localStorage.getItem('token');
		axios.patch(`http://localhost:8000/handbooks/${id}`,data,
			{
            headers: {
              Authorization: 'Token ' + token 
            }
           }
           ).then(function (response) {            
            if(response.status==200){
                setData(response.data)                
            }
          })
          .catch(function (error) {
            console.log(error);
          })
	}

	function handleSubmit(e){
		e.preventDefault();
		let data={};
		put.name!=data.name && put.name!='' ? data['name']=put.name: null;
		put.desc!=data.description && put.desc!='' ? data['description']=put.desc: null;
		patchData(data);
	}

	return (
		<main className='main'>
			<Link className='link-to' to={-1}>{'< Назад'}</Link>
			{Object.keys(data).length!=0 && <><h3 className='data'>Раздел: {data.book_name}</h3>
				<h1 className='title'>{data.name}</h1>
				<h4 className='data'>Описание: </h4>
				<div className='descript'><span className='data'>{data.description}</span></div></>}
			<button className='filter-open data' onClick={()=>setToggle(!toggle)}>Редактировать</button>
			{toggle && <form className='form-block putch' onSubmit={handleSubmit}>
						<div className='putch-grid'>
						<div className='input-box data'><label>Наименование: </label> <input className='form-field' defaultValue={data.name} type='text' id='1' onChange={(e)=> setPut({...put, name: e.target.value})}></input></div>
						<div className='input-box data'><label>Описание: </label> <textarea className='form-field area' defaultValue={data.description} onChange={(e)=> setPut({...put, desc: e.target.value})}></textarea></div>
						<div className='buttn data'><input className='form-submit marg' type='submit' value='Редактировать' /></div>
						</div>
						</form>}
		</main>
		)
}