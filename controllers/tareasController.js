import inquirer from 'inquirer';
import fs from 'fs/promises';
import { Console } from 'console';

const RUTA_TAREAS = "./JSON/tareas.json"

export async function agregarTarea() {

  const { descripcion } = await inquirer.prompt([
    { type: 'input', name: 'descripcion', message: 'Descripción de la tarea:' }
  ]);

  const nueva = {
    id: Date.now(),
    descripcion: descripcion.trim(),
    completada: false
  };

  try {
    let pre_tareas = []
    try {
      const datos = await fs.readFile(RUTA_TAREAS, "utf8")
      pre_tareas = JSON.parse(datos)
    } catch (error) {
      console.log("Error al cargar tareas", error)
    }
    pre_tareas.push(nueva)
    await fs.writeFile(RUTA_TAREAS, JSON.stringify(pre_tareas, null, 4))
    console.log("Tarea agregada!");
  } catch (error) {
    console.log("Error agregando tarea")
  }
}

export async function listarTareas() {
  let ver_tareas = []
  try {
    const datos = await fs.readFile(RUTA_TAREAS, "utf-8");
    ver_tareas = JSON.parse(datos)
    ver_tareas.forEach((tarea, i) => {
      const estado = tarea.completada ? '✅' : '❌';
      console.log(`\n${i + 1}. [${estado}] ${tarea.descripcion}`);
    });
  } catch (error) {
    console.log("Error al cargar tareas")
  }
}

export async function editarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para editar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para editar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  const { nuevaDescripcion } = await inquirer.prompt([
    { type: 'input', name: 'nuevaDescripcion', message: 'Nueva descripción:' }
  ]);

  tareas[indice].descripcion = nuevaDescripcion.trim();
  console.log('✏️ Tarea actualizada.');
}

export async function eliminarTarea() {
  if (tareas.length === 0) return console.log('⚠️ No hay tareas para eliminar.');

  const { indice } = await inquirer.prompt([
    {
      type: 'list',
      name: 'indice',
      message: 'Selecciona una tarea para eliminar:',
      choices: tareas.map((t, i) => ({
        name: t.descripcion,
        value: i
      }))
    }
  ]);

  tareas.splice(indice, 1);
  console.log('🗑️ Tarea eliminada.');
}
