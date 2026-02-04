import Entrance from './components/Entrance'
import { BrowserRouter, Routes, Route } from "react-router";
import Pokelist from './components/Pokelist';
import PokeDetails from './components/PokeDetails';

function App() {


  return (
    <>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Entrance />} />
            <Route path="/list" element={<Pokelist/>} />
            <Route path="/pokemon/:id" element = {<PokeDetails/>}></Route>
          </Routes>
      </BrowserRouter>  
    </>
  )
}

export default App
