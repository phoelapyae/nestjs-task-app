import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { TaskStatus } from "./task-status.enum";
import { User } from "../auth/user.entity";
import { Exclude } from "class-transformer";

@Entity()
export class Task {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    description: string;

    @Column()
    status: TaskStatus;

    @ManyToOne((_type) => User, (user) => user.tasks, { eager: false })
    @Exclude({ toPlainOnly: true })
    user: User
}