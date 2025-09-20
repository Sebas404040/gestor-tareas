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

## ⚙️ Cómo se configuró la conexión a MongoDB

Para conectar la aplicación a una base de datos remota en **MongoDB Atlas**, se siguió un proceso cuidadoso para proteger las credenciales y asegurar una conexión reutilizable y eficiente.

### Proceso de Conexión 🛞

Antes de iniciar con el proceso se debe instalar la libreria de mongodb

```javascript
import { MongoClient } from "mongodb";
```

1.  **Uso de Variables de Entorno**: Para evitar exponer datos sensibles (como usuarios y contraseñas) en el código fuente, se utilizó la librería `dotenv`. Esto nos permite definir las credenciales en un archivo `.env` que no se sube al repositorio de código.

    *   En la raíz del proyecto, crea un archivo `.env`.
    *   Dentro de este archivo, define las siguientes variables con tus datos de Atlas:
        ```dotenv
        # Credenciales de MongoDB Atlas
        DB_USER="tu_usuario_de_base_de_datos"
        DB_PASSWORD="tu_contraseña_de_base_de_datos"
        DB_CLUSTER="tu_cluster.mongodb.net"
        DB_NAME="nombre_de_tu_base_de_datos"
        ```

2.  **Construcción Dinámica de la URI**: En el archivo `config/database.js`, se importan estas variables de entorno desde `process.env` y se utilizan para construir dinámicamente la cadena de conexión (URI) de MongoDB.
    ```javascript
    const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;
    ```

3.  **Patrón de Diseño Singleton**: Se implementó una clase `Database` utilizando el patrón Singleton. Esto asegura que solo exista una única instancia de la conexión a la base de datos en toda la aplicación. El método `realizarConexion()` verifica si ya existe una conexión activa (`this.db !== null`); si no es así, la crea. Esto evita abrir y cerrar múltiples conexiones innecesariamente, mejorando el rendimiento.

4.  **Gestión de la Conexión**:
    *   **`realizarConexion()`**: Este método asíncrono se encarga de conectar el cliente a MongoDB Atlas y selecciona la base de datos especificada en `DB_NAME`.
    *   **`getCollection(name)`**: Proporciona un acceso sencillo a cualquier colección de la base de datos, reutilizando la conexión ya establecida.
    *   **`desconectar()`**: Cierra la conexión de forma segura cuando la aplicación termina.

Este enfoque modular y seguro, centralizado en `config/database.js`, permite que el resto de la aplicación (como los controladores) interactúe con la base de datos de una manera limpia y abstraída.


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

