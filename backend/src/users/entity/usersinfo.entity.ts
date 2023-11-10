import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from './users.entity';

@Entity()
export class UserInfo {
    @PrimaryGeneratedColumn()
    infoId: number;

    @Column({ type: 'json'})
    statistics: JSON;

    @OneToOne(type => User, user => user.info)
    user: User;
}