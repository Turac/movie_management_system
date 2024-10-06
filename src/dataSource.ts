import { DataSource, DataSourceOptions } from 'typeorm';

export const drSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'admin',
  password: 'admin',
  database: 'movie_management_system',
  synchronize: true,
  migrationsRun: true,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/{.ts,.js}'],
};
const dataSource = new DataSource(drSourceOptions);
export default dataSource;
