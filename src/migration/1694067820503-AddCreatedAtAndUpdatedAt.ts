import {MigrationInterface, QueryRunner, TableColumn} from "typeorm"

export class AddCreatedAtAndUpdatedAt1694067820503 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns("users", [
            new TableColumn({name: "createdAt", type: "timestamp", isNullable: false, default: 'now()'}),
            new TableColumn({name: "updatedAt", type: "timestamp", isNullable: false, default: 'now()'})
        ])
        await queryRunner.addColumns("posts", [
            new TableColumn({name: "createdAt", type: "timestamp", isNullable: false, default: 'now()'}),
            new TableColumn({name: "updatedAt", type: "timestamp", isNullable: false, default: 'now()'})
        ])
        await queryRunner.addColumns("comments", [
            new TableColumn({name: "createdAt", type: "timestamp", isNullable: false, default: 'now()'}),
            new TableColumn({name: "updatedAt", type: "timestamp", isNullable: false, default: 'now()'})
        ])
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
            await queryRunner.dropColumns("users", ["createdAt", "updatedAt"])
            await queryRunner.dropColumns("posts", ["createdAt", "updatedAt"])
            await queryRunner.dropColumns("comments", ["createdAt", "updatedAt"])
    }

}
