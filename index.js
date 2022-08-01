const express = require('express')
const cors = require('cors')

const app = express()

app.use(express.json())
app.use(cors())

let notes = [
  {
    'id': 1,
    'content': 'estudiar para fisica y programacion',
    'date': new Date().toISOString()
  },
  {
    'id': 2,
    'content': 'estudiar para quimica',
    'date': new Date().toISOString()
  },
  {
    'id': 3,
    'content': 'estudiar para lenguaje',
    'date': new Date().toISOString()
  },
  {
    'id': 4,
    'content': 'estudiar para matematicas',
    'date': new Date().toISOString()
  }
]

app.get('/', (request, response) => {
  response.send("<h1>Hello world</h1>")
})

app.get('/api/notes', (request, response) => {
  response.json(notes)
})

app.get('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  const note = notes.find(note => note.id === id)
  if(note){
    response.json(note)
  }else{
    response.status(404).end()
  }
})

app.delete('/api/notes/:id', (request, response) => {
  const id = Number(request.params.id)
  notes = notes.filter(note => note.id !== id)
  response.status(204).end()
})

app.post('/api/notes', (request, response) => {
  const note = request.body

  if(!note || !note.content){
    return response.status(404).json({
      error: 'note.content is missing'
    })
  }
  
  const ids = notes.map(note => note.id)
  const maxId = Math.max(...ids)

  const newNote = {
    id: maxId+1,
    content: note.content,
    date: new Date().toISOString()
  }

  notes = [...notes, newNote]
  response.json(newNote)
})

app.use((request, response) => {
  response.status(404).json({
    error: 'not found'
  })
})

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})