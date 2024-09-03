import { Controller, Post, Body, Get, Param, Patch, Query, Delete, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';

@Controller('auth')
@Serialize(UserDto)
export class UsersController {
constructor(private usersService: UsersService){
    
}

    @Post('signup')
    createUser(@Body() body: CreateUserDto) {
        console.log(body);
        this.usersService.create(body.email, body.password);
    }
    
    //@UseInterceptors(new SerializeInterceptor(UserDto))
    //@Serialize(UserDto)
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
    
    
    @Get()
    findAllUsers(@Query('email') email: string) {
        return this.usersService.find(email);
    }

    @Delete('/:id')
    removeUser(@Param('id') id:string){
        return this.usersService.remove(parseInt(id));
    }

    @Patch('/:id')
    updateUser(@Param('id') id:string, @Body() body: Partial<UpdateUserDto>){
        return this.usersService.update(parseInt(id) , body);
    }


}
 