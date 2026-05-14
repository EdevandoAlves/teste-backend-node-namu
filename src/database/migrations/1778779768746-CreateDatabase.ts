import { MigrationInterface, QueryRunner } from 'typeorm'

export class CreateDatabase1778779768746 implements MigrationInterface {
  name = 'CreateDatabase1778779768746'

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`participations\` DROP FOREIGN KEY \`participations_ibfk_1\``
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` DROP FOREIGN KEY \`activities_ibfk_1\``
    )
    await queryRunner.query(`DROP INDEX \`activity_id\` ON \`participations\``)
    await queryRunner.query(`DROP INDEX \`program_id\` ON \`activities\``)
    await queryRunner.query(
      `ALTER TABLE \`participations\` DROP COLUMN \`completed_at\``
    )
    await queryRunner.query(
      `ALTER TABLE \`participations\` ADD \`completed_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` CHANGE \`description\` \`description\` text NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` CHANGE \`description\` \`description\` text NOT NULL`
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` DROP COLUMN \`created_at\``
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` ADD \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6)`
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` DROP COLUMN \`updated_at\``
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` ADD \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)`
    )
    await queryRunner.query(
      `ALTER TABLE \`participations\` ADD CONSTRAINT \`FK_467df4f56f2c76563c87ffc6a87\` FOREIGN KEY (\`activity_id\`) REFERENCES \`activities\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` ADD CONSTRAINT \`FK_b2f5f4234f9ee55a8e64c79d69f\` FOREIGN KEY (\`program_id\`) REFERENCES \`programs\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`
    )
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE \`activities\` DROP FOREIGN KEY \`FK_b2f5f4234f9ee55a8e64c79d69f\``
    )
    await queryRunner.query(
      `ALTER TABLE \`participations\` DROP FOREIGN KEY \`FK_467df4f56f2c76563c87ffc6a87\``
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` DROP COLUMN \`updated_at\``
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` ADD \`updated_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` DROP COLUMN \`created_at\``
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` ADD \`created_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`
    )
    await queryRunner.query(
      `ALTER TABLE \`programs\` CHANGE \`description\` \`description\` text NULL`
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` CHANGE \`description\` \`description\` text NULL`
    )
    await queryRunner.query(
      `ALTER TABLE \`participations\` DROP COLUMN \`completed_at\``
    )
    await queryRunner.query(
      `ALTER TABLE \`participations\` ADD \`completed_at\` timestamp(0) NULL DEFAULT CURRENT_TIMESTAMP`
    )
    await queryRunner.query(
      `CREATE INDEX \`program_id\` ON \`activities\` (\`program_id\`)`
    )
    await queryRunner.query(
      `CREATE INDEX \`activity_id\` ON \`participations\` (\`activity_id\`)`
    )
    await queryRunner.query(
      `ALTER TABLE \`activities\` ADD CONSTRAINT \`activities_ibfk_1\` FOREIGN KEY (\`program_id\`) REFERENCES \`programs\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
    await queryRunner.query(
      `ALTER TABLE \`participations\` ADD CONSTRAINT \`participations_ibfk_1\` FOREIGN KEY (\`activity_id\`) REFERENCES \`activities\`(\`id\`) ON DELETE CASCADE ON UPDATE NO ACTION`
    )
  }
}
