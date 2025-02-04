import { ChefAttributes } from '../models/chef'
import { TournamentAttributes } from '../models/tournament'
import { TournamentParticipationAttributes } from '../models/tournament-participation'

export interface ChefWithParticipation extends ChefAttributes {
  TournamentParticipation: TournamentParticipationAttributes
}

export interface TournamentWithChefs extends TournamentAttributes {
  chefs: ChefWithParticipation[]
}
