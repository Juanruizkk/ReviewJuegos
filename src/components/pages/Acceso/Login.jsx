import { useForm } from "react-hook-form";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { Link } from "react-router";
import { mostrarError, mostrarExito } from "../../Helpers/alerts";
import { UserContext } from "../../../context/UserContext";
import { useContext } from "react";
const Login = () => {
  const {loginUsuario} = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navegacion = useNavigate();
  const onSubmit = async (usuario) => {
    const usuarioEncontrado = await loginUsuario(usuario);
    if (usuarioEncontrado) {
      mostrarExito("Bienvenido " + usuarioEncontrado.email);
      if (usuarioEncontrado.rol === "admin") {
        navegacion("/administrador");
      } else {
        navegacion("/");
      }
    } else {
      mostrarError("El usuario o la contraseña son incorrectos");
    }
  };
  return (
    <section className="mainSection d-flex justify-content-center align-items-center"
    /* style={{ minHeight: "80vh" }} */>
      <Container className="w-75">
        <Row>
          <Card className="bg-dark text-light">
            <Card.Body>
              <div className="justify-content-center d-flex">
                <Card.Title>Login</Card.Title>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ejemplo@gmail.com"
                    className="bg-dark text-light border-secondary"
                    {...register("email", {
                      required: "El mail es un dato obligatorio",
                      minLength: {
                        value: 11,
                        message: "Debe ingresar como minimo 11 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe ingresar como maximo 50 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.email?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-4" controlId="formGroupPassword">
                  <Form.Label>Contraseña</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Ejemplo123"
                    className="bg-dark text-light border-secondary"
                    {...register("password", {
                      required: "La contraseña es un campo obligatorio",
                      minLength: {
                        value: 8,
                        message: "Debe ingresar como minimo 8 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message: "Debe ingresar como maximo 20 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <div className="justify-content-center d-flex">
                  <Button type="submir" variant="success">
                    Enviar
                  </Button>
                </div>

                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <span className="me-2">¿No tenés una cuenta?</span>
                  <Link className="text-primary fw-bold text-decoration-none" to={"/register"}>
                    Registrate
                  </Link>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Row>
      </Container>
    </section>
  );
};

export default Login;
