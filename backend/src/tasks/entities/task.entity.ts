import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity({ name: 'TASK'})
export class Task {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({
        type: "varchar",
        nullable: false,
    })
    taskName: string;

    @Column({
        type: "text",
        nullable: false,
    })
    description: string;

    @Column({
        type: "boolean",
        nullable: false,
    })
    status: boolean;

    @Column({
        type: "timestamp",
        nullable: false,
    })
    date: Date;

    @ManyToOne(() => User, (user) => user.tasks, { nullable: false })
    user: User;
}
