import { Injectable, NotFoundException } from "@nestjs/common";
import { BookReturnDto } from './book.returnDto';
import { CreateBookDto } from './book.createBookDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class BookService {
  async createBook(book: CreateBookDto): Promise<BookReturnDto> {
    return new BookReturnDto(
      await prisma.book.create({
        data: {
          name: book.name,
          description: book.description,
          price: book.price,
          picture: book.picture,
          author: book.author,
          is_selected: book.is_selected,
        },
      }),
    );
  }
  async findBook(id: string): Promise<BookReturnDto> {
    return new BookReturnDto(
      await prisma.book.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }
  async deleteBook(id: string) {
    await prisma.book.delete({
      where: {
        id,
      },
    });
  }
  async changeBookInfo(
    id: string,
    book: CreateBookDto,
  ): Promise<BookReturnDto> {
    return new BookReturnDto(
      await prisma.book.update({
        where: {
          id,
        },
        data: {
          name: book.name,
          description: book.description,
          price: book.price,
          picture: book.picture,
          author: book.author,
          is_selected: book.is_selected,
        },
      }),
    );
  }
  async findAll(page: number, numberPerPage: number): Promise<BookReturnDto[]> {
    const books = await prisma.book.findMany({
      skip: Number(numberPerPage) * (Number(page) - 1),
      take: Number(numberPerPage),
    });
    if (books == null) throw new NotFoundException();
    const books_arr = [];
    books.forEach((book) => {
      books_arr[books_arr.length] = new BookReturnDto(book);
    });
    return books_arr;
  }
  async findAllInCategory(id: string): Promise<BookReturnDto[]> {
    const category = await prisma.category.findUniqueOrThrow({
      where: { id },
      include: { books: true },
    });
    const books_arr = [];
    category.books.forEach((book) => {
      books_arr[books_arr.length] = new BookReturnDto(book);
    });
    return books_arr;
  }
  async searchBook(request: string): Promise<BookReturnDto[]> {
    // const request_parts = request.split(' ');
    const books_arr = await prisma.book.findMany({
      where: {
        OR: [
          {
            name: {
              contains: request,
            },
          },
          {
            author: {
              contains: request,
            },
          },
        ],
      },
    });
    if (books_arr == null) throw new NotFoundException();
    const books = [];
    books_arr.forEach((book) => {
      books[books.length] = new BookReturnDto(book);
    });
    return books;
  }

  async addBookToCategory(book_id: string, category_id: string) {
    await prisma.book.update({
      where: { id: book_id },
      data: {
        category: {
          connect: { id: category_id },
        },
      },
    });
  }

  async selectedBooks(category_name: string): Promise<BookReturnDto[]> {
    const category = await prisma.category.findFirstOrThrow({
      where: { name: category_name },
      include: { books: true },
    });
    const books_arr = [];
    category.books.forEach((book) => {
      if (book.is_selected)
        books_arr[books_arr.length] = new BookReturnDto(book);
    });
    return books_arr;
  }
}
