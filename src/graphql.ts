
/** ------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface User {
    id: string;
    email: string;
    password: string;
}

export interface IQuery {
    me(): User | Promise<User>;
}

export interface IMutation {
    login(email?: string, password?: string): string | Promise<string>;
    Signup(email?: string, password?: string): User | Promise<User>;
}
