import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TasksController } from "./tasks.controller";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { TaskRepository } from "./tasks.repository";
import { AuthModule } from "../auth/auth.module";
 
@Module({
  imports: [TypeOrmModule.forFeature([Task]), AuthModule],
  controllers: [TasksController],
  providers: [TasksService, TaskRepository],
})
export class TasksModule {}