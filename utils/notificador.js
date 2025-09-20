import chalk from 'chalk';
import inquirer from 'inquirer';

class Notificador {
  
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
    return eleccion
  }
  
  mostrarTareas(tareas) {
    console.log(chalk.cyan('--- Lista de Tareas ---'));
    if (tareas.length === 0) {
      this.info('No hay tareas para mostrar.');
      return;
    }
    tareas.forEach((tarea, index) => {
      const estado = tarea.completada 
        ? chalk.green('Completada') 
        : chalk.yellow('Pendiente');
      console.log(`${chalk.bold(index + 1)}. [${estado}] - ${tarea.descripcion}`);
    });
    console.log(chalk.cyan('-----------------------'));
  }

  tareaMarcadaCompleta() {
    console.log(chalk.green('✔ Tarea marcada como completada.'));
  }

  tareaEliminada() {
    console.log(chalk.green('✔ Tarea eliminada exitosamente.'));
  }

  eliminacionCancelada() {
    this.info('La eliminación ha sido cancelada.');
  }

  async elegirTareasParaCompletar(tareas) {
    const tareasPendientes = tareas.filter(t => !t.completada);

    if (tareasPendientes.length === 0) {
      this.info('¡Felicidades! No hay tareas pendientes para marcar.');
      return [];
    }

    const choices = tareasPendientes.map((tarea, index) => ({
      value: tarea._id,
      name: `${index + 1}. ${tarea.descripcion}`
    }));

    const { tareasIds } = await inquirer.prompt([
      { type: 'checkbox', name: 'tareasIds', message: 'Seleccione las tareas a completar:', choices }
    ]);

    return tareasIds;
  }

  async elegirTarea(tareas) {
    const choices = tareas.map((tarea, index) => ({
      value: tarea._id,
      name: `${index + 1}. [${tarea.completada ? 'Completada' : 'Pendiente'}] - ${tarea.descripcion}`
    }));

    const { tareaId } = await inquirer.prompt([
      {
        type: 'list',
        name: 'tareaId',
        message: 'Seleccione la tarea a eliminar:',
        choices
      }
    ]);

    const { confirmacion } = await inquirer.prompt([
      {
        type: 'confirm',
        name: 'confirmacion',
        message: chalk.yellow(`¿Está seguro de que desea eliminar esta tarea?`),
        default: false
      }
    ]);

    return confirmacion ? tareaId : null;
  }
}

const notificador = new Notificador();
export default notificador;