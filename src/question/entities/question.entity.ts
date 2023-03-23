import {
    Column,
    CreateDateColumn,
    DeleteDateColumn,
    Entity,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
  
  @Entity()
  export class Question {
    @PrimaryGeneratedColumn()
    id: string;
  
    @Column({ type: 'varchar' })
    contexto: string;
  
    @Column({ type: 'varchar' })
    enunciado: string;
  
    @Column({ type: 'varchar' })
    opcionesRespuesta: string;
  
    @Column({ type: 'boolean', default: false })
    isDeleted: boolean;
  
    @CreateDateColumn()
    createDate: Date;
  
    @UpdateDateColumn()
    updateDate: Date;
  
    @DeleteDateColumn()
    deleteDate: Date;
  }