import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateOrderTable1634850934616 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'order',
            columns: [
                { name: 'order_id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'buyer_id', type: 'uuid' },
                { name: 'product_id', type: 'uuid' },
                { name: 'quantity_ordered', type: 'integer' },
                { name: 'total_price', type: 'numeric' },
                { name: 'order_date', type: 'timestamp' },
                { name: 'dateDeCreation', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeModification', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeSuppression', type: 'timestamp', isNullable: true },
            ],
        }), true);

        // Ajout des clés étrangères
        await queryRunner.createForeignKeys('order', [
            new TableForeignKey({
                columnNames: ['buyer_id'],
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
        const table = await queryRunner.getTable('order');
        if(table?.foreignKeys) {
            const foreignKeys = table.foreignKeys;
            if(foreignKeys) await queryRunner.dropForeignKeys('order', foreignKeys);

        }

        // Suppression de la table
        await queryRunner.dropTable('order');
    }

}
