import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import { BasketDto } from '../basket/basket.basketDto';
export class OrderDto {
  @IsDateString()
  @ApiProperty({
    description: 'Date when order was made',
    example: '2023-05-07T18:00:00.000Z',
  })
  date: Date;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Address to send an order',
    example: 'Санкт-Петербург, Кронверский, 49',
  })
  address: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: 'Track number of an order',
    example: '1234-5678-9101',
  })
  track_number: string;
  @IsNotEmpty()
  @ApiProperty({
    description: 'Status of an order',
    example: Status.InProgress,
  })
  status: Status;
  @IsNotEmpty()
  @ApiProperty({
    description: 'List of id of books that are in an order',
    example: [{ bookId: 'a3512912-46be-4751-998c-470b6c05ab4d', amount: 3 }],
  })
  books_id: BasketDto[];
}
