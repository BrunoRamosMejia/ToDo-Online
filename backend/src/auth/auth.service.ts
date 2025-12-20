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

        const savedUser = await this.usersRepository.save(newUser)

        const payload = {
            id: savedUser.id,
            email: savedUser.email,
        }

        const token = this.jwtService.sign(payload);

        return {
            register: true,
            access_token: token,
            id: savedUser.id,
        };
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

        return {
            login: true,
            access_token: token,
            id: foundUser.id,
        };
    }

    // CREAR USUARIO CON GOOGLE
    async createWithGoogle({ name, email, profileImg }: { name: string, email: string, profileImg?: string}) {
        const user = this.usersRepository.create({
            name,
            email,
            password: '',
            profileImg: profileImg || undefined,
        });
        return await this.usersRepository.save(user)
    }

    // NUEVO MÉTODO PARA GOOGLE
    async loginWithGoogle(user: User) {
        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = this.jwtService.sign(payload);
        
        return {
            login: true,
            access_token: token,
            id: user.id,
        };
}
}
