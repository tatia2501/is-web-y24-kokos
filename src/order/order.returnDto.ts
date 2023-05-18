import { ApiProperty } from '@nestjs/swagger';
import { Status } from '@prisma/client';
import { Order } from '@prisma/client';
import { IsNotEmpty } from 'class-validator';
import { BasketDto } from '../basket/basket.basketDto';
export class OrderReturnDto {
  constructor(order: Order) {
    this.address = order.address;
    this.date = order.date;
    this.status = order.status;
    this.track_number = order.track_number;
  }
  @ApiProperty({
    description: 'Date when order was made',
    example: '11.04.2023',
  })
  date: Date;
  @ApiProperty({
    description: 'Address to send an order',
    example: 'Санкт-Петербург, Кронверский, 49',
  })
  address: string;
  @ApiProperty({
    description: 'Track number of an order',
    example: '1234-5678-9101',
  })
  track_number: string;
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
