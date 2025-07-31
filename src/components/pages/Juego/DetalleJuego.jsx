import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import {
  obtenerJuegoAPI,
  editarJuegoAPI,
  eliminarResenaDeJuego,
} from "../../Helpers/queries";
import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { UserContext } from "../../../context/UserContext";

const DetalleJuego = () => {
  const { usuarioLogueado } = useContext(UserContext);
  const [juego, setJuego] = useState({});
  const { id } = useParams();

  const [yaResenado, setYaResenado] = useState(false);
  const { register, handleSubmit, reset } = useForm();

  useEffect(() => {
    obtenerJuego();
  }, []);

  const obtenerJuego = async () => {
    const respuesta = await obtenerJuegoAPI(id);
    if (respuesta.status === 200) {
      const datos = await respuesta.json();
      setJuego(datos);
    } else {
      alert("Ocurrio un error intente este paso en unos minutos");
    }
  };

  useEffect(() => {
    if (
      usuarioLogueado &&
      usuarioLogueado.rol === "invitado" &&
      juego.resenasPorUsuario
    ) {
      const existe = juego.resenasPorUsuario.some(
        (r) => r.email === usuarioLogueado.email
      );
      setYaResenado(existe);
    }
  }, [juego, usuarioLogueado]);

  const onSubmitResena = async (data) => {
    const nuevasResenas = [
      ...(juego.resenasPorUsuario || []),
      {
        email: usuarioLogueado.email,
        descripcion: data.descripcion,
        voto: data.voto,
      },
    ];
    const resenasActualizadas = {
      positivas: Number(juego.resenas?.positivas || 0),
      negativas: Number(juego.resenas?.negativas || 0),
    };

    if (data.voto === "positivo") {
      resenasActualizadas.positivas += 1;
    } else if (data.voto === "negativo") {
      resenasActualizadas.negativas += 1;
    }
    const juegoActualizado = {
      ...juego,
      resenasPorUsuario: nuevasResenas,
      resenas: resenasActualizadas,
    };

    await editarJuegoAPI(juegoActualizado, juego.id);
    obtenerJuego();
    reset();
    setYaResenado(true);
  };

  const handleBorrarResena = async (email) => {
    const juegoActualizado = eliminarResenaDeJuego(juego, email);
    await editarJuegoAPI(juegoActualizado, juego.id);
    obtenerJuego();
    setYaResenado(false);
  };

  return (
    <Container className="my-5 bg-secondary text-light rounded">
      <Row>
        <Col xs={12} className="my-4">
          <h1 className="text-center">{juego.nombreJuego}</h1>
        </Col>
      </Row>

      <Row>
        <Col md={6} className="mb-4 container-imagen">
          <Card className="border-0 bg-transparent ">
            <Card.Img
              variant="top"
              src={juego.imagen}
              alt={juego.nombreJuego}
              className="img-fluid rounded img-detalle"
            />
          </Card>
        </Col>

        <Col md={6}>
          <ListGroup variant="flush" className="p-3 rounded shadow">
            <ListGroup.Item className="d-flex align-items-center bg-secondary border-0">
              <div className="me-3">
                <i className="bi bi-steam fs-2"></i>
              </div>
              <div>
                <div className="text-muted">Plataforma:</div>
                <div className="fw-bold">Steam</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center bg-secondary border-0">
              <div className="me-3">
                <i className="bi bi-check-circle fs-2"></i>
              </div>
              <div>
                <div className="text-muted">Se puede activar en:</div>
                <div className="fw-bold">Argentina</div>
              </div>
            </ListGroup.Item>
            <ListGroup.Item className="d-flex align-items-center bg-secondary  border-0">
              <div className="me-3 fs-2">
                <i className="bi bi-globe"></i>
              </div>
              <div>
                <div className="text-muted">Región:</div>
                <div className="fw-bold">GLOBAL</div>
              </div>
            </ListGroup.Item>
          </ListGroup>

          <div className="mt-5 p-3 rounded shadow text-dark">
            <h2 className="fs-2 mb-4 border-bottom border-dark pb-2">
              Acerca de este producto:
            </h2>
            <div className="fs-4 ">
              <strong>Precio:</strong> ${juego.precio}
            </div>
            <div className="fs-5 mb-3">{juego.descripcion}</div>
            <div className="fs-5">
              <strong>Desarrollador:</strong> {juego.desarrolador}
            </div>
          </div>
        </Col>
      </Row>
      <Row>
        <Col md={6}>
          <div className="mt-4 p-3 rounded shadow text-dark">
            <h5 className="fw-bold mb-2 text-dark ">Requisitos del sistema:</h5>
            <ListGroup>
              <ListGroup.Item className=" p-2 bg-secondary border-0">
                <strong>Procesador:</strong>{" "}
                {juego.requisitos_del_sistema?.procesador}
              </ListGroup.Item>
              <ListGroup.Item className="p-2 bg-secondary border-0">
                <strong>Memoria:</strong>{" "}
                {juego.requisitos_del_sistema?.memoria}
              </ListGroup.Item>
              <ListGroup.Item className="p-2 bg-secondary border-0">
                <strong>Gráficos:</strong>{" "}
                {juego.requisitos_del_sistema?.graficos}
              </ListGroup.Item>
              <ListGroup.Item className="p-2 bg-secondary border-0">
                <strong>Almacenamiento:</strong>{" "}
                {juego.requisitos_del_sistema?.almacenamiento}
              </ListGroup.Item>
            </ListGroup>
          </div>
        </Col>
        <Col md={6} className="mb-4">
          
            <div className="mt-4 p-3 rounded shadow text-dark">
              <h5 className="fw-bold mb-2">Reseñas:</h5>
              <ListGroup variant="flush">
                <ListGroup.Item className="p-2 bg-secondary border-0">
                  <strong>Positivas:</strong> {juego.resenas?.positivas}
                </ListGroup.Item>
                <ListGroup.Item className="p-2 bg-secondary border-0">
                  <strong>Negativas:</strong> {juego.resenas?.negativas}
                </ListGroup.Item>
              </ListGroup>

              <div className="mt-3">
                <h6>Reseñas de usuarios:</h6>
                {juego.resenasPorUsuario &&
                juego.resenasPorUsuario.length > 0 ? (
                  juego.resenasPorUsuario.map((r, idx) => (
                    <div key={idx} className="mb-2 p-2">
                      <div className="d-flex justify-content-between">
                        <strong>{r.email}</strong> ({r.voto})
                        {usuarioLogueado &&
                          usuarioLogueado.rol === "invitado" &&
                          r.email === usuarioLogueado.email && (
                            <Button
                              className="btn btn-sm btn-danger"
                              onClick={() => handleBorrarResena(r.email)}
                            >
                              Eliminar
                            </Button>
                          )}
                      </div>
                      <div>{r.descripcion}</div>
                    </div>
                  ))
                ) : (
                  <div className="text-muted">No hay reseñas de usuarios.</div>
                )}
              </div>

              {usuarioLogueado &&
                usuarioLogueado.rol === "invitado" &&
                !yaResenado && (
                  <form
                    onSubmit={handleSubmit(onSubmitResena)}
                    className="mt-3"
                  >
                    <textarea
                      className="form-control mb-2 bg-secondary text-light"
                      placeholder="Escribe tu reseña..."
                      {...register("descripcion", { required: true })}
                    />
                    <select
                      className="form-select mb-2 bg-secondary text-light"
                      {...register("voto", { required: true })}
                    >
                      <option value="">Selecciona tu voto</option>
                      <option value="positivo">Positivo</option>
                      <option value="negativo">Negativo</option>
                    </select>
                    <button className="btn btn-primary" type="submit">
                      Enviar reseña
                    </button>
                  </form>
                )}
              {yaResenado && (
                <div className="alert alert-info mt-3">
                  Ya has dejado una reseña para este juego.
                </div>
              )}
            </div>
          
        </Col>
      </Row>
    </Container>
  );
};

export default DetalleJuego;
