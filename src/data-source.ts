import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as dotenv from 'dotenv';
import { Task } from './tasks/task.entity';
import { Tag } from './tags/tag.entity';

dotenv.config();

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: process.env.DB_HOST || 'localhost',
  port: +(process.env.DB_PORT || 5432),
  username: process.env.DB_USER || 'postgres',
  password: process.env.DB_PASSWORD || 'postgres',
  database: process.env.DB_NAME || 'lab8',
  entities: [Task, Tag],
  migrations: ['src/migrations/*.ts'],
  synchronize: false,
});

export default AppDataSource;
