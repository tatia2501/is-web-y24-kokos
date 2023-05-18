import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';
export class SpecialOfferDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Title of special offer',
    example: 'Скидка 20% на чек от 1000 руб',
  })
  name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Description of special offer',
    example: 'Закажите товаров больше чем на 1000 рублей и получите скидку 20%',
  })
  description: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Link to special offer picture',
    example: 'Pictures/Sales/Blue 1.jpg',
  })
  picture: string;
}
