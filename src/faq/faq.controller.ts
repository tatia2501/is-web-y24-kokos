import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  ParseUUIDPipe, UseGuards
} from "@nestjs/common";
import {
  ApiCookieAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags, ApiUnauthorizedResponse
} from "@nestjs/swagger";
import { FaqReturnDto } from './faq.returnDto';
import { FaqService } from './faq.service';
import { FaqDto } from './faq.faqDto';
import { AuthGuard } from "../auth/auth.guard";
import { SessionClaimValidator } from "supertokens-node/lib/build/recipe/session";
import UserRoles from "supertokens-node/recipe/userroles";

@ApiTags('faq')
@Controller('faq')
export class FaqController {
  constructor(private faqService: FaqService) {}
  @Get('show_all')
  @ApiOkResponse({ description: 'Faq is showed', type: [FaqReturnDto] })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
  async findAll(): Promise<FaqReturnDto[]> {
    return this.faqService.findAll();
  }
  @Get(':faq_id')
  @ApiOkResponse({ description: 'Faq is showed', type: [FaqReturnDto] })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
  async findOne(
    @Param('faq_id', ParseUUIDPipe) id: string,
  ): Promise<FaqReturnDto> {
    return this.faqService.findOne(id);
  }
  @Post('')
  @ApiCreatedResponse({
    description: 'Question has been added',
    type: FaqReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Question can not be added' })
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
  async addToFaq(@Body() faq: FaqDto): Promise<FaqReturnDto> {
    return this.faqService.addToFaq(faq);
  }
  @Delete(':faq_id')
  @ApiOkResponse({ description: 'Question has been deleted' })
  @ApiForbiddenResponse({ description: 'Impossible to delete this question' })
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
  async deleteFromFaq(@Param('faq_id', ParseUUIDPipe) id: string) {
    await this.faqService.deleteFromFaq(id);
  }
  @Put(':faq_id')
  @ApiOkResponse({
    description: 'Question has been changed',
    type: FaqReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Impossible to change this question' })
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
  async changeQuestion(
    @Param('faq_id', ParseUUIDPipe) id: string,
    @Body() faq: FaqDto,
  ): Promise<FaqReturnDto> {
    return this.faqService.changeQuestion(id, faq);
  }
}
