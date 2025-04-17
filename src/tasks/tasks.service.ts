import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { TaskRepository } from "./tasks.repository";
 
 
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(TaskRepository)
        private tasksRepository: TaskRepository
    ) { }
    
  async getTaskById(id: number): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Task with ID ${id} not found!`);
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const { title, description } = createTaskDto;
    const task = this.tasksRepository.create({
      title,
      description,
      status: TaskStatus.OPEN
    });
    await this.tasksRepository.save(task);
    return task;
  }
}