import { ApiProperty } from '@nestjs/swagger';
import { Faq } from '@prisma/client';
export class FaqReturnDto {
  constructor(faq: Faq) {
    this.answer = faq.anqwer;
    this.question = faq.question;
  }

  @ApiProperty({
    description: 'Question',
    example: 'Что такое предзаказ?',
  })
  question: string;
  @ApiProperty({
    description: 'Answer to question',
    example:
      'Предзаказ – это ваша заявка на книжную новинку, поступление которой ожидается в ближайшее время на склад из типографии',
  })
  answer: string;
}
