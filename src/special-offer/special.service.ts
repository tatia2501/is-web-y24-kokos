import { Injectable, NotFoundException } from "@nestjs/common";
import { SpecialOfferReturnDto } from './special.returnDto';
import { SpecialOfferDto } from './special.specialOfferDto';
import { PrismaClient } from '@prisma/client';
import { AppGateway } from '../gateway/app.gateway';

const prisma = new PrismaClient();
@Injectable()
export class SpecialOfferService {
  constructor(private readonly gateway: AppGateway) {}
  async findSpecial(id: string): Promise<SpecialOfferReturnDto> {
    return new SpecialOfferReturnDto(
      await prisma.specialOffer.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }
  async findAll(): Promise<SpecialOfferReturnDto[]> {
    const specials_arr = await prisma.specialOffer.findMany();
    if (specials_arr == null) throw new NotFoundException();
    const specials = [];
    specials_arr.forEach((special) => {
      specials[specials.length] = new SpecialOfferReturnDto(special);
    });
    return specials;
  }
  async addSpecialOffer(
    specialOffer: SpecialOfferDto,
  ): Promise<SpecialOfferReturnDto> {
    const newSpecial = new SpecialOfferReturnDto(
      await prisma.specialOffer.create({
        data: {
          name: specialOffer.name,
          description: specialOffer.description,
          picture: specialOffer.picture,
        },
      }),
    );
    this.gateway.server.emit('newSpecialOffer', newSpecial);
    return newSpecial;
  }
  async deleteSpecialOffer(id: string) {
    await prisma.specialOffer.delete({
      where: {
        id,
      },
    });
  }
  async changeSpecialOffer(
    id: string,
    specialOffer: SpecialOfferDto,
  ): Promise<SpecialOfferReturnDto> {
    return new SpecialOfferReturnDto(
      await prisma.specialOffer.update({
        where: {
          id,
        },
        data: {
          name: specialOffer.name,
          description: specialOffer.description,
          picture: specialOffer.picture,
        },
      }),
    );
  }
}
