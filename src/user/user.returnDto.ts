import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
export class UserReturnDto {
  constructor(user: User) {
    this.email = user.email;
    this.phone = user.phone;
    this.first_name = user.first_name;
    this.second_name = user.last_name;
  }
  @ApiProperty({
    description: "User's email",
    example: 'someone@gmail.com',
  })
  email: string;
  @ApiProperty({
    description: "User's phone number",
    example: '+77777777777',
  })
  phone: string;
  @ApiProperty({
    description: "User's first name",
    example: 'Иван',
  })
  first_name: string;
  @ApiProperty({
    description: "User's second name",
    example: 'Иванов',
  })
  second_name: string;
}
