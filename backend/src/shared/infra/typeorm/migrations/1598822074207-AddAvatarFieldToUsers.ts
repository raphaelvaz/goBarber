import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddAvatarFieldToUsers1598822074207 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users', 
            new TableColumn({
                name:'avatar',
                type:'varchar',
                isNullable: true,
                //pois já existem usuarios cadastrados
                //ou isNullable: false e atualiza todos os cadastros
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('users','avatar');
    }

}
