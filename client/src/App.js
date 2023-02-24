// BrowserRouter: para poder hacer la navegacion

import {BrowserRouter, Route, Switch} from 'react-router-dom';

// Se importan los componentes pra especificar donde quiero que sean mostrados con la ruta
import Home from './components/Home';
import Detail from './components/Detail';
import VGCreate from './components/VGCreate';
import Navbar from './components/Navbar'

import './App.css'

function App() {
  return ( 
    <BrowserRouter>
    <div className="App">
    <Route path = '/' component={Navbar}/>
    <Switch>                     {/* Se mueve solo de lo que está embolviendo */}
        <Route path = '/home' component={Home} />
        <Route path = '/videogame' component={VGCreate} />
        <Route path = '/:id' component={Detail} />
    </Switch>
    </div>
    </BrowserRouter>
  );
}

export default App;
