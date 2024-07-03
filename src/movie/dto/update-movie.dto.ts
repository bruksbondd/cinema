import { ApiProperty } from '@nestjs/swagger'
import { IsArray, IsNumber, IsString } from 'class-validator'

export class UpdateMovieDto {
    @ApiProperty()
	@IsString()
	title: string

    @ApiProperty()
	@IsString()
	poster: string

    @ApiProperty()
	@IsString()
	bigPoster: string

    @ApiProperty()
	@IsString()
	videoUrl: string

    @ApiProperty()
	@IsString()
	country: string

    @ApiProperty()
	@IsNumber()
	year: number

    @ApiProperty()
	@IsNumber()
	duration: number

    @ApiProperty()
	@IsArray()
	@IsString({ each: true })
	genres: string[]

    @ApiProperty()
	@IsArray()
	@IsString({ each: true })
	actors: string[]
}
