import { Injectable, NotFoundException } from "@nestjs/common";
import { OrderReturnDto } from './order.returnDto';
import { OrderDto } from './order.orderDto';
import { PrismaClient } from '@prisma/client';
import { BasketDto } from '../basket/basket.basketDto';
const prisma = new PrismaClient();
@Injectable()
export class OrderService {
  async addToOrder(user_id: string, order: OrderDto): Promise<OrderReturnDto> {
    const new_order = await prisma.order.create({
      data: {
        user_id: user_id,
        date: order.date,
        address: order.address,
        track_number: order.track_number,
        status: order.status,
      },
    });
    const order_dto = new OrderReturnDto(new_order);
    for (const book of order.books_id) {
      await prisma.orderedBooks.create({
        data: {
          order_id: String(new_order.id),
          book_id: String(book.bookId),
          amount: Number(book.amount),
        },
      });
    }
    order_dto.books_id = order.books_id;
    return order_dto;
  }
  async findOrder(order_id: string): Promise<OrderReturnDto> {
    const order = new OrderReturnDto(
      await prisma.order.findUniqueOrThrow({
        where: {
          id: order_id,
        },
      }),
    );
    const books = await prisma.orderedBooks.findMany({
      where: {
        order_id: order_id,
      },
    });
    if (books == null) throw new NotFoundException();
    order.books_id = [];
    books.forEach((book) => {
      order.books_id[order.books_id.length] = new BasketDto(book);
    });
    return order;
  }
  async findAll(user_id: string): Promise<OrderReturnDto[]> {
    const orders_dto = [];
    const orders = await prisma.order.findMany({
      where: {
        user_id: user_id,
      },
    });
    if (orders == null) throw new NotFoundException();
    for (const order of orders) {
      const order_dto = new OrderReturnDto(order);
      const books = await prisma.orderedBooks.findMany({
        where: {
          order_id: order.id,
        },
      });
      order_dto.books_id = [];
      if (books == null) throw new NotFoundException();
      books.forEach((book) => {
        order_dto.books_id[order_dto.books_id.length] = new BasketDto(book);
      });
      orders_dto[orders_dto.length] = order_dto;
    }
    return orders_dto;
  }
  async changeOrder(
    order_id: string,
    order: OrderDto,
  ): Promise<OrderReturnDto> {
    return new OrderReturnDto(
      await prisma.order.update({
        where: { id: order_id },
        data: {
          address: order.address,
          track_number: order.track_number,
          status: order.status,
        },
      }),
    );
  }
}
