import { Form, Button } from "react-bootstrap";
import { useForm } from "react-hook-form";
import {
  crearJuegoAPI,
  obtenerJuegoAPI,
  editarJuegoAPI,
} from "../../Helpers/queries";
import { useNavigate, useParams } from "react-router";
import { useEffect } from "react";
import { mostrarExito, mostrarError, confirmarEliminacion } from "../../Helpers/alerts";
const FormularioJuego = ({ crearJuego }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm();
  const { id } = useParams();

  const categoriasDisponibles = [
    "Acción",
    "Aventura",
    "Deportes",
    "Estrategia",
    "RPG",
    "Simulación",
    "Terror",
    "Carreras",
  ];

  const navegacion = useNavigate();
  const onSubmit = async (juego) => {
    // Filtrar las categorías seleccionadas
    const categoriasSeleccionadas = Object.entries(juego.categorias)
      .filter(([key, value]) => value)
      .map(([key]) => key);

    if (categoriasSeleccionadas.length === 0) {
      mostrarError("Debe seleccionar al menos una categoría");
      return;
    }

    if (crearJuego === true) {
      // Agrego el array vacío de reseñas por usuario
      const juegoConResenas = {
        ...juego,

        resenasPorUsuario: [],
      };

      const response = await crearJuegoAPI(juegoConResenas);
      if (response.status === 201) {
        mostrarExito("Juego creado correctamente");
        reset();
      } else {
        mostrarError("Error al crear el juego, intente nuevamente");
      }
    } else {
      const response = await editarJuegoAPI(juego, id);
      if (response.status === 200) {
        mostrarExito("Juego editado correctamente");
        navegacion("/administrador");
      } else {
        mostrarError("Error al editar el juego, intente nuevamente");
      }
    }
  };

  useEffect(() => {
    if (crearJuego === false) {
      cargarJuegoEnForm();
    }
  }, []);

  const cargarJuegoEnForm = async () => {
    const response = await obtenerJuegoAPI(id);
    if (response.status === 200) {
      const datos = await response.json();
      console.log(datos);
      setValue("nombreJuego", datos.nombreJuego);
      setValue("precio", datos.precio);
      setValue("imagen", datos.imagen);
      setValue("descripcion", datos.descripcion);
      setValue(
        "requisitos_del_sistema.procesador",
        datos.requisitos_del_sistema.procesador
      );
      setValue(
        "requisitos_del_sistema.memoria",
        datos.requisitos_del_sistema.memoria
      );
      setValue(
        "requisitos_del_sistema.graficos",
        datos.requisitos_del_sistema.graficos
      );
      setValue(
        "requisitos_del_sistema.almacenamiento",
        datos.requisitos_del_sistema.almacenamiento
      );
      setValue("desarrolador", datos.desarrolador);
      setValue("resenas.positivas", datos.resenas.positivas);
      setValue("resenas.negativas", datos.resenas.negativas);

      if (datos.categorias) {
        Object.entries(datos.categorias).forEach(([categoria, valor]) => {
          setValue(`categorias.${categoria}`, valor);
        });
      }
    }
  };

  return (
    <section className="container mainSection text-light">
      <h1 className="display-4 mt-5">Administrar Juegos</h1>
      <hr />
      <Form className="my-4" onSubmit={handleSubmit(onSubmit)}>
        <Form.Group className="mb-3" controlId="formNombreJuego">
          <Form.Label>Juego*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Last of Us"
            {...register("nombreJuego", {
              required: "El nombre del juego es un dato obligatorio",
              minLength: {
                value: 5,
                message: "Debe ingresar como minimo 5 caracteres",
              },
              maxLength: {
                value: 50,
                message: "Debe ingresar como maximo 50 caracteres inclusive",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.nombreJuego?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formPrecio">
          <Form.Label>Precio*</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 50"
            {...register("precio", {
              required: "El precio es un valor obligatorio",
              min: {
                value: "20",
                message: "El precio minimo debe ser de $20 en adelante",
              },
              max: {
                value: "20000",
                message: "El precio maximo debe ser $20000",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.precio?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formImagen">
          <Form.Label>Imagen URL*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: https://www.pexels.com/es-es/vans-en-blanco-y-negro-fuera-de-la-decoracion-para-colgar-en-la-pared-1230679/"
            {...register("imagen", {
              required: "La url de la imagen debe ser obligatoria",
              pattern: {
                value: /(http(s?):)([/|.|\w|\s|-])*\.(?:jpg|jpeg|gif|png)/,
                message:
                  "Debe ingresar una url de imagen valida, los formatos admitidos son (jpg|jpeg|gif|png) ",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.imagen?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formCategoria">
          <Form.Label>Categorías*</Form.Label>
          {categoriasDisponibles.map((categoria) => (
            <Form.Check
              key={categoria}
              type="checkbox"
              id={`categoria-${categoria}`}
              label={categoria}
              value={categoria}
              {...register(`categorias.${categoria}`)}
            />
          ))}
          <Form.Text className="text-danger">
            {errors.categorias?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDescripcion">
          <Form.Label>Descripción*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Un juego frenetico donde hay que escapar de zombies."
            as="textarea"
            {...register("descripcion", {
              required: "La descripcion es ogligatoria",
              minLength: {
                value: 5,
                message:
                  "Debe ingresar como minimo una descripcion de 5 caracteres",
              },
              maxLength: {
                value: 400,
                message:
                  "Debe ingresar como maximo una descripcion de 400 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.descripcion?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formProcesador">
          <Form.Label>Procesador*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Intel I9."
            as="textarea"
            {...register("requisitos_del_sistema.procesador", {
              required: "Especificar el procesador es ogligatorio",
              minLength: {
                value: 5,
                message: "Debe ingresar como minimo una valor de 5 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "Debe ingresar como maximo una descripcion de 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.requisitos_del_sistema?.procesador?.message}
          </Form.Text>
        </Form.Group>
        <Form.Group className="mb-3" controlId="formMemoria">
          <Form.Label>Memoria*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 8 GB RAM"
            as="textarea"
            {...register("requisitos_del_sistema.memoria", {
              required: "Especificar la memoria es obligatorio",
              minLength: {
                value: 5,
                message: "Debe ingresar como mínimo un valor de 5 caracteres",
              },
              maxLength: {
                value: 200,
                message:
                  "Debe ingresar como máximo una descripción de 200 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.requisitos_del_sistema?.memoria?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formGraficos">
          <Form.Label>Gráficos*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: NVIDIA GTX 1650"
            as="textarea"
            {...register("requisitos_del_sistema.graficos", {
              required: "Especificar la tarjeta gráfica es obligatorio",
              minLength: {
                value: 5,
                message: "Debe ingresar como mínimo un valor de 5 caracteres",
              },
              maxLength: {
                value: 200,
                message:
                  "Debe ingresar como máximo una descripción de 200 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.requisitos_del_sistema?.graficos?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formAlmacenamiento">
          <Form.Label>Almacenamiento*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: 20 GB disponibles"
            as="textarea"
            {...register("requisitos_del_sistema.almacenamiento", {
              required: "Especificar el almacenamiento es obligatorio",
              minLength: {
                value: 5,
                message: "Debe ingresar como mínimo un valor de 5 caracteres",
              },
              maxLength: {
                value: 200,
                message:
                  "Debe ingresar como máximo una descripción de 200 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.requisitos_del_sistema?.almacenamiento?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formDesarrolador">
          <Form.Label>Desarrollador*</Form.Label>
          <Form.Control
            type="text"
            placeholder="Ej: Mojang Studios."
            as="textarea"
            {...register("desarrolador", {
              required: "El campo del desarrolador es ogligatorio",
              minLength: {
                value: 5,
                message: "Debe ingresar como minimo un nombre de 5 caracteres",
              },
              maxLength: {
                value: 100,
                message:
                  "Debe ingresar como maximo un nombre de 100 caracteres",
              },
            })}
          />
          <Form.Text className="text-danger">
            {errors.desarrolador?.message}
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formResenasPositivas">
          <Form.Label>Reseñas positivas</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 532"
            {...register("resenas.positivas")}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formResenasNegativas">
          <Form.Label>Reseñas negativas</Form.Label>
          <Form.Control
            type="number"
            placeholder="Ej: 150"
            {...register("resenas.negativas")}
          />
        </Form.Group>

        <Button type="submit" variant="success">
          Guardar
        </Button>
      </Form>
    </section>
  );
};

export default FormularioJuego;
