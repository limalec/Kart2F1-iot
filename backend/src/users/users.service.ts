import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/users.entity';
import { CreateUserDto } from './create-user.dto';
import { UserInfo } from './entity/usersinfo.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
        @InjectRepository(UserInfo)
        private usersInfoRepository: Repository<UserInfo>
    ) {}

    create(createUserDto: CreateUserDto): Promise<User> {
        const user = new User();
        user.name = createUserDto.name;
        user.surname = createUserDto.surname;
        user.email = createUserDto.email;
        user.password = createUserDto.password;

        const info = this.usersInfoRepository.create({
            statistics: createUserDto.info.statistics,
        });

        user.info = info;

        this.usersInfoRepository.save(info);
        console.log("user: ", user);
        return this.usersRepository.save(user);
    }
    
    findAllUsersByScore(): Promise<User[]> {
        return this.usersRepository
            .createQueryBuilder("user")
            .leftJoinAndSelect("user.info", "info")
            .getMany();
    }
    
    findOneUser(id: number): Promise<User> {
        return this.usersRepository.findOne({ 
            where: { userId: id },
            relations: ["info"]
         });
    }

    findUserByEmail(email: string): Promise<User> {
        return this.usersRepository.findOne({ 
            where: { email: email },
            relations: ["info"]
         });
    }
    
    async removeUser(id: number): Promise<void> {
        await this.usersRepository.delete(id);
    }

    async removeInfo(id: number): Promise<void> {
        await this.usersInfoRepository.delete(id);
    }
}