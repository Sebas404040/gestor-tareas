import Tarea from '../models/Tarea.js';
import database from '../config/database.js'; 
import notificador from '../utils/notificador.js';

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
      notificador.mostrarTareas(tareas);
    } catch (error) {
      notificador.error('Error al cargar tareas:', error);
    }
  }
}

export default GestorTareas;
             