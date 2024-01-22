import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";

@Entity()
export class User extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    user_id!: string;

    @Column({unique: true})
    username!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    password!: string;

    @Column({ nullable: true })
    first_name!: string;

    @Column({ nullable: true })
    last_name!: string;

    @CreateDateColumn()
    dateDeCreation!: Date;

    @UpdateDateColumn()
    dateDeModification!: Date;

    @DeleteDateColumn()
    dateDeSuppression!: Date;
}
