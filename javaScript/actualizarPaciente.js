document.addEventListener("DOMContentLoaded", async () => {
    // Obtener los elementos del formulario
    const updateForm = document.getElementById("updateForm");
    const cedulaInput = document.getElementById("cedulaInput");
    const nombreInput = document.getElementById("nombreInput");
    const apellidoInput = document.getElementById("apellidoInput");
    const fechaNacimientoInput = document.getElementById("fechaNacimientoInput");
    const telefonoInput = document.getElementById("telefonoInput");
  
    // Crear el modal
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
      // Obtener el parámetro de la URL (en este caso, la cédula del paciente)
      const urlParams = new URLSearchParams(window.location.search);
      const cedula = urlParams.get("cedula");
  
      // Realizar la solicitud GET para obtener los datos del paciente
      const response = await fetch(`http://localhost:3000/actualizar_paciente/${cedula}`);
      const paciente = await response.json();
  
      // Rellenar los campos del formulario con los datos del paciente
      cedulaInput.value = paciente.cedula;
      nombreInput.value = paciente.nombre;
      apellidoInput.value = paciente.apellido;
  
      // Obtener la fecha de nacimiento en formato "yyyy-MM-dd"
      const fechaNacimiento = new Date(paciente.fechaNacimiento).toLocaleDateString("en-CA");
  
      fechaNacimientoInput.value = fechaNacimiento;
      telefonoInput.value = paciente.telefono;
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al obtener los datos del paciente.");
    }
  
    // Manejar el evento de envío del formulario
    updateForm.addEventListener("submit", async (event) => {
      event.preventDefault();
  
      try {
        const cedula = cedulaInput.value;
        const nombre = nombreInput.value;
        const apellido = apellidoInput.value;
        const fechaNacimiento = fechaNacimientoInput.value;
        const telefono = telefonoInput.value;
  
        const pacienteData = {
          cedula: parseInt(cedula),
          nombre,
          apellido,
          fecha: fechaNacimiento,
          telefono,
        };
  
        const response = await fetch(`http://localhost:3000/actualizar_paciente/${cedula}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(pacienteData),
        });
  
        if (response.ok) {
          mostrarMensaje("Paciente actualizado correctamente.");
        } else {
          mostrarMensaje("Error al actualizar el paciente.");
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al actualizar el paciente.");
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
  