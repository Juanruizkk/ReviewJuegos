import Swal from "sweetalert2";

export const mostrarExito = (mensaje) => {
  return Swal.fire({
    icon: "success",
    title: "Éxito",
    text: mensaje,
  });
};

export const mostrarError = (mensaje) => {
  return Swal.fire({
    icon: "error",
    title: "Error",
    text: mensaje,
  });
};

export const confirmarEliminacion = (nombre) => {
  return Swal.fire({
    title: `¿Estás seguro de que quieres borrar a ${nombre}?`,
    text: "Esta acción no se puede deshacer",
    icon: "warning",
    showCancelButton: true,
    confirmButtonText: "Sí, eliminar",
    cancelButtonText: "Cancelar",
  });
};