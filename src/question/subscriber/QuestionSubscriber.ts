import { EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';
import { Question } from '../entities/question.entity';
import { Logger } from '@nestjs/common';

@EventSubscriber()
export class QuestionSubscriber implements EntitySubscriberInterface<Question> {
  listenTo(): any {
    return Question;//Escucha solo los eventos relacionados con la entidad Question
  }

  afterInsert(event: InsertEvent<any>) {
    //TODO: Implement your logic here
  };

  afterUpdate(event: UpdateEvent<Question>): Promise<any> | void {//Funciona cuando se cambia el enunciado de Question
    const enunciadoGotUpdated = event.updatedColumns.find(value => value.propertyName, Question.prototype.enunciado);
    if (enunciadoGotUpdated) {
      if (Number(event.databaseEntity.enunciado) !== event.entity.enunciado) {
        // Logger.log(`Enunciado changed from 
        // ${ event.databaseEntity.enunciado } to 
        // ${ event.entity.enunciado }`, 'Question Enunciado Updated');
        
        Logger.log('info',`Enunciado changed from 
        ${ event.databaseEntity.enunciado } to 
        ${ event.entity.enunciado }`);
      }
    }
  }

}