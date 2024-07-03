
import { ActorService } from './actor.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateActorDto } from './dto/update-actor.dto';

@ApiBearerAuth('defaultBearerAuth')
@ApiTags('actors')
@Controller('actors')
export class ActorController {
  constructor(private readonly actorService: ActorService) {}

  @Get()
  @ApiQuery({ name: 'searchTerm', required: false, type: String })
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.actorService.getAll(searchTerm);
  }

  @Get('by-slug:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.actorService.getBySlug(slug);
  }

  /* Request for admin */
  @Get('by-id/:id')
	@Auth('admin')
	async getById(@Param('id') id: string) {
		return this.actorService.getById(id)
	}

  @UsePipes(new ValidationPipe())
  @Auth('admin')
	@Post()
	@HttpCode(200)
	
  async create() {
    return this.actorService.create();
  }

  @UsePipes(new ValidationPipe())
  @Auth('admin')
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateActorDto) {
    const updatedActor = await this.actorService.update(id, dto)

		if (!updatedActor) throw new NotFoundException('Actor not found')
		return updatedActor
  }

  @Delete(':id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		const deletedActor = await this.actorService.delete(id)

		if (!deletedActor) throw new NotFoundException('Actor not found')
		return deletedActor
	}
}

