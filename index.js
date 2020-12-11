const express = require('express')

const server = express()

server.use(express.json())

server.use((req, res,next) => {
    console.count('numero requisiçao')
    next()
})

function checkProjectExists(req, res, next) {

    const { id } = req.params;
    
    //encontrar se o "id params", esta em "id dados"
    const project = dados.find(p => p.id == id);
  
    //se nao estiver
    if (!project) {
      return res.status(400).json({ error: 'Projeto nao encontrado' });
    }
  
    return next();
  }
/**
 * A rota deve receber id e title dentro do corpo e cadastrar um novo projeto dentro de um array no seguinte formato:
 * { id: "1", title: 'Novo projeto', tasks: [] };
 * Certifique-se de enviar tanto o ID quanto o título do projeto no formato string com aspas duplas
 */

const dados = []

server.post('/projects', (req, res) => {
    //parametros que vai ser passado no corpo
    const { id } = req.body

    const { title } = req.body

    dados.push(
        
            {
                id: id,
                title: title,
                tasks: ["Nova tarefa"]
             }
        
         
    )
return res.json({message: 'add'})
})

server.get('/projects/', (req, res) => {

    return res.json(dados)

})

server.put('/projects/:id', checkProjectExists, (req, res) => {

    const { id } = req.params

    const { titulo } = req.body

    dados[id].title = titulo

    return res.json(dados)

})

server.delete('/projects/:id', checkProjectExists,(req, res) => {
    
    const { id } = req.params

    dados.splice(id, 1)

    return res.json(dados)
})

server.listen(3000)