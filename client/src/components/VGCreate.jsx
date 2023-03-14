import React, {useState,useEffect} from "react";
import {Link,useHistory} from 'react-router-dom';
import {postVG,getGenre,getPlatform} from '../actions/actions';
import { useDispatch, useSelector } from "react-redux";

import './VGCreate.css'

function validate(input) { // Input es el estado local
    let errors = {};
    if(!input.name) {
        errors.name = 'The value is required';
    }
    return errors;
};

export default function VGCreate(){
    const dispatch = useDispatch();
    const history = useHistory();

    const genreState = useSelector((state) => state.genre)  
    const platformState = useSelector((state) => state.platform)  // guardo el estado que declare en el reducers

    const [errorsName,setErrorsName] = useState({});
    const [errorsPlatform,setErrorsPlatform] = useState({});

    const [buttonOnName,setButtonOnName] = useState(false);
    const [buttonOnPlatform,setButtonOnPlatform] = useState(false);

    const [input, setInput] = useState({
        name:'',
        description:'',
        image:'',
        released:'',
        platforms:[],
        genres:[]
    });

    // funcion para el onchange de los valores sencillos
    function handleChange (e){  // va guardar lo que escribe el usuario en el estado input
        setInput({
            ...input,    //  se va llenando el estado a medidad que se va modificando 
            [e.target.name] : e.target.value
        });
        
    };

    function handleChangeOnName (e){
        setErrorsName(validate({
            ...input,
            [e.target.name]: e.target.value
        }));

        if(e.target.value.length>0){
            setButtonOnName(true)
        }else{
            setButtonOnName(false)
        };
    };


    function handleChangeOnPlatform (e){
        if(e.target.value.length>0){
            setButtonOnPlatform(true)
        }else{
            setButtonOnPlatform(false)
        };
    };

    // funcion para las platforms 
    function handleSelectPlatform(e){
        if(!input.platforms.includes(e.target.value)){
            setInput({
                ...input,
                platforms: [...input.platforms,e.target.value]  // En el array concatena lo que ya había
            })
        }else{
            setInput({
                ...input,
            })
        }
    };

    // funcion para los genres que son option
    function handleSelectGenres(e){
        if(!input.genres.includes(e.target.value)){
            setInput({
                ...input,
                genres: [...input.genres,e.target.value]  // En el array concatena lo que ya había
            })
        }else{
            setInput({
                ...input,
            })
        }
    };

    function handleSubmit(e){
        e.preventDefault();
        dispatch(postVG(input));
        alert('personaje creado')
        setInput({   // agarra todo y lo pasa vacio
            name:'',
            image:'',
            released:'',
            rating:'',
            platforms:[],
            genres:[]
        })
        history.push('/home')   // me redirige a la ruta que yo le diga
    }

    function handleDeleteGenres(e){
        setInput({
            ...input,
            genres: input.genres.filter((ev) => ev !== e)
        })
    };

    function handleDeletePlatforms(e){
        setInput({
            ...input,
            platforms: input.platforms.filter((ev) => ev !== e)
        })
    }

    useEffect(() => {
        dispatch(getGenre())
        dispatch(getPlatform())
    }, [dispatch]);

    return(
        <div>
            <div className="image_container"></div>
            <h1 className="h1">Create video game</h1>
            <form onSubmit={(e) => handleSubmit(e)}>
                <div className="name2">
                    <label>Name: </label>
                    <input className='input1'
                    type = 'text'
                    value={input.name}
                    name = 'name'
                    onChange={(e) => {
                    handleChange(e)
                    handleChangeOnName(e)
                    }}
                    placeholder={errorsName.name}
                    />
                </div>

                <div className="image3">
                    <label>Image: </label>
                    <input className='input2'
                    type = 'text'
                    value={input.image}
                    name = 'image'
                    onChange={(e) => handleChange(e)}
                    />
                </div>            

                <div className="released">
                    <label>Released: </label>
                    <input className='input4'
                    type = 'text'
                    value={input.released}
                    name = 'released'
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="rating">
                    <label>Rating: </label>
                    <input className='input5'
                    type = 'number'
                    value={input.rating}
                    min={0}
                    max={5}
                    name = 'rating'
                    onChange={(e) => handleChange(e)}
                    />
                </div>

                <div className="plarform_genre">
                <label>Platforms </label>
                <select 
                onChange={(e) => {
                    handleSelectPlatform(e)
                    handleChangeOnPlatform(e)
                }}> 
                    {platformState.map((ev) => (
                        <option value = {ev.name}>{ev.name}</option>
                    ))};
                </select>

                <label>Genres </label>
                <select onChange={(e) => handleSelectGenres(e)}>
                    {genreState.map((ev) => (
                        <option value = {ev.name}>{ev.name}</option>
                    ))}
                </select>

                {
                input.genres.map((ev) => 
                <div>
                    <p>{ev}</p>
                    <button onClick={() => handleDeleteGenres(ev)}>x</button>
                </div>
                )
                }
                {
                input.platforms.map((ev) => 
                <div className="delete">
                    <p>{ev}</p>
                    <button onClick={() => handleDeletePlatforms(ev)}>x</button>
                </div>
                )
                }

                </div>

                <button className="button_create" 
                disabled={!buttonOnName || !buttonOnPlatform} 
                type = 'submit'>Create</button>
                <Link to = '/home'>
                    <button className="button_back">Back</button>
                </Link> 

            </form>

        </div>
    )

};



