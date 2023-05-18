import { ApiProperty } from '@nestjs/swagger';
import { Role } from '@prisma/client';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
export class CreateUserDto {
  @IsEmail()
  @ApiProperty({
    description: "User's email",
    example: 'someone@gmail.com',
  })
  email: string;
  @IsPhoneNumber()
  @ApiProperty({
    description: "User's phone number",
    example: '+77777777777',
  })
  phone: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's first name",
    example: 'Иван',
  })
  first_name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's second name",
    example: 'Иванов',
  })
  second_name: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: "User's login",
    example: 'ivan1977',
  })
  login: string;
  @IsNotEmpty()
  @ApiProperty({
    description: "User's role (customer or manager)",
    example: Role.Customer,
  })
  role: Role;
}
