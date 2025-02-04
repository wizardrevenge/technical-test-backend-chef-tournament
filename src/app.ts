import express from 'express'
import chefRoutes from './routes/chef.routes'
import tournamentRoutes from './routes/tournament.routes'

const app = express()

app.use(express.json())

app.use(chefRoutes)
app.use(tournamentRoutes)

app.use((_req, res) => {
  res.status(404).json({ error: 'Ruta no encontrada' })
})

app.use((err: Error, _req: express.Request, res: express.Response) => {
  console.error(err)
  res.status(500).json({ error: 'Error interno del servidor' })
})

export default app
