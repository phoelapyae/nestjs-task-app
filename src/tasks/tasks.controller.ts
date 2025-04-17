import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
 
@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) {}
 
  @Get("/:id")
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }
}