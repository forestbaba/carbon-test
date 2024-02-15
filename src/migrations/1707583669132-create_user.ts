import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class Items1707583669132 implements MigrationInterface {

    tableName = 'users';

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
              name: 'email',
              type: 'varchar',
              isNullable: false,
            },
            {
              name: 'password',
              type: 'varchar',
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

    }
  
    public async down(queryRunner: QueryRunner): Promise<void> {
      await queryRunner.dropTable(this.tableName, true);
    }

}
