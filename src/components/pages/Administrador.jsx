import {Table} from 'react-bootstrap';
import { Link } from 'react-router';
import { useState,useEffect } from 'react';
import { listarJuegosAPI } from '../Helpers/queries';
import ItemJuego from './Juego/ItemJuego';
const Administrador = () => {

    const [listaJuegos, setListaJuegos] = useState([]);

    useEffect(() => {
      consultarAPI();
    },[])

    const consultarAPI = async() =>{
      const response = await listarJuegosAPI();
      if (response.status === 200) {
        const data = await response.json();
        setListaJuegos(data);
      }
    }

    return ( 
        <section className="container mainSection">
      <div className="d-flex justify-content-between align-items-center mt-5">
        <h1 className="display-4 text-light">Juegos disponibles</h1>
        <Link className="btn btn-primary" to={"/administrador/crear"}>
          <i className="bi bi-file-earmark-plus"></i>
        </Link>
      </div>
      <hr />
      <Table responsive striped className='table-dark'>
        <thead >
          <tr className="text-center">
            <th>Id</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Categoria</th>
            <th>URL de Imagen</th>
            <th>Descripcion</th>
            <th>Requisitos del sistema</th>
            <th>Desarrollador</th>
            <th>Reviews</th>
            <th>Opciones</th>
          </tr>
        </thead>
        <tbody>
          
         {
            listaJuegos.map((juego) => (
              <ItemJuego key={juego.id} juego={juego} setListaJuegos={setListaJuegos}></ItemJuego>
            ))
          }
          
        </tbody>
      </Table>
    </section>
     );
}
 
export default Administrador;