document.addEventListener("DOMContentLoaded", () => {
  const citaForm = document.getElementById("citaForm");
  const medicoInput = document.getElementById("medicoInput");
  const pacienteInput = document.getElementById("pacienteInput");
  const fechaInput = document.getElementById("fechaInput");

  citaForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const medico = medicoInput.value;
    const paciente = pacienteInput.value;
    const fecha = fechaInput.value;

    const citaData = {
      fechaCita: fecha.replace(/-/g, "/"),
      Paciente: parseInt(paciente),
      Medico: parseInt(medico)
    };

    const jsonString = JSON.stringify(citaData, null, 2); // Convertir objeto a JSON con formato legible

    console.log(jsonString); // Imprimir el objeto JSON en la consola

    try {
      const response = await fetch("http://localhost:3000/crear_cita", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: jsonString,
      });

      if (response.ok) {
        mostrarMensaje("Cita registrada correctamente.");
        citaForm.reset();
      } else {
        mostrarMensaje("Error al registrar la cita.");
      }
    } catch (error) {
      console.error(error);
      mostrarMensaje("Error al registrar la cita.");
    }
  });
});

function mostrarMensaje(mensaje) {
  alert(mensaje);
}
