import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class BusinessOrderItems1707682051825 implements MigrationInterface {

    tableName = 'business_order_items';

    public async up(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.createTable(
        new Table({
          name: this.tableName,
          columns: [
            {
              name: 'id',
              type: 'serial',
              isPrimary: true,
            },
            {
              name: 'item_id',
              type: 'int',
            },
            {
                name: 'price',
                type: 'float',
            },
            {
                name: 'quantity',
                type: 'int',
            },
            {
              name: 'created_by',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'order_id',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'createdAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'updatedAt',
              type: 'timestamp',
              default: 'CURRENT_TIMESTAMP',
            },
            {
              name: 'deletedAt',
              type: 'timestamp',
              isNullable: true,
            },
          ],
        }),
        true,
      );
  
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          name: 'fk_created_by',
          columnNames: ['created_by'],
          referencedColumnNames: ['id'],
          referencedTableName: 'users',
          onDelete: 'CASCADE',
        }),
      );
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          name: 'fk_order_id',
          columnNames: ['order_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'business_orders',
          onDelete: 'CASCADE',
        }),
      );
     
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true);
    }
}
