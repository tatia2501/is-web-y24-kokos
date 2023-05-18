import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
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
import { MailDto } from './mail.mailDto';
import { MailService } from './mail.service';
import { MailReturnDto } from './mail.returnDto';
import { AuthGuard } from '../auth/auth.guard';
import { SessionClaimValidator } from 'supertokens-node/lib/build/recipe/session';
import UserRoles from 'supertokens-node/recipe/userroles';
import { Session } from '../auth/session.decorator';

@ApiTags('mail')
@Controller('mail')
export class MailController {
  constructor(private mailService: MailService) {}
  @Get('show')
  @ApiOkResponse({ description: 'Mail is showed', type: [MailReturnDto] })
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
  async findAll(@Session() session): Promise<MailReturnDto[]> {
    return this.mailService.findAll(session.userId);
  }
  @Get(':mail_id')
  @ApiOkResponse({ description: 'Mail is showed', type: MailReturnDto })
  @ApiNotFoundResponse({ description: 'Mail is not found' })
  async findMail(
    @Param('mail_id', ParseUUIDPipe) id: string,
  ): Promise<MailReturnDto> {
    return this.mailService.findMail(id);
  }
  @Post('')
  @ApiCreatedResponse({
    description: 'Mail has been added',
    type: MailReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Mail can not be added' })
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
  async addMail(@Body() mail: MailDto): Promise<MailReturnDto> {
    return this.mailService.addMail(mail);
  }
  @Delete(':mail_id')
  @ApiOkResponse({ description: 'Mail has been deleted' })
  @ApiForbiddenResponse({ description: 'Impossible to delete this mail' })
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
  async deleteMail(@Param('mail_id', ParseUUIDPipe) id: string) {
    await this.mailService.deleteMail(id);
  }
  @Put(':mail_id')
  @ApiOkResponse({ description: 'Mail has been changed', type: MailReturnDto })
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
  @ApiForbiddenResponse({ description: 'Impossible to change this mail' })
  async changeMail(
    @Param('mail_id', ParseUUIDPipe) id: string,
    @Body() mail: MailDto,
  ): Promise<MailReturnDto> {
    return this.mailService.changeMail(id, mail);
  }
}
