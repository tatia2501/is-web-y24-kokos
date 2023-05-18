import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNotEmpty, IsString, ArrayNotEmpty, ArrayUnique } from 'class-validator';
export class MailDto {
  @ArrayNotEmpty()
  @ArrayUnique()
  @ApiProperty({
    description: 'User id',
    example: ['579546a0-189f-4700-a189-c98d6c90b882'],
  })
  usersId: string[];
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of mail',
    example: 'Ваш купон скоро истечет',
  })
  title: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Text of mail',
    example: 'Успейте воспользоваться купоном на скидку до 15 апреля',
  })
  text: string;
  @IsDateString()
  @ApiProperty({
    description: 'When mail was sent',
    example: '2023-05-07T18:00:00.000Z',
  })
  date: Date;
}
