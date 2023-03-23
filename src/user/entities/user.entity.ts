import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn} from "typeorm";

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: string;
    
    @Column()
    name: string;
  
    @Column({unique: true})
    email: string;

    @Column()
    image: string;

    @CreateDateColumn()
    createDate: Date;
  
    @UpdateDateColumn()
    updateDate: Date;
  
    @DeleteDateColumn()
    deleteDate: Date;
}