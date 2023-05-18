import { Controller, Get, UseGuards } from '@nestjs/common';
import {
  ApiCookieAuth,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserService } from './user.service';
import { UserReturnDto } from './user.returnDto';
import { Session } from '../auth/session.decorator';
import { AuthGuard } from '../auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/lib/build/recipe/session';
@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('')
  @ApiOkResponse({ description: 'User is found', type: UserReturnDto })
  @ApiNotFoundResponse({ description: 'No such user' })
  @ApiUnauthorizedResponse({ description: 'User is not authorized' })
  @UseGuards(
    new AuthGuard({
      overrideGlobalClaimValidators: async (
        globalValidators: SessionClaimValidator[],
      ) => [...globalValidators],
    }),
  )
  @ApiCookieAuth()
  async findUser(@Session() session): Promise<UserReturnDto> {
    return this.userService.findUser(session.userId);
  }
}
