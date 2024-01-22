import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";

import {User} from "./user";

@Entity()
export class Product extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    product_id!: string;

    @ManyToOne(() => User)
    @JoinColumn({name: 'seller_id'})
    seller!: User;

    @Column({nullable: false})
    seller_id!: string;

    @Column()
    name!: string;

    @Column()
    description!: string;

    @Column()
    price!: number;

    @Column()
    quantity_available!: number;

    @Column()
    category!: string;

    @Column()
    img!: string;

    @CreateDateColumn()
    dateDeCreation!: Date;

    @UpdateDateColumn()
    dateDeModification!: Date;

    @DeleteDateColumn()
    dateDeSuppression!: Date;
}
