import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';

import { Task } from '@prisma/client';
import { UpdateTaskDto } from './dto/update-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) { }


  @Get()
  async getAll(): Promise<Task[]> {
    return this.tasksService.getAll();
  }

  @Patch(':id')
  async updateTask(@Param('id') id: number, @Body() dto: UpdateTaskDto): Promise<Task> {
    return this.tasksService.updateTask(id, dto);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<Task> {
    return this.tasksService.deleteTask(id);
  }
  
  @Get(':id')
  async getOneTask(@Param('id') id: number): Promise<Task> {
    return this.tasksService.getOneTask(id);
  }

  @Post()
  async createOne(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createOne(dto);
  }

}
