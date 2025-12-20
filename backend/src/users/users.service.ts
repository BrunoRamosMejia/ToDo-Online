import { BadRequestException, Injectable } from '@nestjs/common';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>
  ) {}

  // OBTENER TODOS LOS USUARIOS
  async findAll() {
    return await this.userRepository.find();
  }

  // BUSCAR USUARIO POR ID (FILTRADO)
  async findOne(id: string) {
    const foundUser = await this.userRepository.findOneBy({
      id: id,
    });

    if (!foundUser) throw new BadRequestException("Usuario no encontrado")

    return {
      id: foundUser.id,
      name: foundUser.name,
      email: foundUser.email,
      profileImg: foundUser.profileImg,
      tasks: foundUser.tasks,
    };
  }

  // BUSCAR USUARIO POR EMAIL
  async findByEmail(email: string) {
    const foundUser = await this.userRepository.findOneBy({ email });
    if (!foundUser) return null;
    return foundUser;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
