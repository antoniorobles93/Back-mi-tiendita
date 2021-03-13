import { Pool } from 'pg';

export const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    password: '123',
    database: 'prueba_db',
    port: 5432
});