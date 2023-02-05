import {
  CheckNickNameOutput,
  getMeOutput,
  getUserByNickNameOutput,
  UpdateUserDto,
  UpdateUserOutput,
} from './dtos/user.dto';
import { UserService } from './user.service';
import { Body, Controller, Get, Patch, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from './entities/user.entity';
import { AuthUser } from 'src/auth/authUser.decorator';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('user')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'returns my info',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/me')
  getMe(@AuthUser() user: User): getMeOutput {
    if (user) {
      return { ok: true, user };
    }
    return { ok: false };
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'search user by nickname',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/search')
  async getUserByNickName(
    @Query('nickname') nickname: string,
  ): Promise<getUserByNickNameOutput> {
    const { user } = await this.userService.getUserByNickName(nickname);
    if (user) {
      return { ok: true, user };
    }
    return { ok: false };
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'check nickname exists or not',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Get('/check')
  async checkNickName(
    @Query('nickname') nickname: string,
  ): Promise<CheckNickNameOutput> {
    return await this.userService.checkNickName(nickname);
  }

  @UseGuards(AuthGuard)
  @ApiResponse({
    status: 200,
    description: 'update user info',
  })
  @ApiResponse({ status: 403, description: 'Forbidden.' })
  @Patch('/update')
  async updateUser(
    @AuthUser() user: User,
    @Body() updateData: UpdateUserDto,
  ): Promise<UpdateUserOutput> {
    return await this.userService.updateUser(user.id, updateData);
  }
}
