import Database from "../model/Database";
import DatabaseClient from "../model/DatabaseClient";

const client: DatabaseClient = new DatabaseClient(new URL("mongodb://mongodb0.example.com:27017/admin"));
const key: string;
const iv: Buffer;

export const main: Database = client.db("main", key, iv);

