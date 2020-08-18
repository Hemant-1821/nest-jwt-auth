import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository,getMongoManager  } from 'typeorm';
import * as jwt from 'jsonwebtoken';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(UserEntity) 
        private userRepo: Repository<UserEntity>
    ) {}

    createToken({ id, email}: UserEntity) {
        return jwt.sign({ id, email }, 'secret');
    }

    createUser(email: string, password: string){
        const user = new UserEntity();
        user.email = email;
        user.password = password;
        const manager = getMongoManager();
        return manager.save(user);
    }

    getUserByEmail(email: string){
        const manager = getMongoManager();
        return manager.findOne(UserEntity, { email: email });
    }
}
