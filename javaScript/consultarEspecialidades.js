document.addEventListener("DOMContentLoaded", () => {
    const especialidadesList = document.getElementById("especialidadesList");
  
    obtenerEspecialidades();
  
    async function obtenerEspecialidades() {
      try {
        const response = await fetch("http://localhost:3000/especialidades");
        const especialidades = await response.json();
  
        if (response.ok) {
          mostrarEspecialidades(especialidades);
        } else {
          mostrarMensaje("Error al obtener las especialidades.");
        }
      } catch (error) {
        console.error(error);
        mostrarMensaje("Error al obtener las especialidades.");
      }
    }
  
    function mostrarEspecialidades(especialidades) {
      especialidadesList.innerHTML = "";
  
      // Crear el encabezado de la tabla
      const thead = document.createElement("thead");
      const tr = document.createElement("tr");
      const thNombre = document.createElement("th");
      thNombre.textContent = "Nombre";
      const thAcciones = document.createElement("th");
      thAcciones.textContent = "Acciones";
  
      tr.appendChild(thNombre);
      tr.appendChild(thAcciones);
      thead.appendChild(tr);
  
      especialidadesList.appendChild(thead);
  
      especialidades.forEach((especialidad) => {
        const row = document.createElement("tr");
  
        const nombreCell = document.createElement("td");
        nombreCell.textContent = especialidad.nombre;
  
        const accionesCell = document.createElement("td");
        const editarIcon = document.createElement("i");
        editarIcon.classList.add("fas", "fa-edit", "mr-2");
        editarIcon.setAttribute("data-toggle", "tooltip");
        editarIcon.setAttribute("data-placement", "top");
        editarIcon.setAttribute("title", "Editar");
        editarIcon.addEventListener("click", () => editarEspecialidad(especialidad.idEspecialidad));
  
        const eliminarIcon = document.createElement("i");
        eliminarIcon.classList.add("fas", "fa-trash", "ml-2");
        eliminarIcon.setAttribute("data-toggle", "tooltip");
        eliminarIcon.setAttribute("data-placement", "top");
        eliminarIcon.setAttribute("title", "Eliminar");
        eliminarIcon.addEventListener("click", () => eliminarEspecialidad(especialidad.idEspecialidad));
  
        accionesCell.appendChild(editarIcon);
        accionesCell.appendChild(eliminarIcon);
  
        row.appendChild(nombreCell);
        row.appendChild(accionesCell);
  
        especialidadesList.appendChild(row);
      });
  
      // Inicializar los tooltips de los iconos
      $('[data-toggle="tooltip"]').tooltip();
  
      // Agregar clases de Bootstrap para centrar la tabla
      especialidadesList.classList.add("table", "table-striped", "text-center");
    }
  
    function mostrarMensaje(mensaje) {
      alert(mensaje);
    }
  
    function editarEspecialidad(idEspecialidad) {
      // Implementar la lógica para editar una especialidad
      console.log("Editar especialidad con ID:", idEspecialidad);
    }
  
    async function eliminarEspecialidad(idEspecialidad) {
        try {
          console.log('ID Especialidad:', idEspecialidad);
          const response = await fetch(`http://localhost:3000/eliminar_especialidad/${idEspecialidad}`, {
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
                    <p>Especialidad eliminada correctamente</p>
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
              // Realizar la actualización de la tabla de especialidades
              obtenerEspecialidades();
            });
      
            document.body.appendChild(modal);
          } else {
            mostrarMensaje("Error al eliminar la especialidad.");
          }
        } catch (error) {
          console.error(error);
          mostrarMensaje("Error al eliminar la especialidad.");
        }
      }
      
  });
  
  eliminarIcon.addEventListener("click", () => eliminarEspecialidad(especialidad.idEspecialidad));