// Importaciones
import mostrarMenu from './utils/menu.js';
import inquirer from 'inquirer';
import GestorTareas from './controllers/tareasController.js';
import database from './config/database.js';
import notificador from './utils/notificador.js';

// Se instancia un nuevo Gestor de tareas
const gestorTareas = new GestorTareas();

// Función para confirmar 
async function pausar() {

  await inquirer.prompt([
      {
          type: 'input',
          name: 'continuar',
          message: 'Presiona ENTER para volver al menu'
      }
  ]);
}

// Función que ejecuta el menu de opciones 
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
        await gestorTareas.marcarTareaCompleta();
        await pausar();
        break;
      case '4':
        await gestorTareas.eliminarTarea();
        await pausar();
        break;
      case '5':
        salir = true;
        await database.desconectar();
        notificador.despedida();
        break;
    }
  }
}

// INICIO DEL PROGRAMA
main();