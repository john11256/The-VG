import React from "react";

export default function Modal ({children,state,changeState}) {
    return(
        <>
            {state && 
            <div className="overlay">
                <div className="encabezadoModal">
                    <h3>Titulo</h3>
                </div>
                <div className="botonCerrar">
                    <button onClick={() => changeState(false)}>x</button>
                </div>
                {children}

            </div>
            }
        </>

    )
}