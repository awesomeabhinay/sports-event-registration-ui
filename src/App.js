import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';

import HomePage from './pages/HomePage';
import Events from './pages/Events';
import User from './pages/User';
import NotFound from './pages/NotFound';
import NavBar from './NavBar';
import Login from './pages/Login';
import Signup from './pages/Signup';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <NavBar></NavBar>
        <div id="body-page">
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/events' element={<Events />} />
            <Route path='/user' element={<User />} />
            <Route path='/login' element={<Login />} />
            <Route path='/signup' element={<Signup />} />
            <Route path='/notfound' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
