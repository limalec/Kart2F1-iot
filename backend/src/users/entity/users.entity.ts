import {Entity, Column, PrimaryGeneratedColumn, OneToOne, JoinColumn} from 'typeorm';
import { UserInfo } from './usersinfo.entity';

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    userId: number;

    @Column({ length: 255 })
    name: string;
  
    @Column({ length: 255 })
    surname: string;

    @Column({ length: 255 })
    email: string;

    @Column({ length: 255 })
    password: string;

    @OneToOne(type => UserInfo, info => info.user)
    @JoinColumn()
    info: UserInfo;
}