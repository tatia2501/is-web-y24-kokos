import { Injectable, NotFoundException } from '@nestjs/common';
import { BookReturnDto } from '../book/book.returnDto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

@Injectable()
export class BasketService {
  async findAll(user_id: string): Promise<BookReturnDto[]> {
    const books_arr = await prisma.basket.findMany({
      where: {
        user_id,
      },
    });
    if (books_arr == null) throw new NotFoundException();
    const books = [];
    for (const book of books_arr) {
      books[books.length] = new BookReturnDto(
        await prisma.book.findUniqueOrThrow({
          where: {
            id: book.book_id,
          },
        }),
      );
      books[books.length - 1].amount = book.amount;
    }
    return books;
  }
  async addToBasket(user_id: string, book_id: string) {
    const book = await prisma.basket.findFirstOrThrow({
      where: {
        user_id: user_id,
        book_id: book_id,
      },
    });
    if (book == null)
      await prisma.basket.create({
        data: {
          user_id: user_id,
          book_id: book_id,
          amount: Number(1),
        },
      });
  }
  async deleteBookFromBasket(user_id: string, book_id: string) {
    const book = await prisma.basket.findFirstOrThrow({
      where: {
        user_id: user_id,
        book_id: book_id,
      },
    });
    await prisma.basket.delete({
      where: {
        id: book.id,
      },
    });
  }
  async changeBookInfo(user_id: string, book_id: string, amount: number) {
    const book = await prisma.basket.findFirstOrThrow({
      where: {
        user_id: user_id,
        book_id: book_id,
      },
    });
    await prisma.basket.update({
      where: {
        id: book.id,
      },
      data: {
        amount: Number(amount),
      },
    });
  }
}
