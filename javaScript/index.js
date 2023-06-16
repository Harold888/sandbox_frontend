const miFormEngine = new FormEngine();

// Obtener el parámetro de la URL para determinar si es para pacientes o médicos
const urlParams = new URLSearchParams(window.location.search);
const type = urlParams.get("type");

// Renderizar el formulario correspondiente según el tipo
if (type === "pacientes") {
  miFormEngine.render("http://localhost:3000/formulario/Paciente");
} else if (type === "medicos") {
  miFormEngine.render("http://localhost:3000/formulario/Medico");
}

