export const loginAPI = async (usuario) => {
  try {
    const response = await fetch(`http://localhost:3000/users`);
    if (!response.ok) {
      throw new Error("Error al obtener los usuarios");
    }
    const data = await response.json();

    const usuarioEncontrado = data.find(
      (user) =>
        user.email === usuario.email && user.password === usuario.password
    );

    if (usuarioEncontrado) {
      delete usuarioEncontrado.password;
      return usuarioEncontrado;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return null;
  }
};
export const crearUsuarioAPI = async (nuevoUsuario) => {
  try {
    const response = await fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(nuevoUsuario),
    });
    return response;
  } catch (error) {
    console.error("Error al crear el usuario:", error);
    throw error;
    return false;
  }
};

export const listarUsuariosAPI = async () => {
  try {
    const response = await fetch("http://localhost:3000/users");
    return response;
  } catch (error) {
    console.error("Error al listar los usuarios:", error);
    return false;
  }
};

export const borrarUsuarioAPI = async (id) => {
  try {
    const response = await fetch(`http://localhost:3000/users/${id}`, {
      method: "DELETE",
    });
    return response;
  } catch (error) {
    console.error("Error al eliminar el usuario:", error);
    return false;
  }
};
