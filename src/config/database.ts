import { Sequelize } from 'sequelize'
import config from './env.config'

const sequelize = new Sequelize(
  config.DATABASE_NAME,
  config.DATABASE_USER,
  config.DATABASE_PASSWORD,
  {
    host: config.DATABASE_HOST,
    dialect: 'mysql',
    logging: true,
    port: config.DATABASE_PORT
  }
)

export default sequelize
