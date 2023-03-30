import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private questionRespository: Repository<Question>) {}
  
  createOne(product: Question): Promise<Question> {
    return this.questionRespository.save(product);
  }

  getAll(): Promise<Question[]> {
    return this.questionRespository.find();
  }

  async update(id: string, data : Question): Promise<Question> {
    const question = await this.questionRespository.findOne({where: {id}});
    
    if(!question) throw new NotFoundException();

    Object.assign(question, data);

    return this.questionRespository.save(question);
  }

}