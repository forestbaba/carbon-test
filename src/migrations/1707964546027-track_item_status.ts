import { MigrationInterface, QueryRunner, Table, TableForeignKey } from "typeorm"

export class TrackItemStatus1707964546027 implements MigrationInterface {

    tableName = 'item_status';

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
              isNullable: false,
            },
            {
              name: 'status',
              type: 'enum',
              enum:['PICKED_UP', 'IN_TRANSIT', 'WAREHOUSE', 'DELIVERED'],
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
