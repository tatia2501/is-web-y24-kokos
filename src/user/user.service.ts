import { Injectable } from '@nestjs/common';
import { UserReturnDto } from './user.returnDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class UserService {
  async findUser(id: string): Promise<UserReturnDto> {
    return new UserReturnDto(
      await prisma.user.findUniqueOrThrow({
        where: { id },
      }),
    );
  }
}
