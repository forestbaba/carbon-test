import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class DuploAdmin1707654401115 implements MigrationInterface {
    tableName = 'duplo_admin';

    public async up(queryRunner: QueryRunner): Promise<void> {

        await queryRunner.createTable(
            new Table({
                name: this.tableName,
                columns: [
                    {
                        name: 'id',
                        type: 'INT',
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: 'increment',
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
                        name: 'active',
                        type: 'boolean',
                        default: true,
                    },

                    {
                        name: 'createdAt',
                        type: 'DATETIME',
                        isNullable: false,
                        default: 'NOW()',
                    },
                    {
                        name: 'updatedAt',
                        type: 'DATETIME',
                        isNullable: false,
                        default: 'NOW()',
                    },
                    {
                        name: 'deletedAt',
                        type: 'DATETIME',
                        isNullable: true,
                    },
                ],
            }),
            true,
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable(this.tableName, true);
    }

}
