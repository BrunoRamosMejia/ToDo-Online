import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { JwtAuthGuard } from 'src/auth/guards/auth.guard';

@Controller('tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  // CREAR TAREA ENDPOINT (enviar el userId mediante el body)
  @Post()
  async create(@Body() createTaskDto: CreateTaskDto) {
    const { userId } = createTaskDto;
    return await this.tasksService.create(createTaskDto, userId);
  }

  //OBTENER TODAS LAS TAREAS SERVICE
  @Get()
  async findAll() {
    return await this.tasksService.findAll();
  }

  @Get(':id')
  async findTasksByUser(@Param('id') userId: string) {
    return await this.tasksService.findTasksByUser(userId);
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateTaskDto: UpdateTaskDto) {
  //   return this.tasksService.update(+id, updateTaskDto);
  // }

  @Patch(':id')
  async updateTaskStatus(
    @Param('id') taskId: string,
    @Body('status') status: boolean
  ) {
    return await this.tasksService.updateTaskStatus(taskId, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tasksService.remove(+id);
  }
}
