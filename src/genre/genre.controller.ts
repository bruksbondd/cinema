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
import { GenreService } from './genre.service';
import { ApiBearerAuth, ApiQuery, ApiTags } from '@nestjs/swagger';
import { Auth } from 'src/auth/decorators/auth.decorator';
import { UpdateGenreDto } from './dto/updata-genre.dto';

@ApiBearerAuth('defaultBearerAuth')
@ApiTags('genres')
@Controller('genres')
export class GenreController {
  constructor(private readonly genreService: GenreService) {}

  @Get()
  @ApiQuery({ name: 'searchTerm', required: false, type: String })
  async getAll(@Query('searchTerm') searchTerm?: string) {
    return this.genreService.getAll(searchTerm);
  }

  @Get('by-slug:slug')
  async getBySlug(@Param('slug') slug: string) {
    return this.genreService.getBySlug(slug);
  }

  /* Request for admin */
  @Get('by-id/:id')
	@Auth('admin')
	async getById(@Param('id') id: string) {
		return this.genreService.getById(id)
	}

  @UsePipes(new ValidationPipe())
  @Auth('admin')
	@Post()
	@HttpCode(200)
	
  async create() {
    return this.genreService.create();
  }

  @UsePipes(new ValidationPipe())
  @Auth('admin')
  @HttpCode(200)
  @Put(':id')
  async update(@Param('id') id: string, @Body() dto: UpdateGenreDto) {
    const updatedGenre = await this.genreService.update(id, dto)

		if (!updatedGenre) throw new NotFoundException('Genre not found')
		return updatedGenre
  }

  @Delete(':id')
	@Auth('admin')
	async delete(@Param('id') id: string) {
		const deletedGenre = await this.genreService.delete(id)

		if (!deletedGenre) throw new NotFoundException('Genre not found')
		return deletedGenre
	}
}
