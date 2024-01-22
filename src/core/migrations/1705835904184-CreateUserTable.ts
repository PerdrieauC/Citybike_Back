import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateUserTable1705835904184 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'user',
            columns: [
                { name: 'user_id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'username', type: 'varchar', isUnique: true },
                { name: 'email', type: 'varchar', isUnique: true },
                { name: 'password', type: 'varchar' },
                { name: 'first_name', type: 'varchar', isNullable: true },
                { name: 'last_name', type: 'varchar', isNullable: true },
                { name: 'dateDeCreation', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeModification', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeSuppression', type: 'timestamp', isNullable: true },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('user');
    }

}
