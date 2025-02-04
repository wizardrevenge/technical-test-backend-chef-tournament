import dotenv from 'dotenv'

dotenv.config()

const config = {
  PORT: process.env.PORT || 3000,
  DATABASE_HOST: process.env.HOST || 'localhost',
  DATABASE_USER: process.env.USER || 'root',
  DATABASE_PASSWORD: process.env.PASSWORD || '1234',
  DATABASE_NAME: process.env.DATABASE || 'chef_tournament',
  DATABASE_PORT: parseInt(process.env.DATABASE_PORT!) || 3306
}

export default config
