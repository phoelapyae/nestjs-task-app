import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './tasks/task.entity';
import { DataSource } from 'typeorm';

@Module({
  imports: [
    TasksModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      database: 'task-managemeent',
      username: 'postgres',
      password: 'password',
      // autoLoadEntities: true,
      entities: [Task],
      synchronize: true
    })
  ],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
