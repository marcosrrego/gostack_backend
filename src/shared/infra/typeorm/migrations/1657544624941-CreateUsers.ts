import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateUsers1657544624941 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        // metodo UP é o que você quer que seja feita no banco de dados quando a migration for executada, alterações, criacoes de novas tabelas
        await queryRunner.createTable(
            new Table({
                name: 'users',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'email',
                        type: 'varchar',
                        isUnique: true,
                    },
                    {
                        name: 'password',
                        type: 'varchar',
                    },

                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // o metodo DOWN, utiliza para desfazer algo feito no UP.
        await queryRunner.dropTable('users');
    }
}
