import { Request, Response } from 'express'
import Chef from '../models/chef'
import Tournament from '../models/tournament'
import TournamentParticipation from '../models/tournament-participation'
import {
  ChefWithParticipation,
  TournamentWithChefs
} from '../types/association-types'

export const createTournament = async (req: Request, res: Response) => {
  const { name, location, maxChefs } = req.body

  if (!name || !location || maxChefs === undefined) {
    res
      .status(400)
      .json({ error: 'Faltan campos requeridos: name, location, maxChefs' })
    return
  }

  if (typeof maxChefs !== 'number' || maxChefs <= 0) {
    res
      .status(400)
      .json({ error: 'El campo maxChefs debe ser un número mayor que 0' })
    return
  }

  try {
    const id = 'tournament_' + Math.random().toString(36).substr(2, 9)
    const newTournament = await Tournament.create({
      id,
      name,
      location,
      maxChefs
    })

    res.status(201).json(newTournament)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el torneo' })
    return
  }
}

export const registerChefInTournament = async (
  req: Request<{
    id: string
  }>,
  res: Response
) => {
  const tournamentId: string = req.params.id
  const { chefId } = req.body

  if (!chefId) {
    res.status(400).json({ error: 'El campo chefId es requerido' })
    return
  }

  try {
    const tournament = await Tournament.findByPk(tournamentId)
    if (!tournament) {
      res.status(404).json({ error: 'Torneo no encontrado' })
      return
    }

    const chef = await Chef.findByPk(chefId)
    if (!chef) {
      res.status(404).json({ error: 'Chef no encontrado' })
      return
    }

    const alreadyRegistered = await TournamentParticipation.findOne({
      where: { tournamentId, chefId }
    })

    if (alreadyRegistered) {
      res.status(400).json({ error: 'El chef ya está registrado en este torneo' })
      return
    }

    const count = await TournamentParticipation.count({ where: { tournamentId } })
    if (count >= tournament.maxChefs) {
      res
        .status(400)
        .json({ error: 'El torneo ya alcanzó el número máximo de participantes' })
      return
    }

    await TournamentParticipation.create({
      tournamentId,
      chefId,
      score: null
    })

    res.status(200).json({
      message: 'Chef registrado correctamente en el torneo',
      tournamentId,
      chef
    })
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al registrar el chef en el torneo' })
    return
  }
}

export const submitResult = async (req: Request, res: Response) => {
  const tournamentId: string = req.params.id
  const { chefId, score } = req.body

  if (!chefId || score === undefined) {
    res.status(400).json({ error: 'Se requieren los campos chefId y score' })
    return
  }

  if (typeof score !== 'number' || score < 0 || score > 100) {
    res.status(400).json({ error: 'El score debe estar entre 0 y 100' })
    return
  }

  try {
    const tournament = await Tournament.findByPk(tournamentId)
    if (!tournament) {
      res.status(404).json({ error: 'Torneo no encontrado' })
      return
    }

    const participation = await TournamentParticipation.findOne({
      where: { tournamentId, chefId }
    })

    if (!participation) {
      res.status(400).json({ error: 'El chef no está registrado en este torneo' })
      return
    }

    await participation.update({ score })

    res.status(200).json({
      message: 'Resultado registrado correctamente',
      chefId,
      score
    })
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}

export const getTournamentRanking = async (req: Request, res: Response) => {
  const tournamentId: string = req.params.id

  try {
    const tournament = await Tournament.findByPk(tournamentId, {
      include: [
        {
          model: Chef,
          as: 'chefs',
          through: { attributes: ['score'] }
        }
      ]
    })

    if (!tournament) {
      res.status(404).json({ error: 'Torneo no encontrado' })
      return
    }

    const tournamentWithChefs = tournament.toJSON() as TournamentWithChefs

    const rankingArr = tournamentWithChefs.chefs
      .filter(
        (chef: ChefWithParticipation) =>
          chef.TournamentParticipation && chef.TournamentParticipation.score !== null
      )
      .map((chef: ChefWithParticipation) => ({
        chef: chef.name,
        score: chef.TournamentParticipation.score as number
      }))
      .sort((a, b) => b.score - a.score)

    res.status(200).json({
      tournament: tournamentWithChefs.name,
      location: tournamentWithChefs.location,
      ranking: rankingArr
    })
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error interno del servidor' })
    return
  }
}
