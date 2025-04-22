import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { TaskRepository } from "./tasks.repository";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";
import { User } from "src/auth/user.entity";
 
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository
  ) { }

  async getTasks(filterDto: GetTasksFilterDto, user: User): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto, user);
  }
    
  async getTaskById(id: number, user: User): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id, user } });
    if (!found) throw new NotFoundException(`Task with ID ${id} not found!`);
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto, user: User): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto, user);
  }

  async updateTaskStatus(id: number, status: TaskStatus, user: User): Promise<Task> {
    const task = await this.getTaskById(id, user);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: number, user: User): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id, user } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found!`);
    return this.tasksRepository.deleteById(task);
  }
}