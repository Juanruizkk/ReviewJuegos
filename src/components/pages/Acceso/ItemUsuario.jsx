import { Button } from "react-bootstrap";
import Swal from 'sweetalert2';
import { borrarUsuarioAPI, listarUsuariosAPI } from "../../Helpers/AccesoQueries";
import { editarJuegoAPI, eliminarResenaDeJuego } from "../../Helpers/queries";
import { mostrarError, mostrarExito, confirmarEliminacion } from "../../Helpers/alerts";
const ItemUsuario = ({ user, setListaUsuarios, listaJuegos, consultarJuegosAPI }) => {

      const borrarUsuario = async () => {
        if (user.rol === 'admin') {
            await mostrarError('No puedes eliminar un usuario administrador.');
            return;
        }
        const confirmacion = await confirmarEliminacion(user.nombre);
      
        if (!confirmacion.isConfirmed) return;
      
        try {
          const response = await borrarUsuarioAPI(user.id);
      
          if (response.status === 200) {
            const respuestaListaUsuarios = await listarUsuariosAPI();
      
            if (respuestaListaUsuarios.status === 200) {
              const datos = await respuestaListaUsuarios.json();
              setListaUsuarios(datos);
              await mostrarExito('El usuario fue eliminado correctamente.');
            } else {
              throw new Error("Error al actualizar la lista.");
            }
          } else {
            throw new Error("Error al eliminar el usuario.");
          }
      
        } catch (error) {
          await mostrarError('Ocurrió un error. Intenta nuevamente más tarde.');
          console.error(error);
        }
      };
      // Obtener reseñas de un usuario
       const obtenerResenasUsuario = (email) => {
    let resenas = [];
    listaJuegos.forEach((juego) => {
      if (juego.resenasPorUsuario) {
        juego.resenasPorUsuario.forEach((r) => {
          if (r.email === email) {
            resenas.push({
              juegoId: juego.id,
              nombreJuego: juego.nombreJuego,
              voto: r.voto,
              descripcion: r.descripcion,
            });
          }
        });
      }
    });
    return resenas;
  };
  const resenas = obtenerResenasUsuario(user.email);

  // Eliminar reseña de un usuario en un juego específico
  const handleEliminarResena = async (juegoId, email) => {
    const juego = listaJuegos.find((j) => j.id === juegoId);
    if (!juego) return;
    const juegoActualizado = eliminarResenaDeJuego(juego, email);
    await editarJuegoAPI(juegoActualizado, juegoId);
    consultarJuegosAPI();
    mostrarExito('La reseña fue eliminada correctamente.');
  };

  

  return (
    <tr>
      <td className="text-center">{user.id}</td>
      <td className="text-center">{user.nombre}</td>
      <td className="text-center">{user.email}</td>

      <td className="text-center">
        {user.rol === "admin" ? (
          <i
            className="bi bi-person-check-fill"
            title="Administrador"
            aria-label="Administrador"
          ></i>
        ) : (
          <i
            className="bi bi-person"
            title="Invitado"
            aria-label="Invitado"
          ></i>
        )}
      </td>
      <td> 
        {resenas.length === 0
          ? <span className="text-light">Sin reseñas</span>
          : (
            <ul className="mb-0">
              {resenas.map((resena, idx) => (
                <li key={idx} className="d-flex justify-content-between my-1">
                  <strong>{resena.nombreJuego}</strong> ({resena.voto}): {resena.descripcion}
                  <Button
                    variant="danger"
                    size="sm"
                    className="ms-2"
                    onClick={() => handleEliminarResena(resena.juegoId, user.email)}
                  >
                    Eliminar
                  </Button>
                </li>
              ))}
            </ul>
          )
        }
      </td>
      <td className="d-flex flex-columns justify-content-center">
        <Button variant="danger" onClick={borrarUsuario}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemUsuario;
