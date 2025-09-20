import inquirer from 'inquirer';

export default async function mostrarMenu() {
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
  return opcion;
}