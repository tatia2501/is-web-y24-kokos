import { Injectable } from '@nestjs/common';
import { MailDto } from './mail.mailDto';
import { MailReturnDto } from './mail.returnDto';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
@Injectable()
export class MailService {
  async addMail(mail: MailDto): Promise<MailReturnDto> {
    return new MailReturnDto(
      await prisma.mail.create({
        data: {
          date: mail.date,
          title: mail.title,
          text: mail.text,
          users: {
            connect: mail.usersId.map((userId) => ({ id: userId })),
          },
        },
      }),
    );
  }
  async findAll(user_id: string): Promise<MailReturnDto[]> {
    const user = await prisma.user.findUniqueOrThrow({
      where: { id: user_id },
      include: { mail: true },
    });
    const mail_arr = [];
    user.mail.forEach((mail) => {
      mail_arr[mail_arr.length] = new MailReturnDto(mail);
    });
    return mail_arr;
  }
  async findMail(mail_id: string): Promise<MailReturnDto> {
    return new MailReturnDto(
      await prisma.mail.findUniqueOrThrow({
        where: { id: mail_id },
      }),
    );
  }
  async deleteMail(mail_id: string) {
    await prisma.mail.delete({
      where: { id: mail_id },
      include: { users: true },
    });
  }
  async changeMail(mail_id: string, mail: MailDto): Promise<MailReturnDto> {
    return new MailReturnDto(
      await prisma.mail.update({
        where: { id: mail_id },
        data: {
          date: mail.date,
          title: mail.title,
          text: mail.text,
          users: {
            connect: mail.usersId.map((userId) => ({ id: userId })),
          },
        },
      }),
    );
  }
}
