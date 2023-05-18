import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  UseGuards,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { WishlistService } from './wishlist.service';
import { BookReturnDto } from '../book/book.returnDto';
import { AuthGuard } from '../auth/auth.guard';
import UserRoles from 'supertokens-node/recipe/userroles';
import { SessionClaimValidator } from 'supertokens-node/lib/build/recipe/session';
import { Session } from '../auth/session.decorator';
@ApiTags('wishlist')
@Controller('wishlist')
export class WishlistController {
  constructor(private wishlistService: WishlistService) {}
  @Get('show')
  @ApiOkResponse({ description: 'Books are showed', type: [BookReturnDto] })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
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
    return this.wishlistService.findAll(session.userId);
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
  async addToWishlist(
    @Session() session,
    @Param('book_id', ParseUUIDPipe) book_id: string,
  ) {
    await this.wishlistService.addToWishlist(session.userId, book_id);
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
  async deleteBookFromWishlist(
    @Session() session,
    @Param('book_id', ParseUUIDPipe) book_id: string,
  ) {
    await this.wishlistService.deleteBookFromWishlist(session.userId, book_id);
  }
}
