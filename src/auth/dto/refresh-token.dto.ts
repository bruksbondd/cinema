import { IsString } from 'class-validator'

export class RefreshTokenDto {
	@IsString({
		message: 'You do not sent refresh token or it is not sring!'
	})
	refreshToken: string
}
