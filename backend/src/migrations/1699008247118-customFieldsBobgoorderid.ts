import {MigrationInterface, QueryRunner} from "typeorm";

export class customFieldsBobgoorderid1699008247118 implements MigrationInterface {

   public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `order` ADD `customFieldsChannel_order_number` varchar(255) NULL", undefined);
   }

   public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.query("ALTER TABLE `order` DROP COLUMN `customFieldsChannel_order_number`", undefined);
   }

}
