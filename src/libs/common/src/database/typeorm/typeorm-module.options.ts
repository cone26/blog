import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const defaultTypeOrmOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: 3306,
  //Number(process.env.DB_PORT),
  username: 'admin',
  // process.env.DB_USER_NAME,
  password: 'ghkdtldnjs1',
  //process.env.DB_USER_PW,
  synchronize: true,
  //process.env.DB_SYNCHRONIZE && JSON.parse(process.env.DB_SYNCHRONIZE),
  name: 'blog',
  //process.env.DB_NAME,
  database: 'blog',
  // process.env.DB_NAME,
  entities: ['dist/libs/dao/src/**/*.entity.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
  // charset: 'utf8m4',
  timezone: 'Z',
  // logging: ['query']
};
