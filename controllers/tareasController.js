// Importaciones
import Tarea from '../models/Tarea.js';
import database from '../config/database.js'; 
import notificador from '../utils/notificador.js';

// Clase GestorTareas
class GestorTareas {

  // Método para agregar una tarea
  async agregarTarea(descripcion) {

    // Se crea una nueva tarea
    const tareaNueva = new Tarea(Date.now().toString(), descripcion, false);

    // Intenta acceder a la colección en la base de datos
    try {
      const collection = await database.getCollection('tareas');

      // Se inserta la nueva tarea creada
      await collection.insertOne(tareaNueva);

      // El notificador imprime la acción
      notificador.tareaAgregada();

      // En caso de que algo falle
    } catch (error) {
      notificador.error('Error al agregar la tarea:', error);
    }
  }

  // Método para listar las tareas
  async listarTareas() {

    // Intenta acceder a la colección en la base de datos
    try {
      const collection = await database.getCollection('tareas');

      // Se obtienen las tareas de la base de datos
      const tareas = await collection.find({}).toArray();
      
      // Se obtiene la elección del usuario (completadas / pendientes) del notificador
      const eleccionEstado = await notificador.elegirEstado(); 

      // Se crea un array para guardar esas tareas filtradas
      let tareasFiltradas = [];

      // Si la elección es "completadas"  
      if (eleccionEstado === "completadas") {

        // Filtración para completadas
        tareasFiltradas = tareas.filter(tarea => tarea.completada === true);

        // Si la elección es "no completadas"
      } else if (eleccionEstado === "No completadas") {

        // Filtración para incompletas
        tareasFiltradas = tareas.filter(tarea => tarea.completada === false);

        // Para evitar errores si no sucede ninguna condición establecida arriba, se asignan todas las tareas al Array 
      } else {
        tareasFiltradas = tareas; 
      }

      // Notificador imprime las tareas filtradas
      notificador.mostrarTareas(tareasFiltradas);

      // En caso de que algo falle
    } catch (error) {
      notificador.error('Error al cargar tareas:', error);
    }
  }

  // Método para marcar una tarea como completada
  async marcarTareaCompleta() {

    // Intenta acceder a la colección en la base de datos
    try {
      const collection = await database.getCollection("tareas");
      const tareas = await collection.find({}).toArray();

      // El notificador muestra las tareas para que sean completadas
      const tareasIdsParaCompletar = await notificador.elegirTareasParaCompletar(tareas);

      // Si no hay tareas seleccionadas o no hay pendientes
      if (tareasIdsParaCompletar.length === 0) {
        return;
      }

      // Se actualizan las tareas seleccionadas para completar
      const resultado = await collection.updateMany(
        { _id: { $in: tareasIdsParaCompletar } },
        { $set: { completada: true } }
      );

      // Si se hizo la modificación o modificaciones el notificador imprime la confirmación
      if (resultado.modifiedCount > 0) {
        notificador.tareaMarcadaCompleta();
      }

      // En caso de que algo falle
    } catch (error) {
      notificador.error('Error al marcar tareas como completadas:', error);
    }
  }

  // Método para eliminar una tarea
  async eliminarTarea() {

    // Intenta acceder a la colección en la base de datos
    try {
      const collection = await database.getCollection("tareas");
      const tareas = await collection.find({}).toArray();

      // Si no hay tareas para eliminar el notificador lo indica
      if (tareas.length === 0) {
        return notificador.info('No hay tareas para eliminar.');
      }

      // El notificador muestra las tareas para capturar la elección de eliminación
      notificador.mostrarTareas(tareas);

      // El notificador gestiona la elección del usuario para que se  capture el ID
      const tareaIdParaEliminar = await notificador.elegirTarea(tareas);

      // Si no se selecciona ninguna tarea para eliminar el notificador lo indica
      if (!tareaIdParaEliminar) {
        return notificador.eliminacionCancelada();
      }

      // Se elimina la tarea seleccionada
      const resultado = await collection.deleteOne({ _id: tareaIdParaEliminar });

      // Si se eliminó la tarea el notificador imprime la confirmación
      if (resultado.deletedCount === 1) {
        notificador.tareaEliminada();

        // Si no se elimina la tarea el notificador imprime el error
      } else {
        notificador.error('No se pudo encontrar la tarea para eliminar.');
      }

      // En caso de que algo falle
    } catch (error) {
      notificador.error('Error al eliminar la tarea:', error);
    }
  }

}

// Se exporta el gestor de tareas
export default GestorTareas;
             