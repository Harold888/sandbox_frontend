document.addEventListener("DOMContentLoaded", () => {
    const createForm = document.getElementById("createForm");
    const nombreInput = document.getElementById("nombreInput");
  
    createForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      const nombre = nombreInput.value;
  
      try {
        const response = await fetch("http://localhost:3000/crear_especialidad", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ nombre }),
        });
  
        if (response.ok) {
          mostrarMensaje("Especialidad creada correctamente.")
          createForm.reset()
        } else {
          mostrarMensaje("Error al crear la especialidad.")
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al crear la especialidad.")
      }
    })
  })
  
  function mostrarMensaje(mensaje) {
    alert(mensaje);
  }