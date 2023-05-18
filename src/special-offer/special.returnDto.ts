import { ApiProperty } from '@nestjs/swagger';
import { SpecialOffer } from '@prisma/client';
export class SpecialOfferReturnDto {
  constructor(special: SpecialOffer) {
    this.name = special.name;
    this.description = special.description;
    this.picture = special.picture;
  }
  @ApiProperty({
    description: 'Title of special offer',
    example: 'Скидка 20% на чек от 1000 руб',
  })
  name: string;
  @ApiProperty({
    description: 'Description of special offer',
    example: 'Закажите товаров больше чем на 1000 рублей и получите скидку 20%',
  })
  description: string;
  @ApiProperty({
    description: 'Link to special offer picture',
    example: 'Pictures/Sales/Blue 1.jpg',
  })
  picture: string;
}
