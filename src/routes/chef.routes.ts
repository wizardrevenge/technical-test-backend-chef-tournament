import { Router } from 'express'
import { registerChef } from '../controllers/chef.controller'

const router = Router()

router.post('/chefs', registerChef)

export default router
