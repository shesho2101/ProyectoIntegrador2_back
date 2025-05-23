import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';
dotenv.config();

// Configura la conexión de Sequelize
const sequelize = new Sequelize(
  process.env.MYSQL_DATABASE || 'railway',
  process.env.MYSQL_USER || 'root',
  process.env.MYSQL_PASSWORD || 'jplJVrJiajSPNOyglrwpVDzNYfudYlOg',
  {
    host: process.env.MYSQL_HOST || 'interchange.proxy.rlwy.net',
    port: Number(process.env.MYSQL_PORT) || 23068,
    dialect: 'mysql',
    logging: false,
  }
);


// Verificar la conexión
sequelize.authenticate()
  .then(() => {
    console.log('Conexión establecida correctamente');
  })
  .catch((error) => {
    console.error('No se pudo conectar a la base de datos:', error);
  });

export default sequelize;
