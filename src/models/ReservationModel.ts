import { DataTypes, Model } from 'sequelize';
import sequelize from '../config/MySQLProvider'; // Usar la instancia de Sequelize para la conexión

class Reservation extends Model {
  public id!: number;
  public usuario_id!: number;
  public tipo_reserva!: string;
  public referencia_mongo_id!: string;
  public fecha_reserva!: Date;
  public estado!: string;  // Agregado el estado
}

Reservation.init(
  {
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    tipo_reserva: {
      type: DataTypes.ENUM('hotel', 'vuelo', 'bus'),
      allowNull: false,
    },
    referencia_mongo_id: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    fecha_reserva: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.ENUM('pendiente', 'confirmada', 'cancelada'),
      defaultValue: 'pendiente',
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Reserva',
    tableName: 'reservas',
    timestamps: false,  // Si no usas las fechas createdAt y updatedAt
  }
);

export default Reservation;
