import { MongoClient } from "mongodb";
import 'dotenv/config';

const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_CLUSTER = process.env.DB_CLUSTER;
const DB_NAME = process.env.DB_NAME;

const URI = `mongodb+srv://${DB_USER}:${DB_PASSWORD}@${DB_CLUSTER}/?retryWrites=true&w=majority&appName=Cluster0`;

class Database {
    constructor() {
        this.cliente = new MongoClient(URI);
        this.db = null;
    }

    async realizarConexion() {
        if (this.db === null) {
            try {
                await this.cliente.connect();
                this.db = this.cliente.db(DB_NAME);
                console.log("Conexión exitosa a la base de datos");
            } catch (error) {
                console.error("Error al conectar a la base de datos:", error);
                this.db = null; 
                throw error; 
            }
        }
        return this.db;
    }

    async getCollection(name) {
        const db = await this.realizarConexion();
        return db.collection(name);
    }

    async desconectar() {
        if (this.db) {
            try {
                await this.cliente.close();
                this.db = null;
                console.log("Desconectado de la base de datos.");
            } catch (error) {
                console.error("Error al desconectar:", error);
                throw error;
            }
        }
    }
}

const database = new Database();
export default database;