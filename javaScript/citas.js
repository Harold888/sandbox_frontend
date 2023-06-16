// Obtener los médicos y pacientes del servidor y llenar los selectores
$(document).ready(function() {
    obtenerMedicos();
    obtenerPacientes();
  });
  
  function obtenerMedicos() {
    $.ajax({
      url: 'http://localhost:3000/medicos', // Reemplaza la URL con la ruta correcta para obtener los médicos
      method: 'GET',
      success: function(response) {
        // Llenar el selector de médicos con las opciones obtenidas
        var medicoSelect = $('#medicoSelect');
        response.medicos.forEach(function(medico) {
          var option = $('<option>').val(medico.tarjetaProfesional).text(medico.nombre);
          medicoSelect.append(option);
        });
      },
      error: function(error) {
        console.error(error);
      }
    });
  }
  
  function obtenerPacientes() {
    $.ajax({
      url: 'http://localhost:3000/pacientes', // Reemplaza la URL con la ruta correcta para obtener los pacientes
      method: 'GET',
      success: function(response) {
        // Llenar el selector de pacientes con las opciones obtenidas
        var pacienteSelect = $('#pacienteSelect');
        response.pacientes.forEach(function(paciente) {
          var option = $('<option>').val(paciente.cedula).text(paciente.nombre);
          pacienteSelect.append(option);
        });
      },
      error: function(error) {
        console.error(error);
      }
    });
  }
  
  $('#citaForm').submit(function(event) {
    event.preventDefault();
  
    var medico = $('#medicoSelect').val();
    var paciente = $('#pacienteSelect').val();
    var fecha = $('#fechaInput').val();
  
    // Realizar la solicitud de registro de cita al servidor
    $.ajax({
      url: 'http://localhost:3000/citas', // Reemplaza la URL con la ruta correcta para registrar la cita
      method: 'POST',
      data: {
        medico: medico,
        paciente: paciente,
        fecha: fecha
      },
      success: function(response) {
        // Cita registrada correctamente
        alert('Cita registrada correctamente');
        // Restablecer el formulario
        $('#citaForm')[0].reset();
      },
      error: function(error) {
        console.error(error);
        alert('Error al registrar la cita');
      }
    });
  });
  