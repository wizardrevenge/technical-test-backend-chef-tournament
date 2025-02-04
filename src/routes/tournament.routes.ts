import { Router } from 'express'
import {
  createTournament,
  getTournamentRanking,
  registerChefInTournament,
  submitResult
} from '../controllers/tournament.controller'

const router = Router()

router
  .post('/tournaments', createTournament)
  .post('/tournaments/:id/register', registerChefInTournament)
  .post('/tournaments/:id/submit', submitResult)
  .get('/tournaments/:id/ranking', getTournamentRanking)

export default router
