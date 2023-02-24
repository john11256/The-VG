import React  from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameVG} from '../actions/actions';
import './SearchBar.css'

export default function SearchBar () {
    const dispatch = useDispatch();
    const [name, setName] = useState("");

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value);  // el value del input va tomar el value del estado
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameVG(name)); // despacha la accion con el name que es el estado local y lo que escribe el usuario
    };

    return (
        <div>
            <input className='search'
            type = 'text'
            placeholder = 'Search...'
            onChange={(e) => handleInputChange(e)}
            />
            <button className='button_search' type = 'submit' onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
};