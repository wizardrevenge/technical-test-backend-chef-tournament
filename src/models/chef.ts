import { DataTypes, Model } from 'sequelize'
import sequelize from '../config/database'

export interface ChefAttributes {
  id: string
  name: string
  specialty: string
  experienceYears: number
}

export class Chef extends Model<ChefAttributes> implements ChefAttributes {
  public id!: string
  public name!: string
  public specialty!: string
  public experienceYears!: number
}

Chef.init(
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
    specialty: {
      type: DataTypes.STRING,
      allowNull: false
    },
    experienceYears: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Chef',
    tableName: 'chefs'
  }
)

export default Chef
