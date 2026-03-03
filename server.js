import Fastify from 'fastify';
import { Pool } from 'pg';

const servidor = Fastify();

const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "receitas"
})

servidor.get('/usuarios', () => {
    return 'Funcionando!'
})

servidor.post('/usuarios',async (request, reply) =>{
    const body = request.body;

    const resultado = await   sql.query('select * from usuario')

    return resultado.rows
})

servidor.listen({
    port: 3000
})