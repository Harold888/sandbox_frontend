document.addEventListener("DOMContentLoaded", async () => {
    // Obtener los elementos del formulario
    const updateForm = document.getElementById("updateForm");
    const tarjetaProfesionalInput = document.getElementById("tarjetaProfesionalInput");
    const nombreInput = document.getElementById("nombreInput");
    const apellidoInput = document.getElementById("apellidoInput");
    const correoInput = document.getElementById("correoInput");
    const consultorioInput = document.getElementById("consultorioInput");
    const especialidadInput = document.getElementById("especialidadInput");
  
    // Crear el modal (para mostrar mensajes de error)
    const modal = document.createElement("div");
    modal.id = "errorModal";
    modal.classList.add("modal");
  
    const modalDialog = document.createElement("div");
    modalDialog.classList.add("modal-dialog");
  
    const modalContent = document.createElement("div");
    modalContent.classList.add("modal-content");
  
    const modalBody = document.createElement("div");
    modalBody.classList.add("modal-body");
  
    const errorMessage = document.createElement("span");
    errorMessage.id = "errorMessage";
  
    modalBody.appendChild(errorMessage);
    modalContent.appendChild(modalBody);
    modalDialog.appendChild(modalContent);
    modal.appendChild(modalDialog);
  
    // Agregar el modal al formulario
    updateForm.appendChild(modal);
  
    try {
      // Obtener el parámetro de la URL (en este caso, la tarjeta profesional del médico)
      const urlParams = new URLSearchParams(window.location.search);
      const tarjetaProfesional = urlParams.get("tarjetaProfesional");
  
      // Realizar la solicitud GET para obtener los datos del médico
      const response = await fetch(`http://localhost:3000/actualizar_medico/${tarjetaProfesional}`);
      const medico = await response.json();
  
      // Rellenar los campos del formulario con los datos del médico
      tarjetaProfesionalInput.value = medico.tarjetaProfesional;
      nombreInput.value = medico.nombre;
      apellidoInput.value = medico.apellido;
      correoInput.value = medico.correo;
      consultorioInput.value = medico.consultorio;
      especialidadInput.value = medico.especialidad;
    
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al obtener los datos del médico.");
    }
  
    // Manejar el evento de envío del formulario
    updateForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const tarjetaProfesional = tarjetaProfesionalInput.value;
        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const correo = correoInput.value;
        const consultorio = consultorioInput.value;
        const especialidad = especialidadInput.value;
  
        const medicoData = {
          tarjetaProfesional: parseInt(tarjetaProfesional),
          nombre,
          apellido,
          correo,
          consultorio,
          especialidad: parseInt(especialidad),
        };
  
        const response = await fetch(`http://localhost:3000/actualizar_medico/${tarjetaProfesional}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(medicoData),
        });
  
        if (response.ok) {
          mostrarMensaje("Médico actualizado correctamente.");
        } else {
          mostrarMensaje("Error al actualizar el médico.");
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al actualizar el médico.");
      }
    });
  });
  
  function mostrarMensaje(mensaje) {
    const modal = document.getElementById("errorModal");
    const mensajeElement = document.getElementById("errorMessage");
    mensajeElement.textContent = mensaje;
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }
  