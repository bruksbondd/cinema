import { Controller, Post, Get, HttpCode, Body, Query, Param, Put, UsePipes, ValidationPipe, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { CurrentUser } from './decorators/user.decorator';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiBearerAuth('defaultBearerAuth')
@ApiTags('users')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  
  @Get('profile')
  @Auth()
  async getprofile(@CurrentUser('id') id: string) {
    return this.userService.getById(id);
  }


  @Post('profile/favorites')
  @HttpCode(200)
  @Auth()
  async toggleFavorite(
    @Body('movieId') movieId: string,
    @CurrentUser('id') userId: string,
  ) {
    return this.userService.toggleFavorite(movieId, userId);
  }

  /* for admin */
  @Get()
  @ApiQuery({ name: 'searchTerm', required: false, type: String })
  @Auth('admin')
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.userService.getAll(searchTerm);
  }

  @Get('by-id/:id')
  @Auth('admin')
  async getById(@Param('id') id: string) {
    return this.userService.getById(id)
  }

  @UsePipes(new ValidationPipe)
  @Put(':id')
  @HttpCode(200)
  @Auth('admin')
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateUserDto,
  ) {
    return this.userService.update(id, dto);
  }


  @Delete(':id')
  @Auth('admin')
  async delete(@Param('id') id: string) {
    return this.userService.delete(id)
  }

}
