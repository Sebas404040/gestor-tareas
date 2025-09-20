// IMPORTANTE: La clase Notificador se encarga de manejar las impresiones para poder liberar esponsabilidades para otras clases o métodos

// Se importan las librerias
import chalk from 'chalk';
import inquirer from 'inquirer';

// Clase Notificador para manejar las interacciones con el usuario
class Notificador {
  
  // Métodos para diferentes tipos de notificaciones
  tareaAgregada() {
    console.log(chalk.green('✔ Tarea agregada exitosamente.'));
  }

  error(mensaje, error) {
    console.error(chalk.red(`✖ ${mensaje}`), error || '');
  }

  info(mensaje) {
    console.log(chalk.blue(`ℹ ${mensaje}`));
  }

  despedida() {
    console.log(chalk.yellow('👋 ¡Hasta pronto!'));
  }

  // Método para elegir el estado 
  async elegirEstado() {
    const { eleccion } = await inquirer.prompt([
        {
            type: "list",
            name: "eleccion",
            message: "Elija tarea por tipo de estado",
            choices: [
                "completadas",
                "No completadas"
            ]
        }
    ])

    // Se retorna la elección
    return eleccion
  }
  
  // Método para mostrar las tareas
  mostrarTareas(tareas) {
    console.log(chalk.cyan('--- Lista de Tareas ---'));

    // Si no hay tareas, se notifica
    if (tareas.length === 0) {
      this.info('No hay tareas para mostrar.');
      return;
    }

    // Utilizando forEach se muestra cada tarea
    tareas.forEach((tarea, index) => {
      
        // Se define el estado de la tarea
      const estado = tarea.completada 
        ? chalk.green('Completada') 
        : chalk.yellow('Pendiente');

        // Se imprime la tarea con su estado
      console.log(`${chalk.bold(index + 1)}. [${estado}] - ${tarea.descripcion}`);
    });
    console.log(chalk.cyan('-----------------------'));
  }

  // Métodos para notificaciones específicas
  tareaMarcadaCompleta() {
    console.log(chalk.green('✔ Tarea marcada como completada.'));
  }

  tareaEliminada() {
    console.log(chalk.green('✔ Tarea eliminada exitosamente.'));
  }

  eliminacionCancelada() {
    this.info('La eliminación ha sido cancelada.');
  }

  // Método para elegir tareas a completar (Notificador)
  async elegirTareasParaCompletar(tareas) {

    // Se filtran tareas no completadas
    const tareasPendientes = tareas.filter(t => !t.completada);

    // Si no hay tareas pendientes se notifica y retorna un array vacío
    if (tareasPendientes.length === 0) {
      this.info('¡Felicidades! No hay tareas pendientes para marcar.');
      return [];
    }

    // Se crean los choices para que inquirer los muestre
    const choices = tareasPendientes.map((tarea, index) => ({
      value: tarea._id,
      name: `${index + 1}. ${tarea.descripcion}`
    }));

    // Inquierer muestra las tareas pendientes
    const { tareasIds } = await inquirer.prompt([
      { type: 'checkbox', name: 'tareasIds', message: 'Seleccione las tareas a completar:', choices }
    ]);

    // Se retornan las tareas
    return tareasIds;
  }

  // Método para elegir una tarea a eliminar (Notificador)
  async elegirTarea(tareas) {

    // Se obtienn las choices como se realizó anteriormente
    const choices = tareas.map((tarea, index) => ({
      value: tarea._id,
      name: `${index + 1}. [${tarea.completada ? 'Completada' : 'Pendiente'}] - ${tarea.descripcion}`
    }));

    // Se captura una constante tareaId que será la tarea a eliminar
    const { tareaId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tareaId',
        message: 'Seleccione la tarea a eliminar:',
        choices
      }
    ]);

    // Se realiza una confirmación
    const { confirmacion } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmacion',
        message: chalk.yellow(`¿Está seguro de que desea eliminar esta tarea?`),
        default: false
      }
    ]);

    // Se retorna la confirmación o si no null
    return confirmacion ? tareaId : null;
  }
}

// Se instancia notificador
const notificador = new Notificador();

// Se exporta el notificador
export default notificador;