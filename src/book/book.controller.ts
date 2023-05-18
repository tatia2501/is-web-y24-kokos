import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  Query,
  ParseUUIDPipe,
  UseGuards, ParseIntPipe
} from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { BookService } from './book.service';
import { CreateBookDto } from './book.createBookDto';
import { BookReturnDto } from './book.returnDto';
import { AuthGuard } from '../auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/lib/build/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
@ApiTags('book')
@Controller('book')
export class BookController {
  constructor(private bookService: BookService) {}
  @Post('')
  @ApiCreatedResponse({
    description: 'Book has been added',
    type: BookReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Book can not be added' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('manager'),
      ],
    }),
  )
  @ApiCookieAuth()
  async createBook(@Body() book: CreateBookDto): Promise<BookReturnDto> {
    return this.bookService.createBook(book);
  }
  @Get(':book_id')
  @ApiOkResponse({ description: 'Book is found', type: BookReturnDto })
  @ApiNotFoundResponse({ description: 'No such book' })
  async findBook(
    @Param('book_id', ParseUUIDPipe) id: string,
  ): Promise<BookReturnDto> {
    return this.bookService.findBook(id);
  }
  @Delete(':book_id')
  @ApiOkResponse({ description: 'Book has been deleted' })
  @ApiForbiddenResponse({ description: 'Impossible to delete this book' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('manager'),
      ],
    }),
  )
  @ApiCookieAuth()
  async deleteBook(@Param('book_id', ParseUUIDPipe) id: string) {
    await this.bookService.deleteBook(id);
  }
  @Put(':book_id')
  @ApiOkResponse({
    description: 'Book information has been changed',
    type: BookReturnDto,
  })
  @ApiForbiddenResponse({
    description: 'Impossible to change this book information',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('manager'),
      ],
    }),
  )
  @ApiCookieAuth()
  async changeBookInfo(
    @Param('book_id', ParseUUIDPipe) id: string,
    @Body() book: CreateBookDto,
  ): Promise<BookReturnDto> {
    return this.bookService.changeBookInfo(id, book);
  }
  @Get('category/:category_id')
  @ApiOkResponse({ description: 'Books are found', type: [BookReturnDto] })
  @ApiNotFoundResponse({ description: 'There is nothing' })
  async findAllInCategory(
    @Param('category_id', ParseUUIDPipe) id: string,
  ): Promise<BookReturnDto[]> {
    return this.bookService.findAllInCategory(id);
  }
  @Get('')
  @ApiOkResponse({ description: 'Books are found', type: [BookReturnDto] })
  @ApiNotFoundResponse({ description: 'There is nothing' })
  async findAll(
    @Query('page') page: number,
    @Query('numberPerPage', ParseIntPipe) numberPerPage: number,
  ): Promise<BookReturnDto[]> {
    return this.bookService.findAll(page, numberPerPage);
  }
  @Get('search/api')
  @ApiOkResponse({ description: 'Books are found', type: [BookReturnDto] })
  @ApiNotFoundResponse({ description: 'Nothing was found' })
  async searchBook(
    @Query('request') request: string,
  ): Promise<BookReturnDto[]> {
    return this.bookService.searchBook(request);
  }
  @Put('category/add')
  @ApiOkResponse({
    description: 'Book information has been changed',
  })
  @ApiForbiddenResponse({
    description: 'Impossible to change this book information',
  })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('manager'),
      ],
    }),
  )
  @ApiCookieAuth()
  async addBookToCategory(
    @Query('book_id', ParseUUIDPipe) book_id: string,
    @Query('category_id', ParseUUIDPipe) category_id: string,
  ) {
    await this.bookService.addBookToCategory(book_id, category_id);
  }
  @Get('selected/api')
  @ApiOkResponse({ description: 'Books are found', type: [BookReturnDto] })
  @ApiNotFoundResponse({ description: 'Nothing was found' })
  async selectedBooks(
    @Query('category_name') category_name: string,
  ): Promise<BookReturnDto[]> {
    return this.bookService.selectedBooks(category_name);
  }
}
