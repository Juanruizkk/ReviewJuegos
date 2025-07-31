import { Route, Routes } from "react-router";
import Administrador from "../pages/Administrador";
import FormularioJuego from "../pages/Juego/FormularioJuego";
import AdministrarUsuarios from "../pages/Acceso/AdministrarUsuarios";
import AdministrarCarrousel from "../pages/CarouselInicio/AdministrarCarrousel";

const RutasAdmin = () => {
    return ( 
        <Routes>
        <Route path='/' element={<Administrador />} />
       <Route path='/crear' element={<FormularioJuego crearJuego={true}/>} />
       <Route path='/editar/:id' element={<FormularioJuego crearJuego={false}/>} />
       <Route path='/usuarios' element={<AdministrarUsuarios/>} />
       <Route path='/carousel' element={<AdministrarCarrousel/>} />
       </Routes>
     );
}
 
export default RutasAdmin;