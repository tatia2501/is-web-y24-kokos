import {
  Controller,
  Get,
  Post,
  Delete,
  Put,
  Param,
  Body,
  ParseUUIDPipe,
} from '@nestjs/common';
import {
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';
import { SpecialOfferService } from './special.service';
import { SpecialOfferReturnDto } from './special.returnDto';
import { SpecialOfferDto } from './special.specialOfferDto';
@ApiTags('special-offer')
@Controller('special-offer')
export class SpecialOfferController {
  constructor(private specialOfferService: SpecialOfferService) {}
  @Get(':special_id')
  @ApiOkResponse({
    description: 'Special offer is showed',
    type: SpecialOfferReturnDto,
  })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
  async findSpecial(
    @Param('special_id', ParseUUIDPipe) id: string,
  ): Promise<SpecialOfferReturnDto> {
    return this.specialOfferService.findSpecial(id);
  }
  @Get('')
  @ApiOkResponse({
    description: 'Special offers are showed',
    type: [SpecialOfferReturnDto],
  })
  @ApiNotFoundResponse({ description: 'There is nothing yet' })
  async findAll(): Promise<SpecialOfferReturnDto[]> {
    return this.specialOfferService.findAll();
  }
  @Post('')
  @ApiCreatedResponse({
    description: 'Special offer has been added',
    type: SpecialOfferReturnDto,
  })
  @ApiForbiddenResponse({ description: 'Special offer can not be added' })
  async addSpecialOffer(
    @Body() specialOffer: SpecialOfferDto,
  ): Promise<SpecialOfferReturnDto> {
    return this.specialOfferService.addSpecialOffer(specialOffer);
  }
  @Delete(':special_id')
  @ApiOkResponse({ description: 'Special offer has been deleted' })
  @ApiForbiddenResponse({
    description: 'Impossible to delete this special offer',
  })
  async deleteSpecialOffer(@Param('special_id', ParseUUIDPipe) id: string) {
    await this.specialOfferService.deleteSpecialOffer(id);
  }
  @Put(':special_id')
  @ApiOkResponse({
    description: 'Special offer has been changed',
    type: SpecialOfferReturnDto,
  })
  @ApiForbiddenResponse({
    description: 'Impossible to change this special offer',
  })
  async changeSpecialOffer(
    @Param('special_id', ParseUUIDPipe) id: string,
    @Body() specialOffer: SpecialOfferDto,
  ): Promise<SpecialOfferReturnDto> {
    return this.specialOfferService.changeSpecialOffer(id, specialOffer);
  }
}
