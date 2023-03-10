import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { postLog } from "../actions/actions";

export default function Modal ({children,state,changeState}) {
    const dispatch = useDispatch();

    const [dates,setDates] = useState({
        email:'',
        password:''
    });

    function handleChange (e){  // va guardar lo que escribe el usuario en el estado input
        setDates({
            ...dates,    //  se va llenando el estado a medidad que se va modificando 
            [e.target.name] : e.target.value
        });
        
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postLog(dates));
        setDates({   
            email:'',
            password:''
        })
    }

    // const handleSubmit = async(e) => {
    //     e.preventDefault();
    //     if(!e.target.value){
    //         console.log('no enviar');
    //     }else{
    //         let res = await axios.post('http://localhost:3001/login',dates)
    //         console.log(res.data);
    //     }
    // }
    return(
        <>
            {state && 
            <div className="overlay">
                <div className="encabezadoModal">
                    <form onSubmit={(e) => handleSubmit(e)}>
                    <input
                        type='text'
                        value={dates.email}
                        name='email'
                        onChange={(e) => handleChange(e)}
                    />
                    <input
                        type='password'
                        value={dates.password}
                        name='password'
                        onChange={(e) => handleChange(e)}

                    />
                    <button type = 'submit'>hola</button>
                    </form>
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