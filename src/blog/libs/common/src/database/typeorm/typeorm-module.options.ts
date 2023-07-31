import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

export const defaultTypeOrmOptions: DataSourceOptions = {
  type: 'mysql',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USER_NAME,
  password: process.env.DB_USER_PW,
  synchronize:
    process.env.DB_SYNCHRONIZE && JSON.parse(process.env.DB_SYNCHRONIZE),
  name: process.env.DB_NAME,
  database: process.env.DB_NAME,
  entities: ['dist/blog/libs/dao/src/**/*.entity.{ts,js}'],
  namingStrategy: new SnakeNamingStrategy(),
  // charset: 'utf8m4',
  timezone: 'Z',
  // logging: ['query']
};
