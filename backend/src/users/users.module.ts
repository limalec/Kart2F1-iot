import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entity/users.entity";
import { UsersService } from "./users.service";
import { UsersController } from "./users.controller";
import { UserInfo } from "./entity/usersinfo.entity";

@Module({
    imports: [TypeOrmModule.forFeature([User, UserInfo])],
    controllers: [UsersController],
    providers: [UsersService],
    })
export class UsersModule {}