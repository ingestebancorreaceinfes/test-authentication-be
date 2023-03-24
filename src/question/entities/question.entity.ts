import { ApiProperty } from '@nestjs/swagger';
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
    
    @ApiProperty({
      example: 'cd533345-f1f3-48c9-a62e-7dc2da50c8f8',
      description: 'Pregunta ID',
      uniqueItems: true
    })
    @PrimaryGeneratedColumn()
    id: string;
  
    @ApiProperty({
      example: 'This is an example',
      description: 'Contexto'
    })
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