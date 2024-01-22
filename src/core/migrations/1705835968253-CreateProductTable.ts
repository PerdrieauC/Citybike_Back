import { MigrationInterface, QueryRunner, Table, TableForeignKey } from 'typeorm';

export class CreateProductTable1634850934615 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'product',
            columns: [
                { name: 'product_id', type: 'uuid', isPrimary: true, generationStrategy: 'uuid', default: 'uuid_generate_v4()' },
                { name: 'seller_id', type: 'uuid' },
                { name: 'name', type: 'varchar' },
                { name: 'description', type: 'text' },
                { name: 'price', type: 'numeric' },
                { name: 'quantity_available', type: 'integer' },
                { name: 'category', type: 'varchar' },
                { name: 'dateDeCreation', type: 'timestamp', default: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeModification', type: 'timestamp', default: 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' },
                { name: 'dateDeSuppression', type: 'timestamp', isNullable: true },
            ],
        }), true);

        // Ajout de la clé étrangère
        await queryRunner.createForeignKey('product', new TableForeignKey({
            columnNames: ['seller_id'],
            referencedColumnNames: ['user_id'],
            referencedTableName: 'user',
            onDelete: 'CASCADE',
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // Suppression de la clé étrangère
        const table = await queryRunner.getTable('product');
        if(table?.foreignKeys) {
            const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('seller_id') !== -1);
            if(foreignKey) await queryRunner.dropForeignKey('product', foreignKey);
        }
        // Suppression de la table
        await queryRunner.dropTable('product');
    }

}
