import {
    BaseEntity,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm";
import {User} from "./user";
import {Product} from "./product";

@Entity()
export class Favorite extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    favorite_id!:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user!: User;

    @Column()
    user_id!: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column()
    product_id!: string;

    @CreateDateColumn()
    dateDeCreation!: Date;

    @UpdateDateColumn()
    dateDeModification!: Date;

    @DeleteDateColumn()
    dateDeSuppression!: Date;
}
