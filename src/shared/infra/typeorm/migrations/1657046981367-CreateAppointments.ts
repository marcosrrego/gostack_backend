/**
 * MIGRATIONS: evita que os devs que estão trabalhando no mesmo projeto, estejam com os bancos de dados em versões diferentes, atualizados de forma diferentes.
 */

import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1657046981367
    implements MigrationInterface
{
    public async up(queryRunner: QueryRunner): Promise<void> {
        // metodo UP é o que você quer que seja feita no banco de dados quando a migration for executada, alterações, criacoes de novas tabelas
        await queryRunner.createTable(
            new Table({
                name: 'appointments',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'provider',
                        type: 'varchar',
                    },
                    {
                        name: 'date',
                        type: 'timestamp with time zone',
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
        await queryRunner.dropTable('appointments');
    }
}
