import { useForm } from "react-hook-form";
import { Button, Card, Container, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router";
import { crearUsuarioAPI } from "../../Helpers/AccesoQueries";
import { Link } from "react-router";
import { mostrarExito, mostrarError } from "../../Helpers/alerts";
const Registro = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (usuario) => {
    console.log('registrar usuario')
    usuario.rol = "invitado";
    const response = await crearUsuarioAPI(usuario);
    if (response.status === 201) {
      mostrarExito("Usuario registrado correctamente");
      reset();
      navigate("/login");
    } else {
      mostrarError("Error al registrar el usuario, intente nuevamente");
    }
  };

  return (
    <section className="mainSection align-content-center">
      <Container className="w-75">
        <Row className="justify-content-center">
          <Card className="bg-dark text-light">
            <Card.Body>
              <div className="justify-content-center d-flex">
                <Card.Title>Registro</Card.Title>
              </div>
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="formGroupNombre">
                  <Form.Label>Nombre</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Ejemplo: Juan Pérez"
                    className="bg-dark text-light border-secondary"
                    {...register("nombre", {
                      required: "El nombre es obligatorio",
                      minLength: {
                        value: 3,
                        message: "Debe ingresar al menos 3 caracteres",
                      },
                      maxLength: {
                        value: 50,
                        message: "Debe ingresar como máximo 50 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.nombre?.message}
                  </Form.Text>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <Form.Label>Correo Electrónico</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="Ejemplo@gmail.com"
                    className="bg-dark text-light border-secondary"
                    {...register("email", {
                      required: "El correo electrónico es obligatorio",
                      pattern: {
                        value: /^[^@]+@[^@]+\.[a-zA-Z]{2,}$/,
                        message: "Debe ingresar un correo válido",
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
                      required: "La contraseña es obligatoria",
                      minLength: {
                        value: 8,
                        message: "Debe ingresar al menos 8 caracteres",
                      },
                      maxLength: {
                        value: 20,
                        message: "Debe ingresar como máximo 20 caracteres",
                      },
                    })}
                  />
                  <Form.Text className="text-danger">
                    {errors.password?.message}
                  </Form.Text>
                </Form.Group>
                <div className="justify-content-center d-flex">
                  <Button type="submit" variant="success">
                    Registrarse
                  </Button>
                </div>
                <div className="d-flex flex-column justify-content-center align-items-center mt-3">
                  <span className="me-2">¿Ya tenes una cuenta?</span>
                  <Link className="text-primary fw-bold text-decoration-none" to={"/login"}>
                    Logearse
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

export default Registro;