import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreateComments1693995807471 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "comments",
            columns: [
                {
                    name: "id",
                    type: "int",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment"
                }, {
                    name: "author_id",
                    type: "int"
                }, {
                    name: "post_id",
                    type: "int"
                }, {
                    name: "content",
                    type: "text"
                }
            ]
        }))
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("运行了3")
        await queryRunner.dropTable("comments")
    }

}
