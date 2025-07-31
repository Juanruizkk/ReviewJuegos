import { createContext, useState } from "react";
import { loginAPI } from "../components/Helpers/AccesoQueries";



export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const usuarioInicial = JSON.parse(sessionStorage.getItem("userKey")) || null;
  const [usuarioLogueado, setUsuarioLogueado] = useState(usuarioInicial);

  

  const loginUsuario = async (credenciales) => {
    const usuario = await loginAPI(credenciales);
    if (usuario) {
      setUsuarioLogueado(usuario);
      sessionStorage.setItem("userKey", JSON.stringify(usuario));
      return usuario;
    }
    return null;
  };

  const logoutUsuario = () => {
    sessionStorage.removeItem("userKey");
    setUsuarioLogueado("");
    
  };

  return (
    <UserContext.Provider
      value={{ usuarioLogueado, loginUsuario, logoutUsuario }}
    >
      {children}
    </UserContext.Provider>
  );
};
