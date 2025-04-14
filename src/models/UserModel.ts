import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/MySQLProvider'; // Usar la instancia de Sequelize para la conexión

class User extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password_hash!: string;
  public fecha_registro!: Date;
}

User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password_hash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_registro: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: DataTypes.NOW,
    }
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: false,  // No utilizamos createdAt ni updatedAt en este caso
  }
);

export default User;
