import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Book name',
    example: 'Дьякон Кинг-Конг',
  })
  name: string;
  @IsString()
  @ApiProperty({
    description: 'Book author',
    example: 'Джеймс Макбрайд',
  })
  author: string;
  @IsString()
  @ApiProperty({
    description: 'Book description',
    example: 'Криминальная комедия в духе Тарантино.',
  })
  description: string;
  @IsNumber()
  @ApiProperty({
    description: 'Price for book',
    example: 545,
  })
  price: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Link to book picture',
    example: 'Pictures/Books/Book 1.jpg',
  })
  picture: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Is this book in collections on main page',
    example: true,
  })
  is_selected: boolean;
}
