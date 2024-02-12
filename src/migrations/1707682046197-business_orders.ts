import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class BusinessOrders1707682046197 implements MigrationInterface {

    tableName = 'business_orders';

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
              name: 'total_amount',
              type: 'float',
              isNullable: false,
            },
            {
              name: 'created_by',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'department_id',
              type: 'int',
              isNullable: false,
            },
            {
              name: 'business_id',
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
          referencedTableName: 'business_department_heads',
          onDelete: 'CASCADE',
        }),
      );
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          name: 'fk_department',
          columnNames: ['department_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'business_departments',
          onDelete: 'CASCADE',
        }),
      );
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          name: 'fk_business_id',
          columnNames: ['business_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'businesses',
          onDelete: 'CASCADE',
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true);
    }

}
