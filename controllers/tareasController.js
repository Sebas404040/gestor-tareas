import inquirer from 'inquirer';
import Tarea from './Tarea.js';
import database from '../config/database.js'; 


class GestorTareas {
  async agregarTarea(descripcion) {
    const { descripcion } = await inquirer.prompt([
      {
        type: "input",
        name: "descripcion",
        message: "Descripción de la tarea"
      }
    ])

    const tareaNueva = new Tarea(Date.now(), descripcion, false);

    try {
      await database.realizarConexion();
      const collection = await database.getCollection('tareas');
      await collection.insertOne(tareaNueva);
      console.log('Tarea agregada exitosamente.');
    } catch (error) {
      console.error('Error al agregar la tarea:', error);
    }
  }
}

export default GestorTareas;
             