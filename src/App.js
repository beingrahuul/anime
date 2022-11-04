import { BrowserRouter, Route, Routes } from 'react-router-dom';
//Styles
import './App.scss';

//Pages
import Anime from './Pages/Anime/Anime';
import Home from './Pages/Home/Home';
import Login from './Pages/Login/Login';
import Register from './Pages/Register/Register';
import Search from './Pages/Search/Search';
import Video from './Pages/Video/Video';
import Videooo from './Pages/Videooo/Videooo';


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search/:query" element={<Search />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/anime/:anime" element={<Anime />} />
        <Route path="/video/:ep_id" element={<Video />} />
        <Route path="/Videooo/:ep_id" element={<Videooo />} />
      </Routes>  
    </BrowserRouter>
  );
}

export default App;
