import { ApiProperty } from "@nestjs/swagger";
import { IsOptional, IsString, MinLength } from "class-validator";

export class AuthDto {
    @ApiProperty()
    @IsOptional()
    @IsString()
    name: string

    @ApiProperty()
    @IsString()
    email: string

    @ApiProperty()
    @MinLength(6, {
        message: "Password shold be min 6 symbols!"
    })
    
    @ApiProperty()
    @IsString()
    password: string
}