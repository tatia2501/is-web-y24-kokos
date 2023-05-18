import { ApiProperty } from '@nestjs/swagger';
import { Mail } from '@prisma/client';
export class MailReturnDto {
  constructor(mail: Mail) {
    this.title = mail.title;
    this.text = mail.text;
    this.date = mail.date;
  }
  @ApiProperty({
    description: 'Title of mail',
    example: 'Ваш купон скоро истечет',
  })
  title: string;
  @ApiProperty({
    description: 'Text of mail',
    example: 'Успейте воспользоваться купоном на скидку до 15 апреля',
  })
  text: string;
  @ApiProperty({
    description: 'When mail was sent',
    example: '11.04.2023',
  })
  date: Date;
}
