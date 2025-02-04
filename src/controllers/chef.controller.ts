import { Request, Response } from 'express'
import Chef from '../models/chef'

export const registerChef = async (req: Request, res: Response) => {
  const { name, specialty, experienceYears } = req.body

  if (!name || !specialty || experienceYears === undefined) {
    res.status(400).json({
      error: 'Faltan campos requeridos: name, specialty, experienceYears'
    })
    return
  }

  if (typeof experienceYears !== 'number' || experienceYears < 0) {
    res
      .status(400)
      .json({ error: 'El campo experienceYears debe ser un número positivo' })
    return
  }

  try {
    const id = 'chef_' + Math.random().toString(36).substr(2, 9)
    const newChef = await Chef.create({
      id,
      name,
      experienceYears,
      specialty
    })

    res.status(201).json(newChef)
    return
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: 'Error al crear el chef' })
    return
  }
}
