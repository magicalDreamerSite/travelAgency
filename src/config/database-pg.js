import pg from 'pg';
import {POSTGREE_DB, POSTGREE_HOST, POSTGREE_PORT, POSTGREE_USER, POSTGREE_PASS } from './config.js';

const {Pool} = pg
console.log('Connecting to Postgree DB');
export const pool = new Pool({
    host: POSTGREE_HOST,
    port: POSTGREE_PORT,
    user: POSTGREE_USER,
    password: POSTGREE_PASS,
    database: POSTGREE_DB});

    console.log('DB PG is connected'  );




