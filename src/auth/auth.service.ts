import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthCredentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from "bcrypt";
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './dto/jwt-payload.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService
    ) { }
    
    async singUp(authCredentialsDto: AuthCredentialsDto): Promise<void> {
        return this.userRepository.createUser(authCredentialsDto);
    }

    async singIn(authCredentialsDto: AuthCredentialsDto): Promise<{accessToken: string}> {
        const { username, password } = authCredentialsDto;
        const user = await this.userRepository.findOneBy({ username });
        
        if (user && (await bcrypt.compare(password, user.password)))
        {
            const payload: JwtPayload = { username };
            const accessToken: string = await this.jwtService.sign(payload);
            return { accessToken };
        }
        else
        {
            throw new UnauthorizedException('Username or password is incorrect.');
        }
    }
}