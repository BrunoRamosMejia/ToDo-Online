import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './entities/task.entity';
import { Repository } from 'typeorm';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class TasksService {
  constructor (
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  // CREAR TAREA SERVICE
  async create(createTaskDto: CreateTaskDto, userId: string) {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) throw new NotFoundException("Usuario no encontrado")

    const newTask = this.taskRepository.create({
      ...createTaskDto,
      user: { id: userId },
      status: false,
      date: new Date(),
    })

    return await this.taskRepository.save(newTask)
  }

  // OBTENER TODAS LAS TAREAS SERVICE
  async findAll() {
    return await this.taskRepository.find();
  }

  // OBTENER TAREAS POR USERID SERVICE
  async findTasksByUser(userId: string) {
    return await this.taskRepository.find({
      where: {
        user: { id: userId }
      },
    });
  }

  // update(id: number, updateTaskDto: UpdateTaskDto) {
  //   return `This action updates a #${id} task`;
  // }

  async updateTaskStatus(taskId: string, status: boolean) {
    const task = await this.taskRepository.findOneBy({ id: taskId })
    if (!task) {
      throw new NotFoundException('Tarea no encontrada');
    };

    task.status = status;
    return await this.taskRepository.save(task);
  }

  remove(id: number) {
    return `This action removes a #${id} task`;
  }
}
