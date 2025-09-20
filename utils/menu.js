// Se importa inquirer para la creación de menús interactivos
import inquirer from 'inquirer';

// Función para mostrar el menú y capturar la opción seleccionada
export default async function mostrarMenu() {

  // Armado del menú con inquirer
  const { opcion } = await inquirer.prompt([
    {
      type: 'list',
      name: 'opcion',
      message: 'Selecciona una opción:',
      choices: [
        { name: '1. Agregar tarea', value: '1' },
        { name: '2. Listar tareas', value: '2' },
        { name: '3. Marcar tarea como completada', value: '3' },
        { name: '4. Eliminar tarea', value: '4' },
        { name: '5. Salir', value: '5' }
      ]
    }
  ]);

  // Se retorna la opción seleccionada
  return opcion;
}