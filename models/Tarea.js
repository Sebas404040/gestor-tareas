class Tarea {
    constructor(id, descripcion, completada) {
        if (!id) {
            throw new Error("El ID es obligatorio.");
        }
        if (typeof descripcion !== 'string' || descripcion.trim().length === 0) {
            throw new Error("La descripción no puede estar vacía.");
        }
        if (typeof completada !== "boolean") {
            throw new Error("El atributo 'completada' debe ser un booleano.");
        }
        
        this.id = id;
        this.descripcion = descripcion.trim();
        this.completada = completada;
    }

    alternarEstado() {
        this.completada = !this.completada;
    }
}

export default Tarea;