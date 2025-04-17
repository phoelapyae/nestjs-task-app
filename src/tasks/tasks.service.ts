import { Injectable, NotFoundException } from "@nestjs/common";
import { Task } from "./task.entity";
import { Repository } from "typeorm";
import { InjectRepository } from "@nestjs/typeorm";
 
 
@Injectable()
export class TasksService {
    constructor(
        @InjectRepository(Task)
        private tasksRepository: Repository<Task>
    ) { }
    
  async getTaskById(id: number): Promise<Task> {
    const found = await this.tasksRepository.findOne({ where: { id } });
    if (!found) throw new NotFoundException(`Task with ID ${id} not found!`);
    return found;
  }
}