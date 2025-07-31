import { useContext } from "react";
import {Navigate} from "react-router";
import { UserContext } from "../../context/UserContext";
const ProtectorRutas = ({children}) => {
    const {usuarioLogueado} = useContext(UserContext)
    
    if (!usuarioLogueado) {
        return <Navigate to={"/login"} />;
    } else if (usuarioLogueado.rol !== "admin") {
        return <Navigate to={"/"} />;
    } else{
        // si soy admin, muestro el contenido
        return children;
    }
}
 
export default ProtectorRutas;