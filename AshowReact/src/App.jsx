import { BrowserRouter, Routes, Route } from "react-router-dom";

//Components
import Login from "./pages/Login/Login.jsx"
import Home from "./pages/Home/Home.jsx"
import CadastroUsuario from "./pages/CadastroUsuario/CadastroUsuario.jsx"
import Listagem from "./pages/Listagem/Listagem.jsx";

//CSS
import './App.css'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/home' element={<Home />} />
        <Route path='/cadastro' element={<CadastroUsuario />} />
        <Route path='/listagem' element={<Listagem />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
