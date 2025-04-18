import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { TasksService } from "./tasks.service";
import { Task } from "./task.entity";
import { CreateTaskDto } from "./dto/create-task.dto";
import { UpdateTaskStatusDto } from "./dto/update-task-status.dto";
import { GetTasksFilterDto } from "./dto/get-tasks-filter-dto";
 
@Controller("tasks")
export class TasksController {
  constructor(private taskService: TasksService) { }
  
  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Promise<Task[]> {
    return this.taskService.getTasks(filterDto);
  }
 
  @Get("/:id")
  getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(id);
  }

  @Post()
  createTask(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.taskService.createTask(createTaskDto);
  }

  @Patch('/:id/status')
  updateStatus(
    @Param('id') id: number,
    @Body() updateStatusDto: UpdateTaskStatusDto
  ): Promise<Task> {
    const { status } = updateStatusDto;
    return this.taskService.updateTaskStatus(id, status);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: number): Promise<void> {
    return this.taskService.deleteTaskById(id);
  }
}