//useEffect: llena el estado cuando se monta el componente
// useDispatch sirve para utilizar la constante y despachar las acciones 
// useSelector sirve para traer todo lo que está en el estado 

import React from "react";
import {Link} from 'react-router-dom';
//hooks que voy a usar de react
import { useState, useEffect } from "react";
// hooks que voy a usar de react-redux
import {useDispatch, useSelector} from 'react-redux';
// actions que necesito para el componente
import { getVideoGames, getGenre, filterVGByGenre, filterCreated, filterOrder} from "../actions/actions";
// componente que voy a usar en home
import Paginado from "./Paginado";
import SearchBar from "./SearchBar";
import Card from "./Card";

import './Home.css'

export default function Home () {
    const dispatch = useDispatch()  
    const allVideoGames = useSelector((state) => state.videoGames) /* Trae en esa constante todo lo que está en el estado de VG, videoGames es el array creado en reducer */
    const allGenres = useSelector((state) => state.genre)

    // Para el paginado
    const [currentPage, setCurrentPage] = useState(1) // En un estado local se pasa la pag actual y una constante que setee el # pag
    const [VGPerPage, setVGPerPage] = useState(16) // En un estado local se pasa cuantos VG por pag 
    const [order, setOrder] = useState('')
    const indexLastVG = currentPage*VGPerPage  // indice del ultimo VG de cada pagina      16-
    const indexFirstVG = indexLastVG - VGPerPage  // indice el primer VG de cada pagina    0-
    const currentVG = allVideoGames.slice(indexFirstVG, indexLastVG)   // Se va a guardar en un array los VG en el rango indicado po la funcion slice
    // el slice corta el array con los parametros que se le indican                        0 a 16 - 17 a 33 
    const paginado = (pageNumber) => {   // el paginado va a setear la pagina  en el numero que se aprete y los inices van a ir cambiando
        setCurrentPage(pageNumber)
    }
 
    useEffect(() => {
        dispatch(getVideoGames());       // Se despacha la accion que se trajo
        dispatch(getGenre());
    },[dispatch])

    // Resetea y trae todo de nuevo
    function handleClick(e){        
        e.preventDefault();    
        dispatch(getVideoGames());
    };

    
    function handleSort (e) {
        e.preventDefault();
        dispatch(filterOrder(e.target.value));
        setCurrentPage(1);
        setOrder(e.target.value)
    };

    //Para filtro por genre
    function handleFilterGenre(e){
        dispatch(filterVGByGenre(e.target.value)); // e.target.value accede a cada uno de los payload que clickea el usuario
        setCurrentPage(1);
    };

    function handleFilterCreated(e){
        dispatch(filterCreated(e.target.value))
    };

    return(
        <div>
            <div className="searchbar_container">
            <SearchBar/>
            </div>

            <div className="created_container">
            <h1>VIDEOGAMES</h1>
            <Link className='button_add' to = '/videogame'>Add game</Link>
            </div>

            <div className="filter_container">
            <select className="filter" onChange={e => handleSort(e)}>
            <option>Order</option>
                <option value = 'Asc'>A-Z</option>
                <option value = 'Des'>Z-A</option>
                <option value = '+rating'>+ rating</option>
                <option value = '-rating'>- rating</option>
            </select>
            <select className="filter" onChange={e => handleFilterGenre(e)}>
                <option>Genres</option>
                <option value = 'All'>All</option>
            {allGenres?.map((ev) =>(
                <option value = {ev.name}>{ev.name}</option>
                ))}
            </select>
            <select className="filter" onChange={e => handleFilterCreated(e)}>
                <option>Games</option>
                <option value = 'All'>All</option>
                <option value = 'Created'>Created</option>
                <option value = 'Api'>Api</option>
            </select>
            </div>

            <div className="refresh_container">
            <button className='button_reload'  onClick={e => {handleClick(e)}}>REFRESH</button>
            </div>
            
            <div className="card_container">      
                <ul className='card'>
                {
                currentVG?.map((ev) => {
                    return (
                        <div>
                                <Card
                                name = {ev.name} 
                                image = {ev.image} 
                                id = {ev.id}
                                genres = {!ev.createdInDB? ev.genres + ' ' : ev.genres.map((ev) => ev.name + ' ')}
                                />
                        </div>
                    )
                })
                }
                </ul>
            </div>

            <div className="paginado_container">
            <Paginado
            VGPerPage = {VGPerPage}
            allVideoGames = {allVideoGames.length}
            paginado = {paginado}
            />
            </div>
        </div>
    );
};