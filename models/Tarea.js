// Se define la clase Tarea con validaciones en el constructor
class Tarea {

    // Se construyen los atributos de la tarea
    constructor(id, descripcion, completada) {

        // Validaciones básicas
        if (!id) {
            throw new Error("El ID es obligatorio.");
        }
        if (typeof descripcion !== 'string' || descripcion.trim().length === 0) {
            throw new Error("La descripción no puede estar vacía.");
        }
        if (typeof completada !== "boolean") {
            throw new Error("El atributo 'completada' debe ser un booleano.");
        }
    
        // Se asignan los valores a los atributos
        this._id = id 
        this.descripcion = descripcion.trim();
        this.completada = completada;
    }
}

export default Tarea;