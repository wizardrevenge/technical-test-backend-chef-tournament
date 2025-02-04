import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

export interface TournamentAttributes {
  id: string
  name: string
  location: string
  maxChefs: number
}

export class Tournament
  extends Model<TournamentAttributes>
  implements TournamentAttributes
{
  public id!: string
  public name!: string
  public location!: string
  public maxChefs!: number
}

Tournament.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    location: {
      type: DataTypes.STRING,
      allowNull: false
    },
    maxChefs: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Tournament',
    tableName: 'tournaments'
  }
)

export default Tournament
