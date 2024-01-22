import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateCartTable1634850934618 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'cart',
            columns: [
                { name: 'cart_id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'user_id', type: 'uuid' },
                { name: 'product_id', type: 'uuid' },
                { name: 'quantity', type: 'integer' },
                { name: 'dateDeCreation', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeModification', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeSuppression', type: 'timestamp', isNullable: true },
            ],
        }), true);

        // Ajout des clés étrangères
        await queryRunner.createForeignKeys('cart', [
            new TableForeignKey({
                columnNames: ['user_id'],
                referencedColumnNames: ['user_id'],
                referencedTableName: 'user',
                onDelete: 'CASCADE',
            }),
            new TableForeignKey({
                columnNames: ['product_id'],
                referencedColumnNames: ['product_id'],
                referencedTableName: 'product',
                onDelete: 'CASCADE',
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Suppression des clés étrangères
        const table = await queryRunner.getTable('cart')
        if(table?.foreignKeys) {
            const foreignKeys = table.foreignKeys;
            if(foreignKeys) await queryRunner.dropForeignKeys('cart', foreignKeys);
        }

        // Suppression de la table
        await queryRunner.dropTable('cart');
    }

}
