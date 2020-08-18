import { BaseEntity, Column, Entity, ObjectIdColumn, ObjectID } from 'typeorm';

@Entity('users')
export class UserEntity extends BaseEntity {
    @ObjectIdColumn()
    id: ObjectID;
    
    @Column()
    email: string;
}