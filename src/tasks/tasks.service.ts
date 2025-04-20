import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateTaskDto } from "./dto/create-task.dto";
import { TaskStatus } from "./task-status.enum";
import { TaskRepository } from "./tasks.repository";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";
 
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(TaskRepository)
    private tasksRepository: TaskRepository
  ) { }

  async getTasks(filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.tasksRepository.getTasks(filterDto);
  }
    
  async getTaskById(id: number): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Task with ID ${id} not found!`);
    return found;
  }

  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksRepository.createTask(createTaskDto);
  }

  async updateTaskStatus(id: number, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.tasksRepository.save(task);
    return task;
  }

  async deleteTaskById(id: number): Promise<void> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) throw new NotFoundException(`Task with ID ${id} not found!`);
    return this.tasksRepository.deleteById(task);
  }
}