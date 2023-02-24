import React from "react";
import { Link, useParams } from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../actions/actions';
import { useEffect } from "react";

import './Detail.css'

 
export default function Detail(){
    const dispatch = useDispatch();
    const {id} = useParams();

    useEffect(() => {
        dispatch(getDetail(id));   
    },[id, dispatch]);

    const detail = useSelector((state) => state.detail);  // selector para traer el detalle

    return (
        <div className="card3" >
                <h1>{detail.name}</h1>
                <img className="image2" src = {detail.image} alt = "img not found" width="200px" height="250px" />
                <a>Description: {detail.description}</a>
                <a>Released: {detail.released? detail.released:'Not defined'}</a>
                <a>Rating: {detail.rating? detail.rating:'Not defined'}</a>
                <a>Genres: {!detail.createdInDB? detail.genres + ' ' : detail.genres.map((ev) => ev.name + ' ')}</a>
                <a>Platforms: {!detail.createdInDB? detail.platforms + ' ' : detail.platforms.map((ev) => ev.name + ' ')}</a>
                <Link to = '/home'> <button className="button3" >Back</button></Link>
         </div>   
    )

}
