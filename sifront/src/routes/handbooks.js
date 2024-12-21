import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/handbook.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { ip } from '../consts/consts';


export default function Handbooks() {
	const hb = useSelector((state) => state.auth.user.hb);
	const group = useSelector((state) => state.auth.user.group);
	const navigate = useNavigate();
	const [ toggle, setToggle ] = useState(false);
	const [ data, setData ] =useState({
		bookName: '',
		name: '',
		description: ''
	})
	const [error, setError] = useState('');

	function handleSubmit(e) {
		e.preventDefault();
		const token = window.localStorage.getItem('token');
        axios.post(ip + '/handbooks', 
        	{
        	       "book_name": data.bookName,
        	       "name": data.name,
        	       "description": data.description
        	},
            {
                headers: {
                  Authorization: 'Token ' + token 
                }
            })
            .then(function (response) {            
                if(response.status==200){
                    let obj = response.data;
                    hb.push(obj);
                    navigate('/handbooks/'+obj.id)
                }
            })
              .catch(function (error) {
                setError('Проверьте введеные данные')
                console.log(error);
            });
	}
	
	return (
		<main className='main'>
			<Link className='link-to' to={-1}>{'< Назад'}</Link>
			<h1 className='title'>Справочники</h1>
			<div className='book-grid'>
			{[...new Set(hb.map(obj => obj.book_name))].map((item)=> <div className='handbook'>
									<h3>{item}</h3>
									{hb.map(el => el.book_name==item ? <Link className='link-to book' to={`/handbooks/${el.id}`}>{el.name}</Link>: null)}
								</div>)}
			</div>
			{['manager'].includes(group) && <button className='filter-open data' onClick={()=>setToggle(!toggle)}>Добавить</button>}
			{toggle && <form className='form-block putch' onSubmit={handleSubmit}>
						<div className='putch-grid'>
						<div className='input-box data'><label>Раздел: </label> <select required className='select' id='1' onChange={(e)=> setData({...data, bookName: e.target.value})}>
							<option></option>
                    		{[...new Set(hb.map(obj => obj.book_name))].map((item)=> <option value={item}>{item}</option>)}
                    	</select></div>
						<div className='input-box data'><label>Наименование: </label> <input required className='form-field' type='text' id='1' onChange={(e)=> setData({...data, name: e.target.value})}></input></div>
						<div className='input-box data'><label>Описание: </label> <textarea required className='form-field area' onChange={(e)=> setData({...data, description: e.target.value})}></textarea></div>
						<div className='buttn data'><input className='form-submit marg' type='submit' value='Добавить' /></div>
						{error!='' && <span className='error-span'>{error}</span>}
						</div>
						</form>}
		</main>
		)
}