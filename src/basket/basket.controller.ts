import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Put,
  ParseUUIDPipe,
  UseGuards,
  Query,
  ParseIntPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiTags,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
  ApiCookieAuth,
} from '@nestjs/swagger';
import { BookReturnDto } from '../book/book.returnDto';
import { BasketService } from './basket.service';
import { AuthGuard } from '../auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/lib/build/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { Session } from '../auth/session.decorator';
@ApiTags('basket')
@Controller('basket')
export class BasketController {
  constructor(private basketService: BasketService) {}
  @Get('show')
  @ApiOkResponse({ description: 'Books in basket', type: [BookReturnDto] })
  @ApiNotFoundResponse({ description: 'No books in basket' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('customer'),
      ],
    }),
  )
  @ApiCookieAuth()
  async findAll(@Session() session): Promise<BookReturnDto[]> {
    return this.basketService.findAll(session.userId);
  }
  @Post(':book_id')
  @ApiCreatedResponse({ description: 'Book has been added' })
  @ApiForbiddenResponse({ description: 'Book can not be added' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [
        ...globalValidators,
        UserRoles.UserRoleClaim.validators.includes('customer'),
      ],
    }),
  )
  @ApiCookieAuth()
  async addToBasket(
    @Session() session,
    @Param('book_id', ParseUUIDPipe) book_id: string,
  ) {
    await this.basketService.addToBasket(session.userId, book_id);
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
        UserRoles.UserRoleClaim.validators.includes('customer'),
      ],
    }),
  )
  @ApiCookieAuth()
  async deleteBookFromBasket(
    @Session() session,
    @Param('book_id', ParseUUIDPipe) book_id: string,
  ) {
    await this.basketService.deleteBookFromBasket(session.userId, book_id);
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
        UserRoles.UserRoleClaim.validators.includes('customer'),
      ],
    }),
  )
  @ApiCookieAuth()
  async changeBookInfo(
    @Session() session,
    @Param('book_id', ParseUUIDPipe) book_id: string,
    @Query('amount', ParseIntPipe) amount: number,
  ) {
    return this.basketService.changeBookInfo(session.userId, book_id, amount);
  }
}
