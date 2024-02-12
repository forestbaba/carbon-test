import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class Inventory1707667859290 implements MigrationInterface {

    tableName = 'business_inventory';

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
              length: '255',
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
              name: 'department_id',
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
          name: 'fk_department',
          columnNames: ['department_id'],
          referencedColumnNames: ['id'],
          referencedTableName: 'business_departments',
          onDelete: 'CASCADE',
        }),
      );
    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true);
    }
}
