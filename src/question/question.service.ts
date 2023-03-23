import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Question } from './entities/question.entity';

@Injectable()
export class QuestionService {
  constructor(@InjectRepository(Question) private repo: Repository<Question>) { }

  createOne(product: Question): Promise<Question> {
    return this.repo.save(product);
  }

  getAll(): Promise<Question[]> {
    return this.repo.find();
  }

  async updateOne(id: string, { enunciado }: Question): Promise<Question> {
    const question = await this.repo.findOne({where: {id}});
    return this.repo.save({ ...question, enunciado })
  }

}
