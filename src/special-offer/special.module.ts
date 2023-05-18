import { Module } from '@nestjs/common';
import { SpecialOfferController } from './special.controller';
import { SpecialOfferService } from './special.service';
import { AppGateway } from '../gateway/app.gateway';

@Module({
  controllers: [SpecialOfferController],
  providers: [SpecialOfferService, AppGateway],
})
export class SpecialOfferModule {
  constructor(private specialOfferService: SpecialOfferService) {}
}
