import { use } from "react";
import { listarJuegosAPI } from "../Helpers/queries";
import CardGame from "./Juego/CardJuego/CardGame";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import CarrouselInicio from "./CarouselInicio/CarrouselInicio";

const Inicio = ({ search }) => {
  const [listaJuegosInicio, setListaJuegosInicio] = useState([]);

  useEffect(() => {
    consultarAPI();
  }, []);

  const consultarAPI = async () => {
    const respuesta = await listarJuegosAPI();
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setListaJuegosInicio(datos);
    } else {
      alert("Ocurrio un error, intenta esta operacion en unos minutos");
    }
  };

  const juegosFiltrados = listaJuegosInicio.filter((juego) => {
    const filtro = search.toLowerCase();
    const busquedaPorNombre = juego.nombreJuego.toLowerCase().includes(filtro);
    const busquedaPorCategoria = juego.categorias
      ? Object.keys(juego.categorias)
          .filter((cat) => juego.categorias[cat])
          .some((cat) => cat.toLowerCase().includes(filtro))
      : false;
    return busquedaPorNombre || busquedaPorCategoria;
  });

  return (
    <section className="mainSection">
      {/* <img
        className="banner"
        src="https://images.pexels.com/photos/13591748/pexels-photo-13591748.jpeg"
        alt="fondo cafe"
      /> */}
      <CarrouselInicio />

      <Container className="mt-5 ">
        <Row>
          <Col md={8}>
            <h1 className="display-4 text-light">
              {search.trim() === "" ? (
                "Nuestros Juegos"
              ) : (
                <>
                  Resultados para:&nbsp;
                  <span className="fw-light text-info">"{search}"</span>
                </>
              )}
            </h1>
          </Col>
        </Row>

        <hr />

        <Row className="justify-content-center">
          {juegosFiltrados.length > 0 ? (
            juegosFiltrados.map((juego) => (
              <CardGame key={juego.id} juego={juego} />
            ))
          ) : (
            <Col>
              <p className="text-center mt-4">
                No se encontraron juegos que coincidan con tu búsqueda.
              </p>
            </Col>
          )}
        </Row>
      </Container>
    </section>
  );
};

export default Inicio;
