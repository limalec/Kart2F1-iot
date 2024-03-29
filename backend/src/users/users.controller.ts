import { Controller, Delete, Get, Param, ParseIntPipe, Post, Patch } from "@nestjs/common";
import { UsersService } from "./users.service";
import { User } from "./entity/users.entity";

import { RawBodyRequest, Req } from "@nestjs/common";
import { Request } from "express";
import { UserInfo } from "./entity/usersinfo.entity";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Post()
    create(@Req() req: RawBodyRequest<Request>): Promise<User> {
        console.log("req.body: ", req.body)
        return this.usersService.create(req.body);
    }

    @Get("leaderboard")
    findAll(): Promise<User[]> {
        return this.usersService.findAllUsersByScore();
    }

    @Get("alive")
    aliveStatus(): boolean {
        return this.usersService.aliveStatus();
    }

    @Get(":id")
    findUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
        return this.usersService.findOneUser(id);
    }

    @Get("email/:email")
    findUserByEmail(@Param('email') email: string): Promise<User> {
        return this.usersService.findUserByEmail(email);
    }

    @Delete(":id")
    remove(@Param('id') id: number): Promise<void> {
        return this.usersService.removeUser(id);
    }

    @Patch("addStat")
    update(@Req() req: RawBodyRequest<Request>): Promise<void> {
        const updatedUser = req.body;
        return this.usersService.updateUser(updatedUser.email, updatedUser.type);
    }

    @Post("alive")
    alive() : void {
        this.usersService.alive();
    }
}