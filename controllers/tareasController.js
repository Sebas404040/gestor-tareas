import Tarea from '../models/Tarea.js';
import database from '../config/database.js'; 
import notificador from '../utils/notificador.js';
import inquirer from 'inquirer';

class GestorTareas {
  async agregarTarea(descripcion) {
    const tareaNueva = new Tarea(Date.now().toString(), descripcion, false);

    try {
      const collection = await database.getCollection('tareas');
      await collection.insertOne(tareaNueva);
      notificador.tareaAgregada();
    } catch (error) {
      notificador.error('Error al agregar la tarea:', error);
    }
  }

  async listarTareas() {
    try {
      const collection = await database.getCollection('tareas');
      const tareas = await collection.find({}).toArray();
      
      const eleccionEstado = await notificador.elegirEstado(); 

      let tareasFiltradas = [];
      if (eleccionEstado === "completadas") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada === true);
      } else if (eleccionEstado === "No completadas") {
        tareasFiltradas = tareas.filter(tarea => tarea.completada === false);
      } else {
        tareasFiltradas = tareas; 
      }
      notificador.mostrarTareas(tareasFiltradas);
    } catch (error) {
      notificador.error('Error al cargar tareas:', error);
    }
  }

  async marcarTareaCompleta() {
    try {
      const collection = await database.getCollection("tareas");
      const tareas = await collection.find({}).toArray();

      const tareasIdsParaCompletar = await notificador.elegirTareasParaCompletar(tareas);

      if (tareasIdsParaCompletar.length === 0) {
        return; // No hay tareas seleccionadas o no hay pendientes
      }

      const resultado = await collection.updateMany(
        { _id: { $in: tareasIdsParaCompletar } },
        { $set: { completada: true } }
      );

      if (resultado.modifiedCount > 0) {
        notificador.tareaMarcadaCompleta();
      }
    } catch (error) {
      notificador.error('Error al marcar tareas como completadas:', error);
    }
  }

  async eliminarTarea() {
    try {
      const collection = await database.getCollection("tareas");
      const tareas = await collection.find({}).toArray();

      if (tareas.length === 0) {
        return notificador.info('No hay tareas para eliminar.');
      }

      notificador.mostrarTareas(tareas);
      const tareaIdParaEliminar = await notificador.elegirTarea(tareas);

      if (!tareaIdParaEliminar) {
        return notificador.eliminacionCancelada();
      }

      const resultado = await collection.deleteOne({ _id: tareaIdParaEliminar });

      if (resultado.deletedCount === 1) {
        notificador.tareaEliminada();
      } else {
        notificador.error('No se pudo encontrar la tarea para eliminar.');
      }
    } catch (error) {
      notificador.error('Error al eliminar la tarea:', error);
    }
  }

}

export default GestorTareas;
             