# 📋 Gestor de Tareas CLI con MongoDB

Un sistema de gestión de tareas por consola inspirado en las exigencias de **Don Edgar**, ahora potenciado con **MongoDB** (driver oficial) y una interfaz CLI amigable con **Inquirer**.

Este proyecto es la evolución de la versión anterior que usaba **persistencia en archivos JSON** y **Lodash**. En esta entrega, migramos toda la lógica de almacenamiento a **MongoDB**, manteniendo la modularidad y mejorando la experiencia de usuario.

---

## 🚀 Características principales

* 📂 **Modularización del proyecto** con carpetas organizadas.
* 🗄️ **Persistencia en MongoDB** usando el driver oficial.
* 🔍 **Operaciones CRUD completas**:

  * Crear tarea
  * Listar (todas, completadas, pendientes)
  * Marcar como completada
  * Eliminar tareas
* 🛠️ **Validaciones**:

  * No se permiten tareas vacías
  * Confirmación al eliminar
  * Mensajes claros y coloridos en consola con Chalk

---

## 📂 Estructura del proyecto

```
gestor-tareas-entregaMongo/
│── index.js                # Punto de entrada
│── package.json            # Dependencias y scripts
│── .gitignore
│
├── config/
│   └── database.js         # Conexión a MongoDB
│
├── controllers/
│   └── tareasController.js # Lógica de negocio (CRUD)
│
├── models/
│   ├── Tarea.js            # Definición de la colección
│   └── esquemaValidation.js# Validación de datos
│
└── utils/
    ├── menu.js             # Menú CLI (Inquirer)
    └── notificador.js      # Notificaciones (Chalk)
```

---

## ⚙️ Requisitos previos

* Tener **Node.js** instalado .
* Tener una base de datos **MongoDB** (local o en Atlas).
* Conexión a internet (si usas MongoDB Atlas).

---

## 🔧 Instalación

1. Clonar este repositorio:

   ```bash
   git clone https://github.com/Sebas404040/gestor-tareas/tree/entregaMongo
   cd gestor-tareas-entregaMongo
   ```

2. Instalar dependencias:

   ```bash
   npm install
   ```

3. Configurar la conexión a MongoDB:

   * Crea un archivo `.env` en la raíz del proyecto.
   * Agrega tu URI de conexión:

   

---

## ▶️ Ejecución

Ejecuta el programa con:

```bash
node index.js
```

Se abrirá el menú interactivo en consola con las siguientes opciones:

* ➕ Crear nueva tarea
* 📋 Listar tareas (todas / completadas / pendientes)
* ✅ Marcar tareas como completadas
* 🗑️ Eliminar tareas

---

## 📦 Dependencias principales

| Paquete  | Uso                                             |
| -------- | ----------------------------------------------- |
| inquirer | Menús interactivos en la consola                |
| mongodb  | Driver oficial de conexión a MongoDB            |
| chalk    | Colores y estilos en los mensajes de consola    |
| dotenv   | Manejo de variables de entorno (URI de MongoDB) |

---

## 📖 Notas

* La primera versión del proyecto con **persistencia en archivos (fs)** está en la rama principal.
* La versión actual con **MongoDB** está en una **rama separada** para no modificar la entrega anterior.

---

## ✅ Entregable

* Código modular, limpio y documentado.
* CRUD funcional conectado a MongoDB.
* README con instrucciones claras de instalación y ejecución.
## 🤝​Autores
- Sebastion Gómez

- Michel Rodríguez
