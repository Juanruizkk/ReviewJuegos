import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { BrowserRouter, Routes, Route } from "react-router";
import NavBar from "./components/common/Navbar";
import Inicio from "./components/pages/Inicio";

import "./App.css";
import Error404 from "./components/pages/Error404";

import Login from "./components/pages/Acceso/Login";
import Registro from "./components/pages/Acceso/Registro";

import { useState } from "react";
import RutasAdmin from "./components/routes/RutasAdmin";
import ProtectorRutas from "./components/routes/ProtectorRutas";
import DetalleJuego from "./components/pages/Juego/DetalleJuego";
import Footer from "./components/common/Footer";
import AcercaDeNosotros from "./components/pages/AcercaDeNosotros/AcercaDeNosotros";
function App() {
  const [search, setSearch] = useState("");

  return (
    <>
      <BrowserRouter>
        <NavBar
          search={search}
          setSearch={setSearch}
        />
        <Routes>
          <Route path="/" element={<Inicio search={search} />} />

          <Route
            path="/detalle-juego/:id"
            element={<DetalleJuego />}
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Registro />} />
          <Route path="/acercaDe" element={<AcercaDeNosotros />} />

          <Route
            path="/administrador/*"
            element={
              <ProtectorRutas>
                <RutasAdmin />
              </ProtectorRutas>
            }
          />

          <Route path="*" element={<Error404 />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
