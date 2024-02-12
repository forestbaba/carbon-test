import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class BusinessDepartmentHeads1707664208666 implements MigrationInterface {

    tableName = 'business_department_heads';

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
                name: 'email',
                type: 'varchar',
                length: '255',
                isUnique: true
            },
            {
                name: 'password',
                type: 'varchar',
                length: '255',
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
          name: 'fk_admin_id',
          columnNames: ['created_by'],
          referencedColumnNames: ['id'],
          referencedTableName: 'duplo_admin',
          onDelete: 'CASCADE',
        }),
      );
      await queryRunner.createForeignKey(
        this.tableName,
        new TableForeignKey({
          name: 'fk_department_id',
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
