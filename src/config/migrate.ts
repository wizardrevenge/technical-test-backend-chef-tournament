import mysql from 'mysql2/promise'
import config from './env.config.js'

async function runMigrations() {
  let connection
  try {
    connection = await mysql.createConnection({
      host: config.DATABASE_HOST,
      user: config.DATABASE_USER,
      password: config.DATABASE_PASSWORD,
      port: config.DATABASE_PORT,
      multipleStatements: true
    })
    console.log('Conexión establecida.')

    const migrationQueries = `
    CREATE DATABASE IF NOT EXISTS \`${config.DATABASE_NAME}\`;
    USE \`${config.DATABASE_NAME}\`;
  
    CREATE TABLE IF NOT EXISTS chefs (
      id VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL,
      specialty VARCHAR(255) NOT NULL,
      experienceYears INT NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      PRIMARY KEY (id)
    );
  
    CREATE TABLE IF NOT EXISTS tournaments (
      id VARCHAR(50) NOT NULL,
      name VARCHAR(255) NOT NULL,
      location VARCHAR(255) NOT NULL,
      maxChefs INT NOT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      PRIMARY KEY (id)
    );
  
    CREATE TABLE IF NOT EXISTS tournament_participations (
      tournamentId VARCHAR(50) NOT NULL,
      chefId VARCHAR(50) NOT NULL,
      score INT NULL,
      createdAt DATETIME NOT NULL,
      updatedAt DATETIME NOT NULL,
      PRIMARY KEY (tournamentId, chefId),
      CONSTRAINT fk_tournament
        FOREIGN KEY (tournamentId) REFERENCES tournaments(id)
        ON DELETE CASCADE,
      CONSTRAINT fk_chef
        FOREIGN KEY (chefId) REFERENCES chefs(id)
        ON DELETE CASCADE
    );
  `

    await connection.query(migrationQueries)
    console.log('Migraciones ejecutadas correctamente.')
  } catch (error) {
    console.error('Error al ejecutar migraciones:', error)
  } finally {
    if (connection) {
      await connection.end()
      console.log('Conexión cerrada.')
    }
  }
}

runMigrations()
