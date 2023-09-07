import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn
} from "typeorm"
import {User} from "./User";
import {Post} from "./Post";

@Entity('comments')
export class Comment {

    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column("int")
    author_id:number;

    @Column("int")
    post_id:number;

    @Column("text")
    content:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    // @ManyToOne(()=>User,user=>user.comments)
    // @JoinColumn({name:"author_id"})
    // author:User;
    //
    // @ManyToOne(()=>Post,post=>post.comments)
    // @JoinColumn({name:"post_id"})
    // post:Post;

    constructor(content:string,author:User,post:Post) {
        this.content=content;
        this.author=author;
        this.post=post;
    }
}
