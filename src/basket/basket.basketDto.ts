import { ApiProperty } from '@nestjs/swagger';
import { IsPositive, IsInt } from 'class-validator';
import { OrderedBooks } from '@prisma/client';
export class BasketDto {
  constructor(orderedBook: OrderedBooks) {
    this.bookId = orderedBook.book_id;
    this.amount = orderedBook.amount;
  }
  @ApiProperty({
    description: 'Book id',
    example: 'b96532e7-8526-4b1d-9650-768a0952f825',
  })
  bookId: string;
  @IsPositive()
  @IsInt()
  @ApiProperty({
    description: 'Amount of books',
    example: 2,
  })
  amount: number;
}
