import mostrarMenu from './utils/menu.js';
import inquirer from 'inquirer';
import GestorTareas from './controllers/tareasController.js';
import database from './config/database.js';
import notificador from './utils/notificador.js';

const gestorTareas = new GestorTareas();

async function pausar() {

  await inquirer.prompt([
      {
          type: 'input',
          name: 'continuar',
          message: 'Presiona ENTER para volver al menu'
      }
  ]);
}

async function main() {
  let salir = false;

  while (!salir) {
    const opcion = await mostrarMenu();

    switch (opcion) {
      case '1':
        const { descripcion } = await inquirer.prompt([
          {
            type: "input",
            name: "descripcion",
            message: "Descripción de la tarea:"
          }
        ]);
        await gestorTareas.agregarTarea(descripcion);
        await pausar()
        break;
      case '2':
        await gestorTareas.listarTareas();
        await pausar()
        break;
      case '3':
        await editarTarea();
        break;
      case '4':
        await eliminarTarea();
        break;
      case '5':
        salir = true;
        await database.desconectar();
        notificador.despedida();
        break;
    }
  }
}

main();