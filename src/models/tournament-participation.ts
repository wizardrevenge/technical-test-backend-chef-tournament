import { DataTypes, Model, Optional } from 'sequelize'
import sequelize from '../config/database'
import Chef from './chef'
import Tournament from './tournament'

export interface TournamentParticipationAttributes {
  tournamentId: string
  chefId: string
  score: number | null
}

export type TournamentParticipationCreationAttributes = Optional<
  TournamentParticipationAttributes,
  'score'
>

export class TournamentParticipation
  extends Model<
    TournamentParticipationAttributes,
    TournamentParticipationCreationAttributes
  >
  implements TournamentParticipationAttributes
{
  public tournamentId!: string
  public chefId!: string
  public score!: number | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

TournamentParticipation.init(
  {
    tournamentId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Tournament,
        key: 'id'
      }
    },
    chefId: {
      type: DataTypes.STRING,
      allowNull: false,
      primaryKey: true,
      references: {
        model: Chef,
        key: 'id'
      }
    },
    score: {
      type: DataTypes.INTEGER,
      allowNull: true,
      validate: {
        min: 0,
        max: 100
      }
    }
  },
  {
    sequelize,
    modelName: 'TournamentParticipation',
    tableName: 'tournament_participations',
    timestamps: true
  }
)

Tournament.belongsToMany(Chef, {
  through: TournamentParticipation,
  foreignKey: 'tournamentId',
  as: 'chefs'
})

Chef.belongsToMany(Tournament, {
  through: TournamentParticipation,
  foreignKey: 'chefId',
  as: 'tournaments'
})

export default TournamentParticipation
