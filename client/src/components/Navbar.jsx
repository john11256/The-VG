import React, { useState } from "react";
import './Navbar.css'
import Modal from './Modal'

export default function Navbar () { 
    const[modal,setModal] = useState(false)

    return (
        <div>
            <div className="ContenedorBotones">
            <button onClick={() => setModal(!modal)}>Login</button>
            </div>
            <Modal 
                state = {modal}
                changeState = {setModal}
            >
                
                <div className="contenido">
                    <h1>hola</h1>
                </div>
            </Modal>
        </div>

    );
}