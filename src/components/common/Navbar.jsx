import {
  Button,
  Container,
  Form,
  Nav,
  Navbar,
  NavDropdown,
} from "react-bootstrap";
import { NavLink, Link } from "react-router";
import { useNavigate } from "react-router";
import { useLocation } from "react-router";
import logo from "../../assets/logo.png";
import { UserContext } from "../../context/UserContext";
import { useContext } from "react";

const NavBar = ({ search, setSearch }) => {
  const {usuarioLogueado, logoutUsuario} =useContext(UserContext);
  const navegacion = useNavigate();
  

  const location = useLocation();

  const isHome = location.pathname === "/";

  const handleLogout = () => {
    logoutUsuario();
    navegacion("/");
  }

  return (
    <Navbar expand="lg" className="bg-dark ">
      <Container>
        <Link to={"/"} className="navbar-brand">
          <img src={logo} alt="logo Juegos" className="img-fluid" width={60} />
        </Link>
        {isHome && (
          <Form className="d-flex ms-auto ">
            <Form.Control
              type="text"
              placeholder="Buscar juego..."
              value={search}
              className="bg-dark text-light border-secondary"
              onChange={(e) => setSearch(e.target.value)}
            />
          </Form>
        )}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink end className="nav-link text-light" to={"/"}>
              Inicio
            </NavLink>
            {usuarioLogueado && usuarioLogueado.rol === "admin" ? (
              <>
                <NavDropdown
                  title="Administrador"
                  id="basic-nav-dropdown"
                  
                >
                  <NavDropdown.Item as={NavLink} to="/administrador/">
                    Juegos
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/administrador/usuarios">
                    Usuarios
                  </NavDropdown.Item>
                  <NavDropdown.Item as={NavLink} to="/administrador/carousel">
                    Carousel
                  </NavDropdown.Item>
                </NavDropdown>
                <Button
                  variant="link"
                  className="nav-link text-light text-start p-0"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
              </>
            ) : usuarioLogueado && usuarioLogueado.rol === "invitado" ? (
              <Button
                variant="link"
                className="nav-link text-light text-start p-0"
                onClick={handleLogout}
              >
                Logout
              </Button>
            ) : (
              <NavLink end className="nav-link text-light" to={"/login"}>
                Login
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavBar;
