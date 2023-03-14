 
// Se crea un bjeto para los estados iniciales
const initialState = {
    videoGames : [],   
    genre : [],
    allVideoGames:[],
    platform : [],
    detail: [],
    stars:[],

}

function rootReducer (state = initialState, action){
    switch(action.type) {
        case 'GET_VG':
            return {
                ...state,                 /* Retorna una copia del estado */
                videoGames: action.payload,  /* en el estado vacio guarda todo lo que se manda desde action por payload */
                allVideoGames: action.payload
            };
        case 'GET_GENRE':
            return {
                ...state,
                genre: action.payload,
            };
        case 'GET_PLATFORM':
            return {
                ...state,
                platform : action.payload
            };
        case 'FILTER_BY_GENRE':
            const allGenres = state.allVideoGames
            const genreFiltered = action.payload === 'All' ? allGenres : allGenres.filter((ev) => ev.genres2.includes(action.payload))
            // || (ev.createdInDB && ev.genres.map((ev) => ev.name).includes(action.payload)))
            return {
                ...state,
                videoGames: genreFiltered
            }; 
        case 'FILTER_CREATED':
             const createdFilter = action.payload === 'Created' ? state.allVideoGames.filter((ev) => ev.createdInDB) : state.allVideoGames.filter((ev) => !ev.createdInDB)
             return {
                 ...state,
                 videoGames: action.payload === 'All' ? state.allVideoGames : createdFilter
            };
        case 'FILTER_ORDER':
            let sortedArr = action.payload === 'Asc' ?
            state.videoGames.sort(function (a,b) {
                if(a.name > b.name) {  
                    return 1;          // si a > b los retorna en esa posicion
                }if(a.name < b.name){
                    return -1;         // sino la cambia
                };
                return 0               // sino los deja así
            }) :
            action.payload === 'Des' ? 
            state.videoGames.sort(function (a,b){
                if(a.name > b.name) {
                    return -1;
                }if(a.name < b.name){
                    return 1;
                };
                return 0
            }) :
            action.payload === '+rating' ? 
            state.videoGames.sort(function (a,b){
                if(a.rating > b.rating) {
                    return -1;
                }if(a.rating < b.rating){
                    return 1;
                };
                return 0
            }) :
            state.videoGames.sort(function (a,b){
                if(a.rating > b.rating) {
                    return 1;
                }if(a.rating < b.rating){
                    return -1;
                };
                return 0
            });
            return {
                ...state,
                videoGames: sortedArr
            }
        case 'POST_VG':
            return {
                ...state
            };
        case 'POST_LOG':
            return {
                ...state
            };
        case 'GET_NAME_VG':
            return {
                ...state,
                videoGames: action.payload
            };
        case 'GET_DETAIL':
            return {
                ...state,
                detail: action.payload 
            };
        case 'STARS_PROM':
            return{
                ...state,
                stars: [...state.stars,action.payload],
            };
        case 'PUNTUATION':
            return{
                ...state,
                puntuation:[...state.puntuation,action.payload]
            }
        default:
            return {...state};
    }
}
 
export default rootReducer;  // Se exporta para que lo agarre el store