import express, { } from "express";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const app = express()
app.use(express.json())

const users = []

app.post('/usuarios', async (req, res) => {
    await prisma.user.create({
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.delete('/usuarios/:id', async (req, res) => {
    await prisma.user.delete({
        where: {
            id: req.params.id
        }
    })
    res.status(200).json({ message: 'Usuário deletado com Sucesso!' })


})


app.get('/usuarios', async (req, res) => {

    const users = await prisma.user.findMany()


    /* aqui está voltando o status 200, dizendo que deu certo */
    res.status(200).json(users)
})
/* /usuarios/: com esses pontinhos vai vim uma variavel, ai vc escolhe */
app.put('/usuarios/:id', async (req, res) => {

    await prisma.user.update({
        where: {
            id: req.params.id
        },
        data: {
            email: req.body.email,
            name: req.body.name,
            age: req.body.age
        }
    })
    res.status(201).json(req.body)
})

app.listen(3000)

/* 
    Criar nossa API de usuários

     - Criar um usuário
     - Listar todos os usuarios
     - Editar um usuário
     - Deletar um usuário

*/


/* 
    !) Tipo de Rota / Método HTTP
    2) Endereço
*/