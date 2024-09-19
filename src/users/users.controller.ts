import { Controller, Post, Body, Get, Param, Patch, Query, Delete, NotFoundException , Session , UseGuards } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { currentUser } from './Decorators/currentuser.decorator';
import { User } from './user.entity';
import { AuthGuard } from 'src/guards/auth.guard';
import { serialize } from 'v8';


@Controller('auth')
export class UsersController {

constructor(private usersService: UsersService , private authService: AuthService){
    
}
    // @Serialize(UserDto)
    // @Get('/whoami')
    // whoAmI(@Session() session: any){
    //     return this.usersService.findOne(session.userId);
    // }
    @Serialize(UserDto)
    @Get('/whoami')
    @UseGuards(AuthGuard)
    whoAmI(@currentUser() user: User){
        return user;
    }

    @Post('signup')
    async createUser(@Body() body: CreateUserDto , @Session() session: any) {
        console.log(body);
        const user = await this.authService.signup(body.email, body.password);
        session.userId = user.id;
        return user;
    }


    @Post('signin')
    async signin(@Body() body: CreateUserDto , @Session() session: any) {
        const user = await this.authService.signin(body.email, body.password);
        session.userId = user.id;
        return user;
    }

    @Post('signout')
    signout(@Session() session: any){
        session.userId = null;
    }
    
    //@UseInterceptors(new SerializeInterceptor(UserDto))
    @Serialize(UserDto)
    @Get('/:id')
    async findUser(@Param('id') id: string) {
        console.log('Handler is running')
        const user = await this.usersService.findOne(parseInt(id));
        if (!user) {
            throw new NotFoundException('user not found');
        } else {
            return user;
        }
    }
    
    @Serialize(UserDto)
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Serialize(UserDto)
    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: Partial<UpdateUserDto>){
        return this.usersService.update(parseInt(id) , body);
    }
    


}
 