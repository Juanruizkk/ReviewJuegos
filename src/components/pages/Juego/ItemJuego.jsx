import { Button } from "react-bootstrap";
import { Link } from "react-router";
import { borrarJuegoAPI, listarJuegosAPI } from "../../Helpers/queries";
import { mostrarError, mostrarExito,confirmarEliminacion } from "../../Helpers/alerts";
const ItemJuego = ({ juego, setListaJuegos }) => {
  const borrarJuego = async () => {
    const confirmacion = await confirmarEliminacion(juego.nombreJuego);

    if (!confirmacion.isConfirmed) return;
    try {
      const respuesta = await borrarJuegoAPI(juego.id);
      if (respuesta.status === 200) {
        const respuestaListaJuegos = await listarJuegosAPI();
        if (respuestaListaJuegos.status === 200) {
          //actualizar la tabla
          const datos = await respuestaListaJuegos.json();
          setListaJuegos(datos);
        }
        mostrarExito("El producto fue eliminado correctamente.");
      }
    } catch (error) {
      mostrarError("Ocurrió un error al intentar eliminar el juego.");
      console.error(error);
      return;
    }
  };
  return (
    <tr>
      <td className="text-center">{juego.id}</td>
      <td>{juego.nombreJuego}</td>
      <td className="text-end">${juego.precio}</td>
      <td>
        {" "}
        <ul>
          {Object.keys(juego.categorias).map((categoria, index) =>
            juego.categorias[categoria] ? (
              <li key={index}>{categoria}</li>
            ) : null
          )}
        </ul>
      </td>
      <td className="text-center">
        <img src={juego.imagen} className="img-thumbnail" alt="Nombre"></img>
      </td>
      <td>{juego.descripcion}</td>
      <td>
        <ul>
          <li>
            Procesador: {juego.requisitos_del_sistema?.procesador || "N/A"}
          </li>
          <li>Memoria: {juego.requisitos_del_sistema?.memoria || "N/A"}</li>
          <li>Gráficos: {juego.requisitos_del_sistema?.graficos || "N/A"}</li>
          <li>
            Almacenamiento:{" "}
            {juego.requisitos_del_sistema?.almacenamiento || "N/A"}
          </li>
        </ul>
      </td>
      <td>{juego.desarrolador}</td>
      <td>
        <ul>
          <li>{juego.resenas?.positivas}</li>
          <li>{juego.resenas?.negativas}</li>
        </ul>
      </td>
      <td className="d-flex flex-columns justify-content-center">
        <Link
          className="btn btn-warning me-lg-2"
          to={`/administrador/editar/${juego.id}`}
        >
          <i className="bi bi-pencil-square"></i>
        </Link>
        <Button variant="danger" onClick={borrarJuego}>
          <i className="bi bi-trash"></i>
        </Button>
      </td>
    </tr>
  );
};

export default ItemJuego;
