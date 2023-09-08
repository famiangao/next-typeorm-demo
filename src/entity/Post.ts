import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne, OneToMany,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {User} from "./User";
import {Comment} from "./Comment";

//posts表的描述文件
@Entity('posts')
export class Post {
    @PrimaryGeneratedColumn("increment")
    id:number;

    // @Column("int")
    // author_id:number;

    @Column("varchar")
    title:string;

    @Column("text")
    content:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    @ManyToOne(type=>User,user=>user.posts)
    @JoinColumn({name:"author_id"})
    author:User;

    @OneToMany(type=>Comment,comment=>comment.post)
    comments:Comment[]

    constructor(title:string,content:string,author:User) {
        this.title=title;
        this.content=content;
        // this.author=author;
    }
}