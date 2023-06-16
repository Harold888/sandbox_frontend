document.addEventListener("DOMContentLoaded", () => {
    const citasList = document.getElementById("citasList");
  
    obtenerCitas();
  
    async function obtenerCitas() {
      try {
        const response = await fetch("http://localhost:3000/citas");
        const citas = await response.json();
  
        if (response.ok) {
          mostrarCitas(citas);
        } else {
          mostrarMensaje("Error al obtener las citas.");
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al obtener las citas.");
      }
    }
  
    function mostrarCitas(citas) {
      citasList.innerHTML = "";
  
      // Crear el encabezado de la tabla
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");
      const thFecha = document.createElement("th");
      thFecha.textContent = "Fecha";
      const thPaciente = document.createElement("th");
      thPaciente.textContent = "Paciente";
      const thMedico = document.createElement("th");
      thMedico.textContent = "Médico";
      const thAcciones = document.createElement("th");
      thAcciones.textContent = "Acciones";
  
      tr.appendChild(thFecha);
      tr.appendChild(thPaciente);
      tr.appendChild(thMedico);
      tr.appendChild(thAcciones);
      thead.appendChild(tr);
  
      citasList.appendChild(thead);
  
      citas.forEach((cita) => {
        const row = document.createElement("tr");
  
        const fechaCell = document.createElement("td");
        fechaCell.textContent = cita.fecha;
  
        const pacienteCell = document.createElement("td");
        pacienteCell.textContent = cita.pacienteCedula;
  
        const medicoCell = document.createElement("td");
        medicoCell.textContent = cita.medicoTarjetaProfesional;
  
        const accionesCell = document.createElement("td");
        const editarIcon = document.createElement("i");
        editarIcon.classList.add("fas", "fa-edit", "mr-2");
        editarIcon.setAttribute("data-toggle", "tooltip");
        editarIcon.setAttribute("data-placement", "top");
        editarIcon.setAttribute("title", "Editar");
        editarIcon.addEventListener("click", () => editarCita(cita.idCita));
  
        const eliminarIcon = document.createElement("i");
        eliminarIcon.classList.add("fas", "fa-trash", "ml-2");
        eliminarIcon.setAttribute("data-toggle", "tooltip");
        eliminarIcon.setAttribute("data-placement", "top");
        eliminarIcon.setAttribute("title", "Eliminar");
        eliminarIcon.addEventListener("click", () => eliminarCita(cita.idCita));
  
        accionesCell.appendChild(editarIcon);
        accionesCell.appendChild(eliminarIcon);
  
        row.appendChild(fechaCell);
        row.appendChild(pacienteCell);
        row.appendChild(medicoCell);
        row.appendChild(accionesCell);
  
        citasList.appendChild(row);
      });
  
      // Inicializar los tooltips de los iconos
      $('[data-toggle="tooltip"]').tooltip();
  
      // Agregar clases de Bootstrap para centrar la tabla
      citasList.classList.add("table", "table-striped", "text-center");
    }
  
    function mostrarMensaje(mensaje) {
      alert(mensaje);
    }
  
    function editarCita(idCita) {
      // Implementar la lógica para editar una cita
      console.log("Editar cita con ID:", idCita);
    }
  
    async function eliminarCita(idCita) {
      try {
        console.log('ID Cita:', idCita);
        const response = await fetch(`http://localhost:3000/eliminar_cita/${idCita}`, {
          method: "DELETE",
        });
    
        if (response.ok) {
          console.log("Se ha eliminado correctamente");
    
          const modal = document.createElement("div");
          modal.classList.add("modal", "fade");
          modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body">
                  <p>Cita eliminada correctamente</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" id="acceptButton">Aceptar</button>
                </div>
              </div>
            </div>
          `;
    
          $(modal).modal("show");
    
          const acceptButton = modal.querySelector("#acceptButton");
          acceptButton.addEventListener("click", () => {
            $(modal).modal("hide");
            // Realizar la actualización de la tabla de citas
            obtenerCitas();
          });
    
          document.body.appendChild(modal);
        } else {
          mostrarMensaje("Error al eliminar la cita.");
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al eliminar la cita.");
      }
    }
  });
  