import React from "react";
import './Paginado.css'

export default function Paginado ({VGPerPage, allVideoGames, paginado}){  /* propiedades que le paso en home*/
    const pageNumbers = []
    for (let i=1; i<=Math.ceil(allVideoGames/VGPerPage); i++){  /* Math.ceil redonde hacia arriba.  el for va a dar el numero de paginas*/
        pageNumbers.push(i)
    }
    return (
        <div className="pagination">
            <ul>
                   {pageNumbers &&
                    pageNumbers.map((ev) => (
                        <li key = {ev}>
                            <a class = "active" onClick={() => paginado(ev)}>{ev}</a>
                        </li>
                    ))}
            </ul>
        </div>
            
    )
}