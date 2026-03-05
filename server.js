import Fastify from 'fastify'
import { Pool } from 'pg'


const sql = new Pool({
    user: "postgres",
    password: "senai",
    host: "localhost",
    port: 5432,
    database: "receitas"
})


const servidor = Fastify();


servidor.get('/usuarios', async () => {
    const resultado = await sql.query('select * from usuario')
    return resultado.rows
})


servidor.post('/usuarios', async (request, reply) => {
    const body = request.body;

    if(!body || !body.nome || !body.senha){
        return reply.status(400).send({
            message:"nome e senha são obrigatorios"
        })
    }
    const resultado = await sql.query('INSERT INTO usuario (nome, senha) VALUES ($1, $2)', [body.nome, body.senha])          
    return 'Usuário Cadastrado!'
})


servidor.put('/usuarios/:id', async (request, reply) => {
    const body = request.body;

     if(!body || !body.nome || !body.senha){
        return reply.status(400).send({
            message:"obrigatorio ter iD"
        })
    }
    const id = request.params.id;
    const resultado = await sql.query('UPDATE usuario SET nome = $1, senha = $2 WHERE id = $3', [body.nome, body.senha, id])      
    return 'Usuário Alterado!'  
               
})

servidor.delete('/usuarios/:id', async (request, reply) => {

    const id = request.params.id;
    const resultado = await sql.query('DELETE FROM usuario where id = $1',[id]);
    reply.status(200).send({Mmessage:'Usuário Deletado'})
    console.log(resultado)

});

servidor.listen({   
    port: 3000
})