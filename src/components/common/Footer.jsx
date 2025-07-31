import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router";
const Footer = () => {
  return (
    <footer className="bg-dark text-white pt-4 pb-2">
      <Container>
        <Row>
          
          <Col md={4} className="mb-3">
            <h5>Sobre nosotros</h5>
            <p>
              Somos una empresa comprometida con la innovación y la calidad.
              Contáctanos para saber más.
            </p>
          </Col>

        
          <Col md={4} className="mb-3">
            <h5>Enlaces útiles</h5>
            <ul className="list-unstyled">
              <li>
                <Link to={"/"} className="text-white text-decoration-none">
                  Inicio
                </Link>
              </li>
              <li>
                <Link to={"/error404"}  className="text-white text-decoration-none">
                  Servicios
                </Link>
              </li>
              <li>
                <Link to={"/AcercaDe"}  className="text-white text-decoration-none">
                  Contacto
                </Link>
              </li>
              <li>
                <Link to={"/error404"}  className="text-white text-decoration-none">
                  Preguntas frecuentes
                </Link>
              </li>
            </ul>
          </Col>

          {/* Columna 3 */}
          <Col md={4} className="mb-3">
            <h5>Redes sociales</h5>
            <Link to="/error404" className="text-white me-2">
              <i className="bi bi-facebook"></i>
            </Link>
            <Link to="/error404" className="text-white me-2">
              <i className="bi bi-twitter"></i>
            </Link>
            <Link to="/error404" className="text-white me-2">
              <i className="bi bi-instagram"></i>
            </Link>
            <Link to="/error404" className="text-white">
              <i className="bi bi-linkedin"></i>
            </Link>
          </Col>
        </Row>
        <hr className="bg-white" />
        <div className="text-center">
          <p className="mb-0">
            &copy; 2025 ZonaJuegos. Todos los derechos reservados.
          </p>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
