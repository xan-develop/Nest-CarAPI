import { IsEmail, IsString } from 'class-validator';

export class CreateUserDto {
    @IsEmail()  // Valida que esta propiedad sea un correo electrónico válido
    email: string;

    @IsString()  // Valida que esta propiedad sea una cadena de texto
    password: string;
}
