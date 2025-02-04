import app from './app'
import sequelize from './config/database'
import config from './config/env.config'
import Chef from './models/chef'
import Tournament from './models/tournament'
import TournamentParticipation from './models/tournament-participation'

async function main() {
  const start = async () => {
    try {
      await sequelize.authenticate()
      console.log('Conexión establecida exitosamente.')

      await Chef.sync()
      await Tournament.sync()
      await TournamentParticipation.sync()

      console.log('Tablas sincronizadas exitosamente.')
    } catch (error) {
      console.error('No se pudo conectar a la base de datos:', error)
    }
  }
  await start()

  const PORT = config.PORT

  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`)
  })
}

main()
