// Van las acciones que se van a necesitar,cada accion se va para el reducer 


import axios from 'axios';

// Funcion para traer los video juegos
export function getVideoGames () {
    return async function (dispatch){
        const getVG = await axios.get("http://localhost:3001/videogame");
        return dispatch({
            type: 'GET_VG',  /* Se envia la accion */
            payload: getVG.data /* Se envia data que es la informacion */
        });
    };
};

// Funcion para traer los generos, para mapearlos en el home y mostarlos en el filtro
export function getGenre () {
    return async function (dispatch){
        const getGenre = await axios.get("http://localhost:3001/genre");
        return dispatch({
            type: 'GET_GENRE',
            payload: getGenre.data
        })
    }
};

// Funcion para traer las plataformas, para mapearlos en el home y mostarlos en el filtro
export function getPlatform () {
    return async function (dispatch){
        const getPlatforms = await axios.get("http://localhost:3001/platform");
        return dispatch({
            type: 'GET_PLATFORM',
            payload: getPlatforms.data
        })
    }
};

// Funcion para filtrar por genero
export function filterVGByGenre(payload){ // se pasa lo que llega desde el componente, el value que va a llegar
    return{
        type: 'FILTER_BY_GENRE',
        payload
        
    }
};

//Funcion para filtrar por VG creados o de API
export function filterCreated(payload){ 
    return{
        type: 'FILTER_CREATED',
        payload
    }
};

//Funcion filtrar por orden
export function filterOrder(payload){ 
    return{
        type: 'FILTER_ORDER',
        payload
    }
};

//Funcion para realizar la busquedad del VG
export function getNameVG(payload){// por payload llega lo que el usuario pasa por ruta 
    return async function (dispatch){
        try {
            var url = await axios.get("http://localhost:3001/videogame?name=" + payload); // 
            return dispatch ({   // Se despacha la accion
                type: 'GET_NAME_VG', 
                payload: url.data  // url.data, busca en el back lo que se le asigna por payload
            })
        } catch (error) {
            console.log(error)
        }
    }
};

//Funcion para crear un VG
export function postVG(payload){
    return async function (dispatch){
        const games = await axios.post('http://localhost:3001/videogame',payload); // En esa ruta hacer el post del payload
        return games;
    }
};

// funcion para entrar al detalle 
export function getDetail (payload) {
    return async function (dispatch) {
        try {
            var url = await axios.get(`http://localhost:3001/videogame/${payload}`);
            return dispatch({
                type: 'GET_DETAIL',
                payload: url.data
            })
        } catch (error) {
            console.log(error);
        }
    }
}
    
