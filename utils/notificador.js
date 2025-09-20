import chalk from 'chalk';

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
}

const notificador = new Notificador();
export default notificador;