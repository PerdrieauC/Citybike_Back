import {Product} from "./product";
import {User} from "./user";
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

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn('uuid')
    order_id!:string;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'buyer_id' })
    buyer!:User;

    @Column()
    buyer_id!: string;

    @ManyToOne(() => Product)
    @JoinColumn({ name: 'product_id' })
    product!: Product;

    @Column()
    product_id!: string;

    @Column()
    quantity_ordered!: number;

    @Column()
    total_price!: number;

    @Column()
    order_date!: Date;

    @CreateDateColumn()
    dateDeCreation!: Date;

    @UpdateDateColumn()
    dateDeModification!: Date;

    @DeleteDateColumn()
    dateDeSuppression!: Date;
}
