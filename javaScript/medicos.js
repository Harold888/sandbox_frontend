document.addEventListener("DOMContentLoaded", async () => {
  try {
    const response = await fetch("http://localhost:3000/medicos");
    const medicos = await response.json();

    const medicosTable = document.getElementById("medicosTable");

    const table = document.createElement("table");
    table.classList.add("table", "table-responsive");

    const thead = document.createElement("thead");
    thead.classList.add("thead-dark");
    const headerRow = document.createElement("tr");
    const headers = ["Tarjeta Profesional", "Nombre", "Apellido", "Correo", "Consultorio", "Especialidad", "Acciones"];
    headers.forEach((header) => {
      const th = document.createElement("th");
      th.textContent = header;
      headerRow.appendChild(th);
    });
    thead.appendChild(headerRow);
    table.appendChild(thead);

    const tbody = document.createElement("tbody");
    medicos.forEach((medico) => {
      const row = document.createElement("tr");
      const { tarjetaProfesional, nombre, apellido, correo, consultorio, Especialidad } = medico;

      const tarjetaCell = document.createElement("td");
      tarjetaCell.textContent = tarjetaProfesional;
      row.appendChild(tarjetaCell);

      const nombreCell = document.createElement("td");
      nombreCell.textContent = nombre;
      row.appendChild(nombreCell);

      const apellidoCell = document.createElement("td");
      apellidoCell.textContent = apellido;
      row.appendChild(apellidoCell);

      const correoCell = document.createElement("td");
      correoCell.textContent = correo;
      row.appendChild(correoCell);

      const consultorioCell = document.createElement("td");
      consultorioCell.textContent = consultorio;
      row.appendChild(consultorioCell);

      const especialidadCell = document.createElement("td");
      especialidadCell.textContent = Especialidad;
      row.appendChild(especialidadCell);

      const accionesCell = document.createElement("td");
      const deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fas", "fa-trash-alt");
      deleteIcon.addEventListener("click", () => eliminarMedico(tarjetaProfesional));
      accionesCell.appendChild(deleteIcon);
      const editIcon = document.createElement("i");
      editIcon.classList.add("fas", "fa-edit");
      accionesCell.appendChild(editIcon);
      row.appendChild(accionesCell);

      tbody.appendChild(row);
    });
    table.appendChild(tbody);

    medicosTable.appendChild(table);
  } catch (error) {
    console.error(error);
  }
});

async function eliminarMedico(tarjetaProfesional) {
  try {
    console.log('tarjetaProfesional:', tarjetaProfesional);
    const response = await fetch(`http://localhost:3000/eliminar_medico/${tarjetaProfesional}`, {
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
      actualizarTablaMedicos();
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

function actualizarTablaMedicos() {
  const medicosTable = document.getElementById("medicosTable");
  medicosTable.innerHTML = "";
  // Cargar médicos y generar la tabla nuevamente
  // ...
}
