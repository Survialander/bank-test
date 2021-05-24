import {
  MigrationInterface, QueryRunner, TableForeignKey, Table,
} from 'typeorm';

export class CreateTrasactions1621541815850 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'transactions',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
          },
          {
            name: 'description',
            type: 'text',
          },
          {
            name: 'type',
            type: 'varchar',
          },
          {
            name: 'amount',
            type: 'float',
          },
          {
            name: 'account_number',
            type: 'varchar',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    ).then(async () => {
      await queryRunner.createForeignKey(
        'transactions',
        new TableForeignKey({
          columnNames: ['account_number'],
          referencedTableName: 'accounts',
          referencedColumnNames: ['number'],
        }),
      );
    });
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('transactions');
  }
}
