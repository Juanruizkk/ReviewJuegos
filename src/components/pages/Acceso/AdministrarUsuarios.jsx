import { useForm } from "react-hook-form";
import { Table } from "react-bootstrap";
import { useEffect, useState } from "react";
import { listarJuegosAPI } from "../../Helpers/queries";
import { listarUsuariosAPI } from "../../Helpers/AccesoQueries";
import ItemUsuario from "./ItemUsuario";
const AdministrarUsuarios = () => {
  const [listaUsuarios, setListaUsuarios] = useState([]);
  const [listaJuegos, setListaJuegos] = useState([]);

  useEffect(() => {
    consultarUsuariosAPI();
    consultarJuegosAPI();
  }, []);

  const consultarUsuariosAPI = async () => {
    const response = await listarUsuariosAPI();
    if (response.status === 200) {
      const data = await response.json();
      setListaUsuarios(data);
    }
  };

  const consultarJuegosAPI = async () => {
    const response = await listarJuegosAPI();
    if (response.status === 200) {
      const data = await response.json();
      setListaJuegos(data);
    }
  };
 

  return (
    <>
      <section className="container mainSection">
        <h1 className="display-6 mt-5 text-light">Todos los usuarios:</h1>
        <hr />
        <Table responsive striped bordered hover className='table-dark'>
          <thead>
            <tr className="text-center">
              <th>Id</th>
              <th>Nombre</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Reseñas</th>
              <th>Opciones</th>
            </tr>
          </thead>
          <tbody>
            {listaUsuarios.map((user) => (
              <ItemUsuario
                key={user.id}
                user={user}
                setListaUsuarios={setListaUsuarios}
                listaJuegos={listaJuegos}
                consultarJuegosAPI={consultarJuegosAPI}
              ></ItemUsuario>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default AdministrarUsuarios;
