import { Injectable, NotFoundException } from '@nestjs/common';
import { BookReturnDto } from '../book/book.returnDto';
import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();
@Injectable()
export class WishlistService {
  async findAll(user_id: string): Promise<BookReturnDto[]> {
    const books_arr = await prisma.wishList.findMany({
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
    }
    return books;
  }
  async addToWishlist(user_id: string, book_id: string) {
    const book = await prisma.wishList.findFirstOrThrow({
      where: {
        user_id: user_id,
        book_id: book_id,
      },
    });
    if (book == null)
      await prisma.wishList.create({
        data: {
          user_id: user_id,
          book_id: book_id,
        },
      });
  }
  async deleteBookFromWishlist(user_id: string, book_id: string) {
    const book = await prisma.wishList.findFirstOrThrow({
      where: {
        user_id: user_id,
        book_id: book_id,
      },
    });
    await prisma.wishList.delete({
      where: {
        id: book.id,
      },
    });
  }
}
