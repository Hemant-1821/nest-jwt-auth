import { Query,Resolver, Mutation, Args, Context } from '@nestjs/graphql';
import { UserService } from './user.service';
import { User } from '../graphql';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { UserEntity } from './user.entity';

@Resolver('User')
export class UserResolver {
    constructor(
        private userService: UserService
    ) {}

    @Query()
    @UseGuards(AuthGuard)
    async me(@Context('user') user: User): Promise<UserEntity> {
        const Detuser = await this.userService.getUserByEmail(user.email);
        return Detuser;
        // return user;
    }

    @Mutation()
    async login(@Args('email') email: string, @Args('password') password: string): Promise<string>{
        const user = await this.userService.getUserByEmail(email);
        if (!user) {
            throw new Error('User Not Registered!!');
        } else {
            if(user.password === password){
                return this.userService.createToken(user);
            } else {
                throw new Error('Email or Password Incorrect!');
            }
        }
        
    }

    @Mutation()
    async Signup(@Args('email') email: string, @Args('password') password: string): Promise<UserEntity>{
        let user = await this.userService.getUserByEmail(email);
        console.log(user);
        if (!user) {
            user = await this.userService.createUser(email,password);
            console.log(user);
            return user;
        } else {
            throw new Error('User Already Registered!!');
        }
        
    }
}
