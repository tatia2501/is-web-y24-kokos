import { Injectable, NotFoundException } from "@nestjs/common";
import { FaqReturnDto } from './faq.returnDto';
import { FaqDto } from './faq.faqDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class FaqService {
  async findAll(): Promise<FaqReturnDto[]> {
    const faq = await prisma.faq.findMany();
    if (faq == null) throw new NotFoundException();
    const faq_arr = [];
    faq.forEach((f) => {
      faq_arr[faq_arr.length] = new FaqReturnDto(f);
    });
    return faq_arr;
  }
  async findOne(id: string): Promise<FaqReturnDto> {
    return new FaqReturnDto(
      await prisma.faq.findUniqueOrThrow({
        where: {
          id,
        },
      }),
    );
  }
  async addToFaq(faq: FaqDto): Promise<FaqReturnDto> {
    return new FaqReturnDto(
      await prisma.faq.create({
        data: {
          anqwer: faq.answer,
          question: faq.question,
        },
      }),
    );
  }
  async deleteFromFaq(id: string) {
    await prisma.faq.delete({
      where: {
        id,
      },
    });
  }
  async changeQuestion(id: string, faq: FaqDto): Promise<FaqReturnDto> {
    return new FaqReturnDto(
      await prisma.faq.update({
        where: {
          id,
        },
        data: {
          anqwer: faq.answer,
          question: faq.question,
        },
      }),
    );
  }
}
