 CREATE DATABASE IF NOT EXISTS chef_tournament ;
  USE chef_tournament;

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