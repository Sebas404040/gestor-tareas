import mostrarMenu from './utils/menu.js';
import inquirer from 'inquirer';
import GestorTareas from './controllers/tareasController.js';

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
        await gestorTareas.agregarTarea();
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