import { ApiProperty } from '@nestjs/swagger';
import { Book } from '@prisma/client';
export class BookReturnDto {
  constructor(book: Book) {
    this.id = book.id;
    this.name = book.name;
    this.description = book.description;
    this.price = book.price;
    this.picture = book.picture;
    this.author = book.author;
    this.is_selected = book.is_selected;
  }
  @ApiProperty({
    description: 'Book id',
    example: '75a1e967-d181-48fb-abe6-67140bca6404',
  })
  id: string;
  @ApiProperty({
    description: 'Book name',
    example: 'Дьякон Кинг-Конг',
  })
  name: string;
  @ApiProperty({
    description: 'Book author',
    example: 'Джеймс Макбрайд',
  })
  author: string;
  @ApiProperty({
    description: 'Book description',
    example: 'Криминальная комедия в духе Тарантино.',
  })
  description: string;
  @ApiProperty({
    description: 'Price for book',
    example: 545,
  })
  price: number;
  @ApiProperty({
    description: 'Link to book picture',
    example: 'Pictures/Books/Book 1.jpg',
  })
  picture: string;
  @ApiProperty({
    description: 'Is this book in collections on main page',
    example: true,
  })
  is_selected: boolean;
  @ApiProperty({
    description: 'Amount of books',
    example: 3,
  })
  amount: number;
}
