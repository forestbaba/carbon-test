import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class BusinessOrders1707682046197 implements MigrationInterface {

    tableName = 'items';

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
              name: 'name',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'status',
              type: 'enum',
              enum:['PICKED_UP', 'IN_TRANSIT', 'WAREHOUSE', 'DELIVERED'],
              isNullable: false,
            },
            {
              name: 'created_by',
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
            }
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
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true);
    }
}
