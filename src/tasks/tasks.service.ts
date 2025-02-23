import { Injectable } from "@nestjs/common";
import { CreateTaskDto } from "./dto/create-task.dto";
import { Task } from "@prisma/client";
import { PrismaService } from "prisma/prisma.service";
import { UpdateTaskDto } from "./dto/update-task.dto";


@Injectable()
export class TasksService {

  constructor(private readonly prismaService: PrismaService) { }

  async getAll(): Promise<Task[]> {
    return await this.prismaService.task.findMany();
  }

  async createOne(dto: CreateTaskDto): Promise<Task> {
    const task = await this.prismaService.task.create({
      data: dto
    })
    return task;
  }

  async updateTask(id: number, dto: UpdateTaskDto): Promise<Task> {
    const task = await this.getOneTask(id);
    const updatedTask = await this.prismaService.task.update({ where: { id }, data: dto });
    return updatedTask;
  }


  async deleteTask(id: number): Promise<Task> {
    const task = await this.getOneTask(id);
    const deletedTask = await this.prismaService.task.delete({ where: { id } });
    return deletedTask;
  }

  public async getOneTask(id: number): Promise<Task> {
    const task = await this.prismaService.task.findUnique({
      where: { id }
    })
    if (!task) {
      throw new Error('Task not found');
    }
    return task;


  }
}