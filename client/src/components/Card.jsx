import React from "react";
import {Link} from 'react-router-dom';
import './Card.css'

export default function Card ({name,image,genres,id}) {  /* destructuring, se pasan en un obj y son propiedades que le paso en home */
    return (
        <div className="card2">
            <h3>{name}</h3>
            <h5>{genres}</h5>
            <img className="image" src = {image} alt = "img not found" width="200px" height="250px" />
            <Link to={"/"+id}>
                <button className="button2">More</button>
            </Link>
        </div>
    );
}