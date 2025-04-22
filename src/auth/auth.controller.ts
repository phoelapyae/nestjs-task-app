import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }
    
    @Post('/singup')
    singUp(@Body() authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.authService.singUp(authCredentialsDto);
    }

    @Post('/singin')
    singIn(@Body() authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        return this.authService.singIn(authCredentialsDto);
    }
}