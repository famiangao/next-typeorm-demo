import {MigrationInterface, QueryRunner, Table} from "typeorm"

export class CreatePosts1693994094491 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "posts",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    }, {
                        name: "title",
                        type: "varchar"
                    },
                    {
                        name: "content",
                        type: "text"
                    },
                    {
                        name: "author_id",
                        type: "int"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        console.log("运行了3")
        return await queryRunner.dropTable("posts")
    }

}
