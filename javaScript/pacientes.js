document.addEventListener("DOMContentLoaded", async () => {
    try {
      const response = await fetch("http://localhost:3000/pacientes");
      const pacientes = await response.json();
  
      const pacientesTable = document.getElementById("pacientesTable");
  
      const table = document.createElement("table");
      table.classList.add("table", "table-responsive");
  
      const thead = document.createElement("thead");
      thead.classList.add("thead-dark");
      const headerRow = document.createElement("tr");
      const headers = ["Cédula", "Nombre", "Apellido", "Fecha de Nacimiento", "Teléfono", "Acciones"];
      headers.forEach((header) => {
        const th = document.createElement("th");
        th.textContent = header;
        headerRow.appendChild(th);
      });
      thead.appendChild(headerRow);
      table.appendChild(thead);
  
      const tbody = document.createElement("tbody");
      pacientes.forEach((paciente) => {
        const row = document.createElement("tr");
        const { cedula, nombre, apellido, fechaNacimiento, telefono } = paciente;
  
        const cedulaCell = document.createElement("td");
        cedulaCell.textContent = cedula;
        row.appendChild(cedulaCell);
  
        const nombreCell = document.createElement("td");
        nombreCell.textContent = nombre;
        row.appendChild(nombreCell);
  
        const apellidoCell = document.createElement("td");
        apellidoCell.textContent = apellido;
        row.appendChild(apellidoCell);
  
        const fechaNacimientoCell = document.createElement("td");
        fechaNacimientoCell.textContent = fechaNacimiento;
        row.appendChild(fechaNacimientoCell);
  
        const telefonoCell = document.createElement("td");
        telefonoCell.textContent = telefono;
        row.appendChild(telefonoCell);
  
        const accionesCell = document.createElement("td");
        const deleteIcon = document.createElement("i");
        deleteIcon.classList.add("fas", "fa-trash-alt");
        deleteIcon.addEventListener("click", () => eliminarPaciente(cedula));
        accionesCell.appendChild(deleteIcon);
        const editIcon = document.createElement("i");
        editIcon.classList.add("fas", "fa-edit");
        accionesCell.appendChild(editIcon);
        row.appendChild(accionesCell);
  
        tbody.appendChild(row);
      });
      table.appendChild(tbody);
  
      pacientesTable.appendChild(table);
    } catch (error) {
      console.error(error);
    }
  });
  
  async function eliminarPaciente(cedula) {
    try {
      console.log('Cédula:', cedula);
      const response = await fetch(`http://localhost:3000/eliminar_paciente/${cedula}`, {
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
                <p>Usuario eliminado correctamente</p>
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
          window.location.href = "index.html";
        });
  
        document.body.appendChild(modal);
        actualizarTablaPacientes();
      } else {
        mostrarMensaje("Error al eliminar el médico.");
      }
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al eliminar el médico.");
    }
  }
  
  function mostrarMensaje(mensaje) {
    const modal = document.getElementById("errorModal");
    const mensajeElement = document.getElementById("errorMessage");
    mensajeElement.textContent = mensaje;
    const modalInstance = new bootstrap.Modal(modal);
    modalInstance.show();
  }
  
  function actualizarTablaPacientes() {
    const pacientesTable = document.getElementById("pacientesTable");
    pacientesTable.innerHTML = "";
  }
  