class FormEngine {
  async render(url) {
    const response = await fetch(url);
    const form = await response.json();

    const formHtml = document.createElement("form");
    formHtml.classList.add("container");

    for (const [key, value] of Object.entries(form.properties)) {
      if (key.toLowerCase() === "cita") {
        continue; // Omitir el campo "cita"
      }

      const label = document.createElement("label");
      label.innerText = key;
      formHtml.appendChild(label);

      const input = document.createElement("input");
      input.name = (key === "fechaNacimiento") ? "fecha" : key; // Cambiar la clave a "fecha" si es "fechaNacimiento"
      input.classList.add("form-control");

      if (key === "fechaNacimiento") {
        input.type = "date"; // Establecer el tipo de entrada como "date" para el campo de fecha de nacimiento
      } else if (value.type === "integer") {
        input.type = "number";
      } else {
        input.type = "text";
      }

      formHtml.appendChild(input);
    }

    const submitButtonContainer = document.createElement("div");
    submitButtonContainer.classList.add("d-flex", "justify-content-center", "align-items-center");

    const lineBreak = document.createElement("br");
    formHtml.appendChild(lineBreak);

    const submitButton = document.createElement("button");
    submitButton.type = "submit";
    submitButton.classList.add("btn", "btn-primary");
    submitButton.innerText = "Enviar";

    submitButtonContainer.appendChild(submitButton);
    formHtml.appendChild(submitButtonContainer);

    const mainElement = document.querySelector("main");
    mainElement.innerHTML = "";
    mainElement.appendChild(formHtml);

    formHtml.addEventListener("submit", async (event) => {
      event.preventDefault();

      const formData = new FormData(event.target);
      const formValues = {};

      for (const [key, value] of formData.entries()) {
        if (key.toLowerCase() !== "cita") { // Omitir el campo "cita"
          formValues[key] = value;
        }
      }

      console.log(JSON.stringify(formValues));

      let endpoint = "";

      if (url.includes("Paciente")) {
        endpoint = "http://localhost:3000/crear_paciente";
      } else if (url.includes("Medico")) {
        endpoint = "http://localhost:3000/crear_medico";
      }

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formValues),
        });

        if (response.ok) {
          console.log("Se ha creado correctamente");

          // Mostrar mensaje de éxito en modal
          const modal = document.createElement("div");
          modal.classList.add("modal", "fade");
          modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body">
                  <p>Elemento creado correctamente</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" id="acceptButton">Aceptar</button>
                </div>
              </div>
            </div>
          `;

          // Abre el modal automáticamente
          $(modal).modal("show");

          // Redirigir al archivo index.html después de hacer clic en "Aceptar"
          const acceptButton = modal.querySelector("#acceptButton");
          acceptButton.addEventListener("click", () => {
            $(modal).modal("hide");
            window.location.href = "index.html";
          });

          formHtml.appendChild(modal);
        } else {
          console.error("Error al crear el usuario");

          // Mostrar mensaje de error en modal
          const modal = document.createElement("div");
          modal.classList.add("modal", "fade");
          modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
              <div class="modal-content">
                <div class="modal-body">
                  <p>Error al crear el elemento</p>
                </div>
                <div class="modal-footer">
                  <button type="button" class="btn btn-primary" data-dismiss="modal" id="errorAcceptButton">Aceptar</button>
                </div>
              </div>
            </div>
          `;

          // Abre el modal automáticamente
          $(modal).modal("show");

          // Redirigir al formulario después de hacer clic en "Aceptar"
          const errorAcceptButton = modal.querySelector("#errorAcceptButton");
          errorAcceptButton.addEventListener("click", () => {
            $(modal).modal("hide");
            window.location.href = "";
          });

          formHtml.appendChild(modal);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
}
