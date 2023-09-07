import {Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm"
import { Post } from "./Post";
import {Comment} from "./Comment";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn("increment")
    id:number;

    @Column("varchar")
    username:string;

    @Column("varchar")
    password_digest:string;

    @CreateDateColumn()
    createdAt:Date;

    @UpdateDateColumn()
    updatedAt:Date;

    // @OneToMany(()=>Post,post=>post.author)
    // posts:Post[]

    // @OneToMany(()=>Comment,comment=>comment.author)
    // comments:Comment[]

    constructor(username:string,password:string,) {
        this.username=username;
        this.password_digest=password;
    }
}
