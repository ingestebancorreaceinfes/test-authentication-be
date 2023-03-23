import { BeforeInsert, BeforeUpdate, Column, Entity, PrimaryGeneratedColumn, CreateDateColumn, DeleteDateColumn,UpdateDateColumn} from "typeorm";

@Entity('users')
export class User {
    
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column( {
        type:'varchar',
        unique: true
    })
    username: string;

    @Column({
        type:'varchar',
        select: false,
        nullable: true
    })
    password: string;

    @Column({
        type:'varchar',
    })
    full_name: string;

    @Column( {
        type:'bool',
        default: true
    })
    is_active: boolean;


    @BeforeInsert()
    checkFieldsBeforeInsert() {
        this.username = this.username.toLowerCase().trim();
    }

    @BeforeUpdate()
    checkFieldsBeforeUpdate() {
        this.checkFieldsBeforeInsert();   
    }

    // @CreateDateColumn()
    // createDate: Date;
  
    // @UpdateDateColumn()
    // updateDate: Date;
  
    // @DeleteDateColumn()
    // deleteDate: Date;
}