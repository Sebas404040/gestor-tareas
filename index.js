import mostrarMenu from './utils/menu.js';
import inquirer from 'inquirer';
import { listarTareas, agregarTarea, editarTarea, eliminarTarea } from './controllers/tareasController.js';

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
        await agregarTarea();
        await pausar()
        break;
      case '2':
        listarTareas();
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
        console.log('👋 ¡Hasta pronto!');
        break;
    }
  }
}

main();