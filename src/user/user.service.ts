import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ClerkService } from 'src/clerk/clerk.service';

@Injectable()
export class UserService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly clerkService: ClerkService,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    const userId = await this.clerkService.createUser(
      createUserDto.name,
      createUserDto.email,
    );
    const userData = {
      ...createUserDto,
      date: new Date(),
      id: userId,
    };

    return this.prisma.user.create({ data: userData });
  }

  async findUserById(id: string) {
    const user = await this.prisma.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }
}
