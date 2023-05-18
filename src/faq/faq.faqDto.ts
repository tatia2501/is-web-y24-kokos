import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class FaqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Question',
    example: 'Что такое предзаказ?',
  })
  question: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Answer to question',
    example:
      'Предзаказ – это ваша заявка на книжную новинку, поступление которой ожидается в ближайшее время на склад из типографии',
  })
  answer: string;
}
