db.createCollection("tareas", {
    validator: {
      $jsonSchema: {
        bsonType: "object",
        required: ["_id", "descripcion", "completada"],
        properties: {
          descripcion: {
            bsonType: "string",
            description: "Debe ser una cadena no vacía",
            minLength: 1
          },
          completada: {
            bsonType: "bool",
            description: "Debe ser true o false"
          },
          _id: {
            bsonType: "string",
            description: "Debe ser un id valido"
          }
        }
      }
    },
    validationLevel: "strict",
    validationAction: "error"
  });
  