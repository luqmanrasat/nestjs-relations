import { PostgresConnectionOptions } from "typeorm/driver/postgres/PostgresConnectionOptions";

const config: PostgresConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  database: 'postgres',
  username: 'postgres',
  password: 'pass123',
  entities: ['dist/**/*.entity.js'],
  synchronize: false,
  logging: true,
};

export default config;
