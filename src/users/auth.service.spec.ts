import { Test } from "@nestjs/testing";

import { AuthService } from "./auth.service";
import { UsersService } from "./users.service";

it('can create an instance of auth service', async () => {
    const fakeUsersService = {
        findOne: (email: string) => {
            return Promise.resolve({id: 1, email, password: 'asd'})
        }
    }
    const module = await Test.createTestingModule({
        providers: [
            AuthService,
            {
                provide: UsersService,
                useValue: {}
            }
        ]
    }).compile();

    const service = module.get<AuthService>(AuthService);
    expect(service).toBeDefined();
});