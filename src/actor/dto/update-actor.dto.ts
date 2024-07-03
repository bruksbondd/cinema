
import { ApiProperty } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
} from 'class-validator';

export class UpdateActorDto {
    @ApiProperty()
    @IsString()
    name: string;
  
    @ApiProperty()
    @IsString()
    photoUrl?: string;
  }
