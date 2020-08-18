import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';

@Resolver('User')
export class UserResolver {
    constructor(private userService: UserService) {}

    @Mutation()
    async login(@Args('email') email: string): Promise<string>{
        let user = await this.userService.getUserByEmail(email);
        console.log(user);
        if (!user) {
            user = await this.userService.createUser(email);
            console.log(user);
        }
        return this.userService.createToken(user);
    }
}
