// src/models/FavoriteModel.ts
import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/MySQLProvider'; // Usar la instancia de Sequelize para la conexión

class Favorite extends Model {
  public id!: number;
  public usuario_id!: number;
  public tipo_favorito!: string;
  public referencia_mongo_id!: string;
}

Favorite.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_favorito: {
      type: DataTypes.ENUM('hotel', 'vuelo', 'bus'),
      allowNull: false,
    },
    referencia_mongo_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Favorite',
    tableName: 'favoritos',
    timestamps: false,
  }
);

export default Favorite;
