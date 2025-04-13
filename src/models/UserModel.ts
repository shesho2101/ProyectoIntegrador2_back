import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/MySQLProvider'; // Usar la instancia de Sequelize para la conexión

// Interfaz IUser para tipos de datos del modelo
export interface IUser {
  id?: number;
  nombre: string;
  email: string;
  password_hash: string;
  password?: string;
}

class User extends Model<IUser> {
  public id!: number;
  public nombre!: string;
  public email!: string;
  public password_hash!: string;
  public password?: string;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
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
    password: {
      type: DataTypes.VIRTUAL, // El campo password no se guarda en la base de datos
      set(value: string) {
        // Usamos este campo solo para la comparación en login, no se guarda
        this.setDataValue('password', value);
      }
    }
  },
  {
    sequelize, // Usar la instancia correcta de Sequelize
    modelName: 'User',
    tableName: 'usuarios',
    timestamps: true,
  }
);

export default User;
