export const crearJuegoAPI = async (nuevoJuego) => {
    try {
        const response = await fetch("http://localhost:3000/juegos", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoJuego),
        });
        return response;
    } catch (error) {
        console.error("Error al crear el juego:", error);
        throw error; 
        return false;
    }
}

export const listarJuegosAPI = async()=>{
    try {
        const respuesta = await fetch('http://localhost:3000/juegos')
        return respuesta;
    } catch (error) {
        console.error(error)
        return false
    }
}


export const borrarJuegoAPI = async(id)=>{
    try {
        const respuesta = await fetch('http://localhost:3000/juegos/'+id,{
            method:"DELETE"
        })
        console.log(respuesta)
        return respuesta;
    } catch (error) {
        console.error(error)
        return false
    }
}

export const editarJuegoAPI = async(juegoEditado, id)=>{
    try {
        const respuesta = await fetch('http://localhost:3000/juegos/'+id,{
            method:"PUT",
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify(juegoEditado)
        })
        return respuesta;
    } catch (error) {
        console.error(error)
        return false
    }
}

export const obtenerJuegoAPI = async(id)=>{
    try {
        const respuesta = await fetch('http://localhost:3000/juegos/'+id)
        return respuesta;
    } catch (error) { 
        console.error(error)
        return false
    }
}

export const eliminarResenaDeJuego = (juego, email) => {
  const nuevasResenas = juego.resenasPorUsuario.filter(r => r.email !== email);

  let positivas = Number(juego.resenas?.positivas || 0);
  let negativas = Number(juego.resenas?.negativas || 0);
  const resenaEliminada = juego.resenasPorUsuario.find(r => r.email === email);
  if (resenaEliminada) {
    if (resenaEliminada.voto === "positivo") positivas -= 1;
    if (resenaEliminada.voto === "negativo") negativas -= 1;
  }

  return {
    ...juego,
    resenasPorUsuario: nuevasResenas,
    resenas: { positivas, negativas },
  };
};