import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto, LoginUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(User)
        private readonly usersRepository: Repository<User>,
        private readonly jwtService: JwtService
    ) {}

    // REGISTRAR USUARIO (Con Contraseña Encriptada)
    async register(CreateUserDto: CreateUserDto) {
        const foundUser = await this.usersRepository.findOneBy({
            email: CreateUserDto.email,
        })

        if (foundUser) throw new BadRequestException('Email already Registered');

        const hashedPassword = await bcrypt.hash(CreateUserDto.password, 10);

        const newUser: User = this.usersRepository.create({
            ...CreateUserDto,
            password: hashedPassword,
        })

        return this.usersRepository.save(newUser);
    }

    // INICIAR SESION USUARIO
    async login(credentials: LoginUserDto) {
        const foundUser = await this.usersRepository.findOneBy({
            email: credentials.email,
        })

        if (!foundUser) throw new BadRequestException('Bad Credentials');

        const matchingpasswords = await bcrypt.compare(credentials.password, foundUser.password);
        if (!matchingpasswords) throw new BadRequestException('Bad Credentials');

        const payload = {
            id: foundUser.id,
            email: foundUser.email,
        }

        const token = this.jwtService.sign(payload);

        return { login: true, access_token: token};
    }
}
